import type { Topic } from '../types'

export const lldTopics: Topic[] = [
  {
    id: 'responsibilities', roadmap: 'lld', tier: 1,
    title: 'Assigning responsibilities',
    summary: 'The step that decides the design: what each object is answerable for.',
    whyItMatters: 'LLD interviews are not pattern quizzes. They test whether you can go from ambiguous requirements to objects with clear reasons to exist.',
    whatToLearn: [
      'Requirements → clarify → entities → responsibilities → relationships',
      'Cohesion and coupling as the tests for whether a split is right',
      'Why every class should be justifiable in one sentence',
      'Interfaces at the seams where behaviour will vary',
      'Deferring patterns until a requirement demands one',
    ],
    dependencies: [{ roadmap: 'java', topic: 'oop' }],
    nextSteps: [{ roadmap: 'lld', topic: 'domain-modelling' }],
    howDeep: 'deep',
    interviewQuestions: [
      { q: 'Design a parking lot. Where do you start?', expects: 'Clarifying questions about vehicle types, pricing and floors — not classes. Jumping to code is the failure mode.' },
      { q: 'Why does this class exist?', expects: 'A one-sentence responsibility. If it takes a paragraph, the class is doing too much.' },
    ],
    systemContext: 'The same reasoning decides service boundaries — a microservice is a responsibility assignment at a larger scale.',
    related: [{ to: { roadmap: 'java', topic: 'oop' }, kind: 'requires', why: 'Composition, interfaces and polymorphism are the tools responsibility assignment is carried out with.' }],
    practice: {
      intent: 'Design under changing requirements, which is the actual skill.',
      exercises: [
        { title: 'Parking lot, then change it', detail: 'Design it. Then add electric-vehicle charging bays and hourly-versus-flat pricing. Count how many existing classes you had to modify — that number is your design quality.' },
      ],
    },
  },
  {
    id: 'domain-modelling', roadmap: 'lld', tier: 2,
    title: 'Modelling for change',
    summary: 'Designing so a new requirement adds code instead of editing it.',
    whyItMatters: 'Tier 2 LLD is judged on extension. The interviewer will change the requirements mid-answer; the design either absorbs it or unravels.',
    whatToLearn: [
      'Open/closed in practice: where to put the seam before you need it',
      'Strategy selection versus conditional chains',
      'Dependency inversion so policy does not depend on mechanism',
      'Modelling state transitions explicitly rather than with booleans',
      'Where to stop — premature abstraction costs as much as none',
    ],
    dependencies: [{ roadmap: 'lld', topic: 'responsibilities' }],
    nextSteps: [],
    howDeep: 'deep',
    interviewQuestions: [
      { q: 'Add a third payment method to your design. What changes?', expects: 'One new class implementing an existing interface, plus registration. Any edit to existing payment logic signals a missing seam.' },
      { q: 'When is an abstraction premature?', expects: 'When there is exactly one implementation and no concrete second use case — the interface adds indirection and buys nothing yet.' },
    ],
    related: [{ to: { roadmap: 'java', topic: 'advanced-streams' }, kind: 'enables', why: 'Sealed interfaces and records make explicit state modelling far less verbose.' }],
    practice: {
      intent: 'Take a design and mutate the requirements repeatedly.',
      exercises: [
        { title: 'Order system under pressure', detail: 'Design order placement. Then add: refunds, three pricing strategies, two notification channels, and concurrent stock updates. Refactor only where a seam was missing.' },
      ],
    },
  },
]
