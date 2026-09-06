import { EMPTY_SNAPSHOT, type Attempt, type Bucket, type ProgressSnapshot, type QuestionProgress } from '@/data/dsa/types'

/**
 * The only surface through which progress data is read or written.
 *
 * Everything above this interface is pure functions over a snapshot,
 * which is what makes mastery, revision and readiness unit-testable
 * without a browser — and what makes the eventual swap to Supabase a
 * single new implementation rather than a rewrite.
 */
export interface ProgressStore {
  load(): Promise<ProgressSnapshot>
  save(snapshot: ProgressSnapshot): Promise<void>
  recordAttempt(attempt: Attempt, next: QuestionProgress): Promise<ProgressSnapshot>
  setBucket(questionId: string, bucket: Bucket): Promise<ProgressSnapshot>
  reset(): Promise<void>
  /** JSON backup. Guarded against the browser-storage failure modes below. */
  export(): Promise<string>
  import(json: string): Promise<ImportResult>
}

export type ImportResult =
  | { ok: true; questions: number }
  | { ok: false; error: string }

export const STORAGE_KEY = 'zebacodes.dsa.progress.v1'

/**
 * localStorage implementation.
 *
 * Chosen for speed of delivery, with two known hazards handled here:
 *   - Every accessor is wrapped, because private windows, blocked site
 *     data and thumbnail contexts make localStorage THROW rather than
 *     return null.
 *   - Data lives in one browser profile. Clearing site data, switching
 *     machines, or Safari evicting scripted storage after 7 days all
 *     destroy months of history silently — which is why export/import
 *     is here in phase one rather than deferred.
 */
export class LocalStorageProgressStore implements ProgressStore {
  private read(): ProgressSnapshot {
    if (typeof window === 'undefined') return EMPTY_SNAPSHOT
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return EMPTY_SNAPSHOT
      const parsed = JSON.parse(raw) as ProgressSnapshot
      if (parsed?.version !== 1 || typeof parsed.questions !== 'object') return EMPTY_SNAPSHOT
      return parsed
    } catch {
      return EMPTY_SNAPSHOT
    }
  }

  private write(snapshot: ProgressSnapshot): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
    } catch {
      /* Quota exceeded or storage blocked. The in-memory snapshot the
         caller holds stays correct for this session; nothing is lost
         that was not already unwritable. */
    }
  }

  async load(): Promise<ProgressSnapshot> {
    return this.read()
  }

  async save(snapshot: ProgressSnapshot): Promise<void> {
    this.write({ ...snapshot, updatedAt: new Date().toISOString() })
  }

  async recordAttempt(attempt: Attempt, next: QuestionProgress): Promise<ProgressSnapshot> {
    const snapshot = this.read()
    const updated: ProgressSnapshot = {
      ...snapshot,
      updatedAt: new Date().toISOString(),
      questions: { ...snapshot.questions, [attempt.questionId]: next },
    }
    this.write(updated)
    return updated
  }

  async setBucket(questionId: string, bucket: Bucket): Promise<ProgressSnapshot> {
    const snapshot = this.read()
    const existing = snapshot.questions[questionId]
    if (!existing) return snapshot
    const updated: ProgressSnapshot = {
      ...snapshot,
      updatedAt: new Date().toISOString(),
      questions: { ...snapshot.questions, [questionId]: { ...existing, bucket } },
    }
    this.write(updated)
    return updated
  }

  async reset(): Promise<void> {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* nothing to do */
    }
  }

  async export(): Promise<string> {
    return JSON.stringify(this.read(), null, 2)
  }

  async import(json: string): Promise<ImportResult> {
    try {
      const parsed = JSON.parse(json) as ProgressSnapshot
      if (parsed?.version !== 1) return { ok: false, error: 'Unrecognised backup version.' }
      if (!parsed.questions || typeof parsed.questions !== 'object') {
        return { ok: false, error: 'Backup is missing its questions map.' }
      }
      this.write({ ...parsed, updatedAt: new Date().toISOString() })
      return { ok: true, questions: Object.keys(parsed.questions).length }
    } catch {
      return { ok: false, error: 'That file is not valid JSON.' }
    }
  }
}

/** In-memory store — used by tests and by SSR, where no browser exists. */
export class MemoryProgressStore implements ProgressStore {
  constructor(private snapshot: ProgressSnapshot = EMPTY_SNAPSHOT) {}

  async load() { return this.snapshot }
  async save(snapshot: ProgressSnapshot) { this.snapshot = snapshot }

  async recordAttempt(attempt: Attempt, next: QuestionProgress) {
    this.snapshot = {
      ...this.snapshot,
      updatedAt: new Date().toISOString(),
      questions: { ...this.snapshot.questions, [attempt.questionId]: next },
    }
    return this.snapshot
  }

  async setBucket(questionId: string, bucket: Bucket) {
    const existing = this.snapshot.questions[questionId]
    if (!existing) return this.snapshot
    this.snapshot = {
      ...this.snapshot,
      questions: { ...this.snapshot.questions, [questionId]: { ...existing, bucket } },
    }
    return this.snapshot
  }

  async reset() { this.snapshot = EMPTY_SNAPSHOT }
  async export() { return JSON.stringify(this.snapshot, null, 2) }
  async import(json: string): Promise<ImportResult> {
    try {
      this.snapshot = JSON.parse(json) as ProgressSnapshot
      return { ok: true, questions: Object.keys(this.snapshot.questions).length }
    } catch {
      return { ok: false, error: 'That file is not valid JSON.' }
    }
  }
}
