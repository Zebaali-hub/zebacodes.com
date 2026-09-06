import type { Topic } from './types'

/**
 * Topics, grouped by tier.
 *
 * `roadmapStepId` joins a topic to a step in the ALREADY-PUBLISHED dsa
 * roadmap in data/roadmaps.ts. Those eight steps stay as the public
 * overview; this table is the depth that sits underneath them.
 *
 * Two honest gaps in the published path, left visible rather than
 * papered over:
 *   - Greedy & Intervals has no step, so it carries no roadmapStepId.
 *   - The published path covers Tier 1 only. Every Tier 2 and Tier 3
 *     topic is additional depth beyond it.
 */
export const topics: Topic[] = [
  /* ── Tier 1 ─────────────────────────────────────────────── */
  { id: 'complexity-constraints', tier: 1, roadmapStepId: 'foundations', title: 'Complexity & Constraints', summary: 'Read n and infer the allowed complexity class. Account for recursion stack, hash overhead, queue width and output space.' },
  { id: 'arrays-strings', tier: 1, roadmapStepId: 'arrays-hashing', title: 'Arrays & Strings', summary: 'Traversal, frequency, sorting-based reasoning, subarrays and substrings, palindromes, matrix basics.' },
  { id: 'hashing', tier: 1, roadmapStepId: 'arrays-hashing', title: 'HashMap & HashSet', summary: 'Lookup, complement, index tracking, duplicate detection, grouping, and the two compositions that matter most.' },
  { id: 'two-pointers', tier: 1, roadmapStepId: 'pointers-windows', title: 'Two Pointers', summary: 'Opposite and same direction, fast/slow, sorted-array reasoning, partitioning, deduplication.' },
  { id: 'sliding-window', tier: 1, roadmapStepId: 'pointers-windows', title: 'Sliding Window', summary: 'Fixed and variable size, frequency windows, longest and shortest valid, at-most-K and exactly-K.' },
  { id: 'prefix-suffix', tier: 1, roadmapStepId: 'pointers-windows', title: 'Prefix & Suffix', summary: 'Prefix sums, suffix products, prefix XOR, range queries, difference arrays.' },
  { id: 'binary-search', tier: 1, roadmapStepId: 'binary-search', title: 'Binary Search', summary: 'Bounds discipline, first and last occurrence, rotated arrays, and the first taste of answer-space search.' },
  { id: 'linked-list', tier: 1, roadmapStepId: 'linear-structures', title: 'Linked List', summary: 'Reversal, cycle detection, merging, dummy nodes, nth-from-end, intersection, reordering.' },
  { id: 'stack-queue-deque', tier: 1, roadmapStepId: 'linear-structures', title: 'Stack, Queue & Deque', summary: 'Simulation, parentheses, next greater and smaller, BFS queues, multi-source BFS, monotonic fundamentals.' },
  { id: 'trees-bst', tier: 1, roadmapStepId: 'trees-heaps', title: 'Trees & BST', summary: 'DFS and BFS, traversal orders, height and diameter, views, BST validation, LCA, construction.' },
  { id: 'heap-pq', tier: 1, roadmapStepId: 'trees-heaps', title: 'Heap & Priority Queue', summary: 'Min and max heaps, kth element, Top-K, frequency plus heap, K-way merge fundamentals.' },
  { id: 'graph-core', tier: 1, roadmapStepId: 'graphs-backtracking', title: 'Graph Core', summary: 'Representation, BFS and DFS, connected components, grid-as-graph, islands, multi-source BFS, cycle detection.' },
  { id: 'recursion-backtracking', tier: 1, roadmapStepId: 'graphs-backtracking', title: 'Recursion & Backtracking', summary: 'Recursion return flow, subsets, permutations, combinations, constrained grid exploration.' },
  { id: 'dp-core', tier: 1, roadmapStepId: 'dynamic-programming', title: 'Dynamic Programming Core', summary: 'Recursion to memoisation to tabulation, 1D and basic 2D, grid DP, first knapsack and subset problems.' },
  { id: 'greedy-intervals', tier: 1, title: 'Greedy & Intervals', summary: 'Merge, insert, overlap detection, interval scheduling, and the beginnings of greedy justification.' },

  /* ── Tier 2 ─────────────────────────────────────────────── */
  { id: 'advanced-trees', tier: 2, title: 'Advanced Trees', summary: 'Serialisation, construction from traversals, distance-K, BST iterator, predecessor and successor, Tree DP introduction.' },
  { id: 'advanced-graphs', tier: 2, title: 'Advanced Graphs', summary: 'Topological sort both ways, DSU with path compression and union by rank, Dijkstra, bipartite checking, state-space search.' },
  { id: 'dynamic-programming', tier: 2, title: 'Dynamic Programming', summary: 'Knapsack variants, LCS, LIS, edit distance, palindrome DP, state machines, and space optimisation.' },
  { id: 'binary-search-answer', tier: 2, title: 'Binary Search on Answer', summary: 'Write a feasibility function, then search the answer space. Allocation, capacity, minimise-maximum, maximise-minimum.' },
  { id: 'monotonic', tier: 2, title: 'Monotonic Stack & Deque', summary: 'Next greater and smaller, stock span, daily temperatures, histogram, contribution counting, sliding-window maximum.' },
  { id: 'advanced-heap', tier: 2, title: 'Advanced Heap', summary: 'Two heaps, running median, streaming, scheduling, K-way merge, heap combined with hashing and graphs.' },
  { id: 'advanced-backtracking', tier: 2, title: 'Advanced Backtracking', summary: 'Pruning that actually cuts the tree, duplicate handling, partitioning, palindrome partitioning, constrained grid search.' },
  { id: 'trie', tier: 2, title: 'Trie', summary: 'Insert, search, prefix queries, and the two compositions that make tries worth building.' },

  /* ── Tier 3 ─────────────────────────────────────────────── */
  { id: 'advanced-dp', tier: 3, title: 'Advanced DP', summary: 'Interval and partition DP, Tree DP, DAG DP, bitmask fundamentals, multidimensional state, DP with binary search or greedy.' },
  { id: 'advanced-graph-algorithms', tier: 3, title: 'Advanced Graph Algorithms', summary: '0-1 BFS, Bellman-Ford reasoning, MST via Kruskal and Prim, SCC, bridges and articulation points, low-link intuition.' },
  { id: 'tree-dp', tier: 3, title: 'Advanced Tree Reasoning', summary: 'Multi-state Tree DP, rerooting, sophisticated path aggregation, tree combined with hashing.' },
  { id: 'bit-manipulation', tier: 3, title: 'Bit Manipulation', summary: 'XOR properties, masks, subset enumeration, state compression, and bitmask as a DP or graph dimension.' },
  { id: 'advanced-greedy', tier: 3, title: 'Advanced Greedy', summary: 'Exchange arguments, proof intuition, and greedy combined with sorting, heaps or binary search.' },
  { id: 'cross-pattern', tier: 3, title: 'Cross-Pattern Composition', summary: 'The named combinations treated as a first-class topic, with their own questions and exit test — because composition is what actually gets tested.' },
]

export function getTopic(id: string) {
  return topics.find((topic) => topic.id === id)
}

export function topicsByTier(tier: number) {
  return topics.filter((topic) => topic.tier === tier)
}
