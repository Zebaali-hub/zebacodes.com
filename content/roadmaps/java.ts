import type { Topic } from '../types'

/** Java — Tier 1. Coding is part of mastery here, so every topic carries Practice. */
export const javaTier1: Topic[] = [
  {
    id: 'platform', roadmap: 'java', tier: 1,
    title: 'Java platform — JDK, JRE, JVM',
    summary: 'What actually runs your code, and why "write once, run anywhere" is a property of bytecode rather than magic.',
    whyItMatters: 'Every production question about memory, startup time, or "works on my machine" resolves to the boundary between your code, the bytecode, and the JVM running it. Without this you cannot reason about the rest of Tier 2.',
    whatToLearn: [
      'Source → bytecode → JVM execution, and where javac stops and the JVM starts',
      'JDK vs JRE vs JVM: which one your Docker image actually needs',
      'What the JVM adds at runtime — class loading, JIT, memory management',
      'Why bytecode is portable but a JVM is platform-specific',
    ],
    dependencies: [],
    nextSteps: [{ roadmap: 'java', topic: 'oop' }, { roadmap: 'java', topic: 'jvm-memory' }],
    howDeep: 'working',
    interviewQuestions: [
      { q: 'What is the difference between JDK, JRE and JVM?', expects: 'Not three definitions — that the JDK is a superset containing compilation tools, and that a runtime image only needs the JRE, which is why base image choice matters.' },
      { q: 'Is Java compiled or interpreted?', expects: 'Both, and why: javac compiles to bytecode, the JVM interprets then JIT-compiles hot paths to native code.' },
    ],
    systemContext: 'Your service ships as a JAR into a container. Choosing a JRE-only base image over a full JDK is a real size and attack-surface decision.',
    related: [{ to: { roadmap: 'java', topic: 'jvm-memory' }, kind: 'enables', why: 'Understanding the JVM as a process is the prerequisite for reasoning about its memory regions.' }],
    practice: {
      intent: 'Make the compile/run boundary concrete rather than theoretical.',
      exercises: [
        { title: 'Read your own bytecode', detail: 'Compile a small class, then run javap -c on it. Find the loop in the bytecode and match it to your source.', sketch: 'javac Counter.java && javap -c Counter' },
        { title: 'Prove JIT exists', detail: 'Run a hot loop a million times and time the first thousand iterations against the last thousand. Explain the gap.' },
      ],
    },
  },
  {
    id: 'oop', roadmap: 'java', tier: 1,
    title: 'OOP — encapsulation, inheritance, polymorphism, abstraction',
    summary: 'The four ideas, and more importantly when each one is the wrong tool.',
    whyItMatters: 'This is the vocabulary of every LLD interview. Reciting the four pillars scores nothing; choosing composition over inheritance and defending it scores everything.',
    whatToLearn: [
      'Encapsulation as invariant protection, not as getters and setters',
      'Inheritance vs composition — and why "is-a" is a weaker test than it sounds',
      'Runtime polymorphism through interfaces; what the JVM does at the call site',
      'Abstract class vs interface: state and constructors are the real dividing line',
    ],
    dependencies: [{ roadmap: 'java', topic: 'platform' }],
    nextSteps: [{ roadmap: 'java', topic: 'equals-hashcode' }, { roadmap: 'lld', topic: 'responsibilities' }],
    howDeep: 'deep',
    interviewQuestions: [
      { q: 'When would you choose composition over inheritance?', expects: 'A concrete example where inheritance leaks the parent\'s invariants, plus the fragile-base-class problem — not "favour composition" as a slogan.' },
      { q: 'Abstract class or interface here — and why?', expects: 'Shared state or a constructor forces an abstract class; behaviour contracts with multiple implementations favour an interface.' },
    ],
    systemContext: 'In a Spring service, interfaces are what make a bean swappable and what proxying depends on — an implementation-only class cannot be proxied the same way.',
    related: [
      { to: { roadmap: 'lld', topic: 'responsibilities' }, kind: 'enables', why: 'Assigning responsibilities to objects is OOP applied under time pressure — the LLD interview is this topic being tested indirectly.' },
      { to: { roadmap: 'spring', topic: 'ioc-di' }, kind: 'implements', why: 'Dependency injection is programming-to-an-interface enforced by a container instead of by discipline.' },
    ],
    practice: {
      intent: 'Feel the cost of the wrong choice rather than reading about it.',
      exercises: [
        { title: 'Break a subclass on purpose', detail: 'Extend ArrayList to count additions by overriding add. Call addAll. Explain why the count is wrong, then fix it with composition.' },
        { title: 'Strategy without the pattern name', detail: 'Write a pricing calculator with three rules. Add a fourth without touching the existing classes.' },
      ],
    },
  },
  {
    id: 'equals-hashcode', roadmap: 'java', tier: 1,
    title: 'Object contract — equals and hashCode',
    summary: 'The contract every hash-based collection silently depends on.',
    whyItMatters: 'Break this contract and HashMap loses your entries with no error, no exception, and no stack trace. It is the most common silent bug in Java and the entry point to HashMap internals.',
    whatToLearn: [
      'The equals contract: reflexive, symmetric, transitive, consistent',
      'Why equal objects must have equal hash codes, and why the reverse is not required',
      'What happens when you override equals and forget hashCode',
      'Mutating a key after insertion — the object is now unreachable in the map',
    ],
    dependencies: [{ roadmap: 'java', topic: 'oop' }],
    nextSteps: [{ roadmap: 'java', topic: 'collections' }, { roadmap: 'java', topic: 'hashmap-internals' }],
    howDeep: 'deep',
    interviewQuestions: [
      { q: 'You override equals but not hashCode. What breaks?', expects: 'Lookup by an equal-but-distinct instance fails, because the map goes to the wrong bucket. Ideally demonstrated rather than described.' },
      { q: 'Can two unequal objects share a hash code?', expects: 'Yes — that is a collision, it is legal, and HashMap resolves it by chaining then comparing with equals.' },
    ],
    systemContext: 'JPA entities are the classic trap: an entity with a generated id has no stable hash code before it is persisted, which breaks any Set holding it.',
    related: [
      { to: { roadmap: 'java', topic: 'hashmap-internals' }, kind: 'enables', why: 'HashMap internals are unintelligible without knowing what the map is asking of your key.' },
      { to: { roadmap: 'dsa', topic: 'hashing' }, kind: 'implements', why: 'The hashing patterns in DSA are this contract applied deliberately for algorithmic gain.' },
    ],
    practice: {
      intent: 'Watch the contract break, then repair it.',
      exercises: [
        { title: 'Lose an entry', detail: 'Write a Point class with equals only. Put it in a HashSet, then check contains with an equal instance. Explain the false.' },
        { title: 'Mutate a live key', detail: 'Insert a mutable key into a HashMap, change the field the hash uses, then try to retrieve it. Explain where the entry went.' },
      ],
    },
  },
  {
    id: 'collections', roadmap: 'java', tier: 1,
    title: 'Collections — choosing the right structure',
    summary: 'ArrayList, LinkedList, HashMap, HashSet, Deque, PriorityQueue, and the complexity that should drive the choice.',
    whyItMatters: 'Picking a structure is a complexity decision made a hundred times a day. Most production hot spots trace back to a linear scan someone chose without noticing.',
    whatToLearn: [
      'ArrayList vs LinkedList — and why LinkedList is almost never the answer in practice',
      'HashMap vs TreeMap vs LinkedHashMap: ordering guarantees you are paying for',
      'Deque as both stack and queue; why Stack and Vector are legacy',
      'PriorityQueue and the comparator that decides its behaviour',
      'Comparable vs Comparator, and comparator transitivity as a correctness requirement',
    ],
    dependencies: [{ roadmap: 'java', topic: 'equals-hashcode' }],
    nextSteps: [{ roadmap: 'java', topic: 'generics' }, { roadmap: 'java', topic: 'hashmap-internals' }],
    howDeep: 'deep',
    interviewQuestions: [
      { q: 'ArrayList or LinkedList for a queue of 10,000 elements?', expects: 'ArrayDeque, actually — and the reasoning: LinkedList\'s pointer chasing destroys cache locality, so its theoretical O(1) insert loses to an array in practice.' },
      { q: 'Your comparator is not transitive. What happens?', expects: 'Sort may throw "Comparison method violates its general contract" — or silently produce a wrong order.' },
    ],
    systemContext: 'A repository returning List where the caller does contains() in a loop is an O(n²) endpoint waiting to be found in a flame graph.',
    related: [
      { to: { roadmap: 'dsa', topic: 'hashing' }, kind: 'implements', why: 'The DSA hashing patterns are these collections used with intent rather than by default.' },
      { to: { roadmap: 'java', topic: 'concurrent-collections' }, kind: 'contrasts', why: 'None of these are thread-safe; the concurrent variants solve a different problem with different costs.' },
    ],
    practice: {
      intent: 'Measure the difference instead of trusting the table.',
      exercises: [
        { title: 'Benchmark the myth', detail: 'Time 100k middle-insertions into ArrayList vs LinkedList. Then time 100k sequential reads. Explain both results.' },
        { title: 'Top-K with a heap', detail: 'Find the 10 most frequent words in a large file using a bounded PriorityQueue. State the complexity and why it beats sorting.' },
      ],
    },
  },
  {
    id: 'generics', roadmap: 'java', tier: 1,
    title: 'Generics and type erasure',
    summary: 'Compile-time safety, and what the JVM knows about it at runtime — which is nothing.',
    whyItMatters: 'Erasure explains a whole family of confusing errors, and the wildcard rules are what let you write APIs other people can actually use.',
    whatToLearn: [
      'Type erasure: generics are a compiler feature, absent at runtime',
      'Bounded types, and PECS — producer extends, consumer super',
      'Why you cannot create a generic array or catch a generic exception',
      'Generic methods vs generic classes',
    ],
    dependencies: [{ roadmap: 'java', topic: 'collections' }],
    nextSteps: [{ roadmap: 'java', topic: 'streams' }],
    howDeep: 'working',
    interviewQuestions: [
      { q: 'Why can you not write new T[10]?', expects: 'Erasure — the runtime does not know T, so it cannot allocate the right array type or enforce stores.' },
      { q: 'List<? extends Number> — what can you add to it?', expects: 'Nothing but null, and why: the compiler cannot prove which subtype the list actually holds.' },
    ],
    related: [],
    practice: {
      intent: 'Hit the erasure walls yourself.',
      exercises: [
        { title: 'PECS in practice', detail: 'Write copy(List<? super T> dst, List<? extends T> src) and explain why swapping the wildcards fails to compile.' },
      ],
    },
  },
  {
    id: 'exceptions', roadmap: 'java', tier: 1,
    title: 'Exceptions and error boundaries',
    summary: 'Checked vs unchecked, and where a service should actually handle failure.',
    whyItMatters: 'Error handling design shows up in every code review. Catching Exception and logging it is the single most common way to turn a recoverable failure into a silent data problem.',
    whatToLearn: [
      'Checked vs unchecked, and the practical argument each way',
      'try-with-resources and why finally is not enough',
      'Exception chaining — never swallow the cause',
      'Where to catch: at the boundary that can actually do something',
      'Custom exceptions that carry context rather than just a message',
    ],
    dependencies: [{ roadmap: 'java', topic: 'oop' }],
    nextSteps: [{ roadmap: 'spring', topic: 'rest-api' }],
    howDeep: 'working',
    interviewQuestions: [
      { q: 'Where should this exception be caught?', expects: 'At the layer that can make a decision — retry, compensate, or translate for the caller. Anywhere else it is noise.' },
      { q: 'What is wrong with catch (Exception e) { log.error(e); }?', expects: 'It converts a failure into a success from the caller\'s perspective, and swallows InterruptedException among others.' },
    ],
    systemContext: 'In Spring, @ControllerAdvice is where domain exceptions become HTTP status codes — the boundary translation made explicit.',
    related: [{ to: { roadmap: 'spring', topic: 'rest-api' }, kind: 'implements', why: 'Global exception handling is this topic applied at the HTTP boundary.' }],
    practice: {
      intent: 'Design a boundary, not a try block.',
      exercises: [
        { title: 'Translate, do not leak', detail: 'Write a service that calls a repository and turns a persistence exception into a domain exception carrying the entity id, without losing the cause.' },
      ],
    },
  },
  {
    id: 'streams', roadmap: 'java', tier: 1,
    title: 'Streams and functional interfaces',
    summary: 'Lazy pipelines, terminal operations, and where a plain loop is still the right answer.',
    whyItMatters: 'Streams are the default idiom in modern Java codebases. Knowing when they hurt readability or performance is the part that separates use from overuse.',
    whatToLearn: [
      'Intermediate vs terminal operations, and laziness',
      'The core functional interfaces: Function, Predicate, Supplier, Consumer',
      'Collectors — groupingBy, toMap, joining, and the duplicate-key trap',
      'Optional as a return type, not as a field',
      'When a for loop is clearer — and when parallel streams actively hurt',
    ],
    dependencies: [{ roadmap: 'java', topic: 'generics' }],
    nextSteps: [{ roadmap: 'java', topic: 'advanced-streams' }],
    howDeep: 'working',
    interviewQuestions: [
      { q: 'When would you avoid a parallel stream?', expects: 'Small collections, IO-bound work, or anything ordering-sensitive — plus that it shares the common ForkJoinPool with everything else in the JVM.' },
      { q: 'Collectors.toMap throws on your data. Why?', expects: 'Duplicate keys, and that the fix is the three-argument overload with an explicit merge function.' },
    ],
    related: [],
    practice: {
      intent: 'Write the pipeline, then justify it against a loop.',
      exercises: [
        { title: 'Group and summarise', detail: 'From a list of orders, produce total revenue per customer, sorted descending, top 5. Then write the same thing as a loop and argue which you would ship.' },
      ],
    },
  },
]
