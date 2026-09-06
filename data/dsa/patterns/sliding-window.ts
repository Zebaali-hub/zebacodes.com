import type { Pattern } from '../types'

/**
 * Sliding Window — the Phase 1 vertical slice.
 *
 * Written at the depth every pattern will eventually reach, so it
 * doubles as the reference for what "finished" looks like.
 */
export const slidingWindowPatterns: Pattern[] = [
  {
    id: 'sliding-window-fixed', topicId: 'sliding-window', tier: 1,
    title: 'Fixed-size window',
    purpose: 'Maintain an aggregate over exactly k consecutive elements by adding one and removing one per step.',
    subPatterns: ['fixed sum', 'fixed average', 'fixed-size frequency match', 'anagram search in a string'],
    prerequisites: ['array-traversal'],
    recognitionSignals: [
      'The size k is given in the problem statement',
      '"Every subarray of size k", "maximum average of k elements"',
      'Consecutive or contiguous appears, together with a fixed count',
    ],
    bruteForceSmell:
      'Recomputing the aggregate for each of the n−k+1 windows — O(n·k). Adjacent windows share k−1 elements, so almost all of that work is repeated.',
    whyItWorks:
      'Consecutive windows differ by exactly two elements. If the aggregate supports both adding and removing in O(1), the whole sweep is O(n).',
    whenNotToUse: [
      'The window size is not fixed — use the variable-size form',
      'The aggregate cannot be undone in O(1), such as a maximum without a monotonic deque',
    ],
    commonMistakes: [
      'Building the first window inside the main loop instead of before it, so the first removal underflows',
      'Removing before adding, briefly leaving a window of size k−1 and reading the answer there',
      'Recording the answer before the window has reached full size',
    ],
    typicalTC: 'O(n)', typicalSC: 'O(1), or O(k) when the window holds a frequency map',
    combinesWith: ['hash-frequency', 'monotonic-deque'], googlePriority: false,
  },
  {
    id: 'sliding-window-variable', topicId: 'sliding-window', tier: 1,
    title: 'Variable-size window',
    purpose: 'Grow the window while it stays valid, shrink it the moment it breaks, and record the answer at the right instant.',
    subPatterns: ['longest valid window', 'shortest valid window', 'longest without repeats', 'minimum window substring'],
    prerequisites: ['sliding-window-fixed', 'hash-frequency'],
    recognitionSignals: [
      'Longest or shortest contiguous stretch satisfying a condition',
      'The condition is monotone: extending can only break it, shrinking can only repair it',
      'All values are non-negative, or the condition is about counts rather than sums',
    ],
    bruteForceSmell:
      'Enumerating every (start, end) pair and validating each — O(n²) or worse. Yet when a window is already invalid, every longer window starting at the same index is invalid too, so most pairs never needed checking.',
    whyItWorks:
      'Validity is monotone in the window, so the left boundary never has to move backwards. Each index enters and leaves the window at most once, giving O(n) despite the nested loop.',
    whenNotToUse: [
      'The array contains negative numbers and the condition is a sum — extending can repair validity, breaking monotonicity. Use prefix sum with a hash map instead',
      'The subsequence need not be contiguous — this is a DP problem',
      'You need every valid window, not the best one',
    ],
    commonMistakes: [
      'Recording the answer for a LONGEST problem inside the shrink loop, while the window is still invalid',
      'Recording the answer for a SHORTEST problem outside the shrink loop, after it has already been widened past optimal',
      'Using `if` instead of `while` to shrink, leaving the window invalid when one removal is not enough',
      'Forgetting to remove zero-count keys from the frequency map, so a "distinct characters" check counts stale entries',
    ],
    typicalTC: 'O(n) — each index is added once and removed once',
    typicalSC: 'O(k) for the window state, where k is the alphabet or distinct-value count',
    combinesWith: ['hash-frequency', 'prefix-hashmap'], googlePriority: true,
  },
  {
    id: 'sliding-window-at-most-k', topicId: 'sliding-window', tier: 1,
    title: 'At-most-K, and exactly-K by subtraction',
    purpose: 'Count windows satisfying an exact constraint by expressing it as the difference of two at-most computations.',
    subPatterns: ['at most k distinct', 'exactly k distinct', 'at most k odds', 'counting all valid subarrays'],
    prerequisites: ['sliding-window-variable'],
    recognitionSignals: [
      'Count the NUMBER of subarrays, rather than find the best one',
      '"Exactly k" appears in the statement',
      '"At most k distinct" — the direct form',
    ],
    bruteForceSmell:
      'Counting exactly-k windows directly with two pointers does not work, because the exactly-k condition is not monotone — the naive fix is to enumerate all subarrays again at O(n²).',
    whyItWorks:
      'exactly(k) = atMost(k) − atMost(k−1). The at-most predicate IS monotone, so each side is a standard O(n) window, and the subtraction recovers the non-monotone answer.',
    whenNotToUse: [
      'The problem asks for the longest or shortest exact window rather than a count — subtraction only composes for counting',
      'The at-most form is itself not monotone',
    ],
    commonMistakes: [
      'Trying to run a single window for exactly-k and getting stuck on when to shrink',
      'Counting `right − left + 1` windows only at valid moments instead of at every right, missing the shorter suffixes',
      'Off-by-one in atMost(k−1) when k is 0',
    ],
    typicalTC: 'O(n), run twice', typicalSC: 'O(k)',
    combinesWith: ['hash-frequency'], googlePriority: true,
  },
  {
    id: 'sliding-window-frequency', topicId: 'sliding-window', tier: 1,
    title: 'Window with a frequency map and a validity counter',
    purpose: 'Track how many required characters are still missing, so window validity is an O(1) check instead of a map scan.',
    subPatterns: ['minimum window substring', 'permutation in string', 'character replacement', 'find all anagrams'],
    prerequisites: ['sliding-window-variable', 'string-frequency'],
    recognitionSignals: [
      'The condition involves a multiset of characters, not a sum',
      '"Contains all characters of t", "at most k replacements", "permutation of"',
      'A target string or count vector is supplied',
    ],
    bruteForceSmell:
      'Re-scanning the whole frequency map on every step to ask "is this window valid yet?" — that turns an O(n) sweep into O(n·k).',
    whyItWorks:
      'A single integer counting satisfied requirements is maintainable in O(1) per insertion and removal, so validity becomes a comparison rather than a scan.',
    whenNotToUse: [
      'The alphabet is huge and sparse and only one window is ever checked',
      'Order within the window matters — frequency discards order by construction',
    ],
    commonMistakes: [
      'Incrementing the satisfied counter every time a needed character is added, rather than only when its count reaches the required amount',
      'Decrementing the counter on removal only when the count drops strictly below the requirement — getting this boundary wrong is the single most common bug in this pattern',
      'For character-replacement problems, recomputing the window maximum instead of keeping a running one',
    ],
    typicalTC: 'O(n + m)', typicalSC: 'O(k) for the alphabet',
    combinesWith: ['hash-frequency', 'string-frequency'], googlePriority: true,
  },
]
