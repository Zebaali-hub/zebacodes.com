'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown, Download, Upload } from 'lucide-react'
import type { Attempt, ProgressSnapshot, Question } from '@/data/dsa/types'
import { EMPTY_SNAPSHOT, questionUrl } from '@/data/dsa/types'
import { LocalStorageProgressStore } from '@/lib/dsa/storage'
import { questionMastery, MASTERY_LABELS, TIME_BUDGET } from '@/lib/dsa/mastery'
import { applyAttempt, BUCKET_LABELS } from '@/lib/dsa/revision'

const store = new LocalStorageProgressStore()

const CLASS_LABEL: Record<Question['classification'], string> = {
  FOUNDATION: 'Foundation',
  CORE: 'Core',
  VARIATION: 'Variation',
  ADVANCED: 'Advanced',
  COMBINATION: 'Combination',
  EXIT_TEST: 'Exit test',
}

export function QuestionLadder({ questions, patternTitle }: { questions: Question[]; patternTitle: string }) {
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(EMPTY_SNAPSHOT)
  const [hydrated, setHydrated] = useState(false)
  const [open, setOpen] = useState<string>('')

  useEffect(() => {
    let alive = true
    store.load().then((loaded) => {
      if (alive) {
        setSnapshot(loaded)
        setHydrated(true)
      }
    })
    return () => { alive = false }
  }, [])

  const log = useCallback(async (question: Question, form: LogForm) => {
    const attempt: Attempt = {
      questionId: question.id,
      at: new Date().toISOString(),
      outcome: form.outcome,
      solvedIndependently: form.outcome === 'solved' && form.hints === 0 && form.independent,
      hintsUsed: form.hints,
      minutesTaken: form.minutes,
      mistakes: form.mistakes,
      underInterviewConditions: form.timed,
    }
    const previous = snapshot.questions[question.id]
    const level = questionMastery([...(previous?.attempts ?? []), attempt], question.difficulty)
    const next = applyAttempt(previous, attempt, question.difficulty, level)
    setSnapshot(await store.recordAttempt(attempt, next))
    setOpen('')
  }, [snapshot])

  const summary = useMemo(() => {
    const tracked = questions.filter((q) => snapshot.questions[q.id])
    const independent = tracked.filter((q) =>
      snapshot.questions[q.id].attempts.some((a) => a.outcome === 'solved' && a.solvedIndependently && a.hintsUsed === 0),
    )
    return { tracked: tracked.length, independent: independent.length, total: questions.length }
  }, [questions, snapshot])

  if (questions.length === 0) {
    return (
      <section className="dsa-section">
        <h2>Question ladder</h2>
        <p className="dsa-empty">No questions authored for this pattern yet.</p>
      </section>
    )
  }

  return (
    <section className="dsa-section dsa-ladder">
      <div className="dsa-ladder-head">
        <div>
          <h2>Question ladder</h2>
          <p className="dsa-section-note">
            Ordered by what each problem teaches, not by difficulty. Work down the list.
          </p>
        </div>
        <p className="dsa-ladder-count" aria-live="polite">
          {hydrated
            ? `${summary.independent} of ${summary.total} solved unaided · ${summary.tracked} attempted`
            : `${summary.total} questions`}
        </p>
      </div>

      <ol className="dsa-question-list">
        {questions.map((question) => {
          const entry = hydrated ? snapshot.questions[question.id] : undefined
          const level = entry ? questionMastery(entry.attempts, question.difficulty) : 0
          const expanded = open === question.id
          return (
            <li key={question.id} className={expanded ? 'is-open' : ''}>
              <div className="dsa-question-row">
                <span
                  className="mastery-ring"
                  data-level={level}
                  style={{ ['--level' as string]: String(level) }}
                  title={MASTERY_LABELS[level]}
                  aria-label={MASTERY_LABELS[level]}
                />
                <span className="dsa-question-order">{String(question.order).padStart(2, '0')}</span>
                <div className="dsa-question-main">
                  <a href={questionUrl(question)} target="_blank" rel="noreferrer">
                    {question.leetcodeId}. {question.title} <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                  <p>{question.learningObjective}</p>
                </div>
                <div className="dsa-question-meta">
                  <span className="dsa-chip" data-class={question.classification}>{CLASS_LABEL[question.classification]}</span>
                  <span className="dsa-chip" data-difficulty={question.difficulty}>{question.difficulty}</span>
                  {entry ? <span className="dsa-chip" data-bucket={entry.bucket} title={BUCKET_LABELS[entry.bucket]}>{entry.bucket}</span> : null}
                </div>
                <button
                  type="button"
                  className="dsa-question-toggle"
                  onClick={() => setOpen(expanded ? '' : question.id)}
                  aria-expanded={expanded}
                >
                  <ChevronDown size={18} aria-hidden="true" />
                  <span className="sr-only">{expanded ? 'Collapse' : 'Expand'} {question.title}</span>
                </button>
              </div>

              {expanded ? (
                <div className="dsa-question-detail">
                  <div className="dsa-why">
                    <h4>Why this problem is here</h4>
                    <p>{question.rationale}</p>
                    <p className="dsa-complexity-inline">
                      Target <code>{question.expectedTC}</code> time, <code>{question.expectedSC}</code> space
                      · budget {TIME_BUDGET[question.difficulty]} min
                    </p>
                  </div>
                  <LogAttempt question={question} onSubmit={(form) => log(question, form)} />
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>

      <Backup patternTitle={patternTitle} onImported={setSnapshot} />
    </section>
  )
}

type LogForm = {
  outcome: Attempt['outcome']
  independent: boolean
  hints: 0 | 1 | 2 | 3
  minutes: number
  timed: boolean
  mistakes: Attempt['mistakes']
}

function LogAttempt({ question, onSubmit }: { question: Question; onSubmit: (form: LogForm) => void }) {
  const [outcome, setOutcome] = useState<Attempt['outcome']>('solved')
  const [independent, setIndependent] = useState(true)
  const [hints, setHints] = useState<0 | 1 | 2 | 3>(0)
  const [minutes, setMinutes] = useState(TIME_BUDGET[question.difficulty])
  const [timed, setTimed] = useState(false)

  return (
    <form
      className="dsa-log"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ outcome, independent, hints, minutes, timed, mistakes: [] })
      }}
    >
      <h4>Log an attempt</h4>
      <p className="dsa-log-note">
        Mastery is computed from what you record here — it cannot be set directly. The numbers are only
        as honest as the logging.
      </p>
      <div className="dsa-log-grid">
        <label>
          <span>Outcome</span>
          <select value={outcome} onChange={(e) => setOutcome(e.target.value as Attempt['outcome'])}>
            <option value="solved">Solved</option>
            <option value="partial">Partial</option>
            <option value="failed">Could not solve</option>
          </select>
        </label>
        <label>
          <span>Hints used</span>
          <select value={hints} onChange={(e) => setHints(Number(e.target.value) as 0 | 1 | 2 | 3)}>
            <option value={0}>None</option><option value={1}>1</option>
            <option value={2}>2</option><option value={3}>3+</option>
          </select>
        </label>
        <label>
          <span>Minutes</span>
          <input type="number" min={1} max={300} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
        </label>
      </div>
      <div className="dsa-log-checks">
        <label><input type="checkbox" checked={independent} onChange={(e) => setIndependent(e.target.checked)} /> Solved without looking anything up</label>
        <label><input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} /> Under interview conditions (timed, no IDE help)</label>
      </div>
      <button type="submit" className="dsa-log-submit">Record attempt</button>
    </form>
  )
}

function Backup({ patternTitle, onImported }: { patternTitle: string; onImported: (s: ProgressSnapshot) => void }) {
  const [message, setMessage] = useState('')

  return (
    <div className="dsa-backup">
      <p>
        Progress is stored in this browser only. Clearing site data or switching machines loses it —
        export a backup periodically.
      </p>
      <div className="dsa-backup-actions">
        <button
          type="button"
          onClick={async () => {
            const json = await store.export()
            await navigator.clipboard?.writeText(json).catch(() => {})
            setMessage('Backup copied to clipboard.')
          }}
        >
          <Download size={14} aria-hidden="true" /> Copy backup
        </button>
        <label className="dsa-import">
          <Upload size={14} aria-hidden="true" /> Restore backup
          <input
            type="file"
            accept="application/json"
            onChange={async (event) => {
              const file = event.target.files?.[0]
              if (!file) return
              const result = await store.import(await file.text())
              if (result.ok) {
                onImported(await store.load())
                setMessage(`Restored ${result.questions} question${result.questions === 1 ? '' : 's'}.`)
              } else {
                setMessage(result.error)
              }
              event.target.value = ''
            }}
          />
        </label>
      </div>
      {message ? <p className="dsa-backup-message" role="status">{message}</p> : null}
      <span className="sr-only">Backup controls for the {patternTitle} ladder</span>
    </div>
  )
}
