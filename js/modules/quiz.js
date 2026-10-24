/**
 * Quiz Module: Interactive MCA Combinatorics Examination
 * Features a dynamic question bank with 108 comprehensive questions (9 per module across all 12 topics).
 * On every page refresh or quiz completion/retake, a brand new set of unseen questions is automatically
 * selected with Fisher-Yates shuffled options and intelligent cycle tracking!
 */
(function (window) {
  'use strict';

  // 108 Comprehensive Questions Bank (9 questions per module for all 12 syllabus topics)
  const questionPool = {
    // =========================================================================
    // MODULE 1: Introduction to Combinatorics & Computing Applications (9 Questions)
    // =========================================================================
    1: [
      {
        question: "In computer security, if a password contains 8 characters chosen from an alphanumeric character set of size 62, what is the total number of possible passwords?",
        options: [
          "62⁸ ≈ 2.18 × 10¹⁴",
          "62 × 8 = 496",
          "C(62, 8) ≈ 3.78 × 10⁹",
          "P(62, 8) ≈ 1.34 × 10¹³"
        ],
        correctIndex: 0,
        explanation: "By the multiplication principle with repetition allowed, each of the 8 character positions can be independently chosen from any of the 62 available alphanumeric symbols, yielding 62⁸ total combinations."
      },
      {
        question: "In a network grid routing model, how many monotonic paths exist from node (0, 0) to node (m, n) using only East and North movements?",
        options: [
          "C(m + n, m) = (m + n)! / (m! · n!)",
          "m × n",
          "P(m + n, m)",
          "2^(m + n)"
        ],
        correctIndex: 0,
        explanation: "Every valid path requires exactly m East moves and n North moves (total m + n moves). Choosing m positions for East moves from m + n total steps yields C(m + n, m) paths."
      },
      {
        question: "What is the Shannon Entropy H(X) in bits for an authentication token chosen uniformly at random from a search space of N equally likely outcomes?",
        options: [
          "log₂(N)",
          "N / 2",
          "ln(N)",
          "2ᴺ"
        ],
        correctIndex: 0,
        explanation: "For a discrete uniform distribution with N outcomes, each outcome has probability p = 1/N. The Shannon entropy is H(X) = -∑ (1/N) log₂(1/N) = log₂(N) bits of cryptographic security."
      },
      {
        question: "An attacker has an ASIC rig capable of computing H hashes per second. For a keyspace of size K, what is the worst-case time required to exhaustively brute-force the key?",
        options: [
          "K / H seconds",
          "K × H seconds",
          "log₂(K) / H seconds",
          "H / K seconds"
        ],
        correctIndex: 0,
        explanation: "Exhaustive brute-force search evaluates at most all K keys in the search space. At a computation rate of H keys/second, the worst-case execution time is K / H seconds."
      },
      {
        question: "How many 4-digit PINs can be formed using the decimal digits {0, 1, ..., 9} if no digit can be repeated?",
        options: [
          "P(10, 4) = 5,040",
          "10⁴ = 10,000",
          "C(10, 4) = 210",
          "10 × 4 = 40"
        ],
        correctIndex: 0,
        explanation: "Because order matters and repetition is prohibited, the number of distinct 4-digit PINs is the permutation P(10, 4) = 10 × 9 × 8 × 7 = 5,040."
      },
      {
        question: "How many monotonic lattice paths exist in a 3D grid from origin (0, 0, 0) to destination (a, b, c) using only +X, +Y, +Z unit steps?",
        options: [
          "(a + b + c)! / (a! · b! · c!)",
          "a × b × c",
          "C(a + b + c, 3)",
          "3^(a + b + c)"
        ],
        correctIndex: 0,
        explanation: "A path requires a steps in X, b steps in Y, and c steps in Z, totaling a + b + c steps. Arrangements of repeated directional movements equal the multinomial coefficient (a + b + c)! / (a! · b! · c!)."
      },
      {
        question: "A standard 24-bit TrueColor pixel representation encodes Red, Green, and Blue channels using 8 bits (0–255) each. How many distinct colors can be represented?",
        options: [
          "256³ = 2²⁴ = 16,777,216",
          "256 × 3 = 768",
          "3²⁵⁶",
          "C(256, 3) = 2,763,520"
        ],
        correctIndex: 0,
        explanation: "Each color channel provides 256 independent intensity levels. By the Product Rule, total color combinations equal 256 × 256 × 256 = 16,777,216."
      },
      {
        question: "Under the standard IPv4 addressing architecture, how many total unique 32-bit IP addresses exist mathematically?",
        options: [
          "2³² = 4,294,967,296",
          "32² = 1,024",
          "C(32, 4) = 35,960",
          "4 × 10⁸"
        ],
        correctIndex: 0,
        explanation: "Each of the 32 bit positions can be independently either 0 or 1. By the multiplication principle with repetition, the address space comprises 2³² = 4,294,967,296 addresses."
      },
      {
        question: "How many binary strings of length n contain at least one digit '1'?",
        options: [
          "2ⁿ - 1",
          "2ⁿ⁻¹",
          "n × 2",
          "C(n, 1)"
        ],
        correctIndex: 0,
        explanation: "The total number of binary strings of length n is 2ⁿ. Exactly 1 string consists entirely of zeros (00...0). By complementary counting, the number of strings with at least one '1' is 2ⁿ - 1."
      }
    ],

    // =========================================================================
    // MODULE 2: Basic Counting Principles (Sum & Product Rule) (9 Questions)
    // =========================================================================
    2: [
      {
        question: "Which counting rule governs selecting an option from mutually exclusive alternatives (e.g., choosing either a Linux server OR a Windows server)?",
        options: [
          "Sum Rule (Addition Principle)",
          "Product Rule (Multiplication Principle)",
          "Pigeonhole Principle",
          "Inclusion-Exclusion with non-empty intersection"
        ],
        correctIndex: 0,
        explanation: "The Sum Rule (Addition Principle) applies when events are mutually exclusive (disjoint), meaning choosing one alternative precludes choosing the other (|A ∪ B| = |A| + |B| when A ∩ B = ∅)."
      },
      {
        question: "A cloud instance can be configured with 4 CPU types, 3 RAM sizes, and 2 storage options. How many total distinct hardware configurations can be constructed?",
        options: [
          "4 × 3 × 2 = 24",
          "4 + 3 + 2 = 9",
          "C(9, 3) = 84",
          "4³ × 2 = 128"
        ],
        correctIndex: 0,
        explanation: "Because hardware procurement consists of consecutive sequential stages (CPU AND RAM AND Storage), the Multiplication Rule yields 4 × 3 × 2 = 24 unique builds."
      },
      {
        question: "A university MCA curriculum offers 5 morning elective courses and 4 evening elective courses. A student must select exactly ONE elective. In how many ways can this be done?",
        options: [
          "5 + 4 = 9 ways",
          "5 × 4 = 20 ways",
          "C(9, 2) = 36 ways",
          "5⁴ = 625 ways"
        ],
        correctIndex: 0,
        explanation: "Since morning and evening courses are mutually exclusive choices for a single course selection, the Sum Rule applies: 5 + 4 = 9 ways."
      },
      {
        question: "A multi-factor login pipeline requires an 8-character password followed by a 6-digit SMS OTP. Which fundamental counting principle governs the total authentication space?",
        options: [
          "Product Rule (Multiplication Principle)",
          "Sum Rule (Addition Principle)",
          "Pigeonhole Principle",
          "Euler's Totient Rule"
        ],
        correctIndex: 0,
        explanation: "The user must provide BOTH a password AND an OTP sequentially. Independent sequential actions are combined using the Product Rule."
      },
      {
        question: "Vehicle registration plates consist of 2 uppercase English letters followed by 4 decimal digits. If repetition of letters and digits is allowed, how many plates can be generated?",
        options: [
          "26² × 10⁴ = 6,760,000",
          "26 × 2 + 10 × 4 = 92",
          "P(26, 2) × P(10, 4) = 3,276,000",
          "36⁶ ≈ 2.17 × 10⁹"
        ],
        correctIndex: 0,
        explanation: "There are 26 choices for each of the 2 letter positions and 10 choices for each of the 4 digit positions. By the Product Rule: 26 × 26 × 10 × 10 × 10 × 10 = 6,760,000."
      },
      {
        question: "In an experimental programming language, an identifier can be either a single uppercase letter OR an uppercase letter followed by a decimal digit. How many identifiers can be created?",
        options: [
          "26 + (26 × 10) = 286",
          "26 × 10 = 260",
          "26 + 10 = 36",
          "26² = 676"
        ],
        correctIndex: 0,
        explanation: "There are 26 single-letter identifiers and 26 × 10 = 260 two-character identifiers. Because these two identifier formats are disjoint, the Sum Rule gives 26 + 260 = 286."
      },
      {
        question: "How many undirected edges are present in a complete graph K_n containing n vertices?",
        options: [
          "n(n - 1) / 2 = C(n, 2)",
          "n²",
          "n(n - 1)",
          "2ⁿ"
        ],
        correctIndex: 0,
        explanation: "In a complete graph, every pair of distinct vertices is connected by an undirected edge. Selecting 2 vertices out of n without regard to order yields C(n, 2) = n(n - 1) / 2 edges."
      },
      {
        question: "A project manager must appoint 1 lead architect from either 15 frontend engineers OR 10 backend engineers. How many choices are available?",
        options: [
          "15 + 10 = 25",
          "15 × 10 = 150",
          "C(25, 2) = 300",
          "15¹⁰"
        ],
        correctIndex: 0,
        explanation: "Because frontend and backend pools are disjoint sets of candidates and only one candidate is selected, the Addition Principle applies: 15 + 10 = 25."
      },
      {
        question: "If set S has n elements, how many total subsets does the power set P(S) contain?",
        options: [
          "2ⁿ",
          "n!",
          "n²",
          "C(n, 2)"
        ],
        correctIndex: 0,
        explanation: "Constructing a subset involves making an independent binary choice (include OR exclude) for each of the n elements. By the Product Rule: 2 × 2 × ... × 2 (n times) = 2ⁿ."
      }
    ],

    // =========================================================================
    // MODULE 3: Permutations (With & Without Repetition) (9 Questions)
    // =========================================================================
    3: [
      {
        question: "How many distinct anagrams can be formed using all the letters in the word 'MISSISSIPPI'?",
        options: [
          "11! / (1! · 4! · 4! · 2!) = 34,650",
          "11! = 39,916,800",
          "C(11, 4) = 330",
          "11⁴ = 14,641"
        ],
        correctIndex: 0,
        explanation: "'MISSISSIPPI' contains 11 letters with multiplicities: M=1, I=4, S=4, P=2. The multinomial permutation formula yields 11! / (1! · 4! · 4! · 2!) = 34,650 distinct permutations."
      },
      {
        question: "What is the general formula for selecting and arranging r items from a set of n distinct items without replacement?",
        options: [
          "P(n, r) = n! / (n - r)!",
          "C(n, r) = n! / [r!(n - r)!]",
          "nʳ",
          "r! / (n - r)!"
        ],
        correctIndex: 0,
        explanation: "Permutations of n items taken r at a time without replacement order the selections: P(n, r) = n × (n - 1) × ... × (n - r + 1) = n! / (n - r)!."
      },
      {
        question: "In how many distinct ways can n distinct people be seated around a circular conference table where rotational shifts are considered identical?",
        options: [
          "(n - 1)!",
          "n!",
          "n! / 2",
          "C(n, 2)"
        ],
        correctIndex: 0,
        explanation: "Fixing one person's position to eliminate rotational symmetry leaves (n - 1) relative positions to arrange the remaining people, giving (n - 1)! circular permutations."
      },
      {
        question: "How many distinct 8-letter permutations can be formed from the word 'COMPUTER' (all letters distinct)?",
        options: [
          "8! = 40,320",
          "8⁸ ≈ 1.67 × 10⁷",
          "C(8, 4) = 70",
          "8 × 7 = 56"
        ],
        correctIndex: 0,
        explanation: "All 8 letters in 'COMPUTER' (C, O, M, P, U, T, E, R) are distinct. Arranging 8 distinct items without repetition yields 8! = 40,320."
      },
      {
        question: "An operating system process scheduler has 5 ready tasks. In how many distinct sequential execution orders can the CPU process all 5 tasks?",
        options: [
          "5! = 120",
          "5⁵ = 3,125",
          "C(5, 2) = 10",
          "5 × 4 = 20"
        ],
        correctIndex: 0,
        explanation: "Scheduling 5 distinct tasks sequentially without repetition is a linear permutation: 5! = 5 × 4 × 3 × 2 × 1 = 120."
      },
      {
        question: "How many 4-digit PIN numbers can be formed using digits {0, 1, ..., 9} when repetition of digits is completely allowed?",
        options: [
          "10⁴ = 10,000",
          "P(10, 4) = 5,040",
          "C(10, 4) = 210",
          "4¹⁰ ≈ 1.05 × 10⁶"
        ],
        correctIndex: 0,
        explanation: "With repetition allowed, each of the 4 positions has 10 independent options, yielding nʳ = 10⁴ = 10,000 possibilities."
      },
      {
        question: "How many distinct anagrams can be formed from the word 'SUCCESS'?",
        options: [
          "7! / (3! · 2! · 1! · 1!) = 420",
          "7! = 5,040",
          "7³ = 343",
          "C(7, 3) = 35"
        ],
        correctIndex: 0,
        explanation: "'SUCCESS' has 7 letters with frequencies S=3, C=2, U=1, E=1. The multinomial permutation formula gives 5040 / (6 × 2) = 420."
      },
      {
        question: "What is the numerical value of the permutation P(8, 3)?",
        options: [
          "8 × 7 × 6 = 336",
          "C(8, 3) = 56",
          "8³ = 512",
          "8! / 3! = 6,720"
        ],
        correctIndex: 0,
        explanation: "P(8, 3) = 8! / (8 - 3)! = 8! / 5! = 8 × 7 × 6 = 336."
      },
      {
        question: "In an athletic coding competition with 8 finalists, in how many ways can Gold, Silver, and Bronze awards be distributed?",
        options: [
          "P(8, 3) = 336",
          "C(8, 3) = 56",
          "8³ = 512",
          "3⁸ = 6,561"
        ],
        correctIndex: 0,
        explanation: "Awarding distinct medals to 3 distinct competitors among 8 participants depends on position order, calculated as P(8, 3) = 336."
      }
    ],

    // =========================================================================
    // MODULE 4: Combinations and Related Identities (9 Questions)
    // =========================================================================
    4: [
      {
        question: "What is the mathematical definition of combination C(n, r), representing selections where order does NOT matter?",
        options: [
          "C(n, r) = n! / [r! · (n - r)!]",
          "C(n, r) = n! / (n - r)!",
          "C(n, r) = r! / [n! · (n - r)!]",
          "C(n, r) = nʳ / r!"
        ],
        correctIndex: 0,
        explanation: "Combinations discard the r! internal permutations of the selected elements from P(n, r), yielding C(n, r) = n! / [r!(n - r)!]."
      },
      {
        question: "Which fundamental combinatorial identity states that C(n, r) = C(n - 1, r - 1) + C(n - 1, r)?",
        options: [
          "Pascal's Identity",
          "Vandermonde's Identity",
          "Hockey-Stick Identity",
          "Symmetry Identity"
        ],
        correctIndex: 0,
        explanation: "Pascal's Identity decomposes selecting r items from n into two disjoint cases: either including a specific element (C(n-1, r-1)) or excluding it (C(n-1, r))."
      },
      {
        question: "Which identity guarantees that choosing r items from n is mathematically identical to choosing which n - r items to leave out?",
        options: [
          "Symmetry Identity: C(n, r) = C(n, n - r)",
          "Pascal's Identity: C(n, r) = C(n - 1, r)",
          "Absorption Identity: r · C(n, r) = n · C(n - 1, r - 1)",
          "Euler's Totient Identity"
        ],
        correctIndex: 0,
        explanation: "By the Symmetry Identity, C(n, r) = n! / [r!(n - r)!] = n! / [(n - r)! r!] = C(n, n - r)."
      },
      {
        question: "What is the numerical value of C(10, 3)?",
        options: [
          "(10 × 9 × 8) / (3 × 2 × 1) = 120",
          "10 × 9 × 8 = 720",
          "C(10, 7) = 240",
          "10! / 3! = 604,800"
        ],
        correctIndex: 0,
        explanation: "C(10, 3) = (10 × 9 × 8) / (3 × 2 × 1) = 720 / 6 = 120."
      },
      {
        question: "A tech lead needs to form a code review panel of 4 engineers from a department of 10. In how many distinct ways can the panel be chosen?",
        options: [
          "C(10, 4) = 210",
          "P(10, 4) = 5,040",
          "10⁴ = 10,000",
          "10 × 4 = 40"
        ],
        correctIndex: 0,
        explanation: "Since all 4 committee members have equal roles and order does not matter, the number of ways is C(10, 4) = (10 × 9 × 8 × 7) / 24 = 210."
      },
      {
        question: "What is the statement of the Hockey-Stick (Christmas Stocking) Identity in combinatorics?",
        options: [
          "∑_{i=r}^n C(i, r) = C(n + 1, r + 1)",
          "∑_{i=0}^n C(n, i) = 2ⁿ",
          "C(n, r) = C(n - 1, r - 1)",
          "C(n, r) × C(r, k) = C(n, k)"
        ],
        correctIndex: 0,
        explanation: "The Hockey-Stick Identity states that summing elements down a diagonal of Pascal's triangle equals the entry down-and-right: ∑_{i=r}^n C(i, r) = C(n + 1, r + 1)."
      },
      {
        question: "What is Vandermonde's Identity, frequently used in committee selections and probability convolutions?",
        options: [
          "∑_{k=0}^r C(m, k) · C(n, r - k) = C(m + n, r)",
          "C(m + n, r) = C(m, r) + C(n, r)",
          "C(n, r) = C(n - 1, r - 1) + C(n - 1, r)",
          "∑_{k=0}^n C(n, k)² = 2²ⁿ"
        ],
        correctIndex: 0,
        explanation: "Vandermonde's Identity partitions choosing r items from two combined pools m and n into selecting k from m and r - k from n: ∑_{k=0}^r C(m, k) · C(n, r - k) = C(m + n, r)."
      },
      {
        question: "For any positive integer n ≥ 1, what is the value of C(n, 0) + C(n, n)?",
        options: [
          "1 + 1 = 2",
          "n",
          "0",
          "2ⁿ"
        ],
        correctIndex: 0,
        explanation: "C(n, 0) is the number of ways to choose 0 items (1 way: empty set), and C(n, n) is choosing all items (1 way). Their sum is 1 + 1 = 2."
      },
      {
        question: "In a decentralized peer-to-peer network cluster with 12 nodes, how many distinct bidirectional communication channels exist between node pairs?",
        options: [
          "C(12, 2) = 66",
          "12 × 11 = 132",
          "12² = 144",
          "2¹² = 4,096"
        ],
        correctIndex: 0,
        explanation: "Each bidirectional link connects an unordered pair of 2 distinct nodes. Total links = C(12, 2) = (12 × 11) / 2 = 66."
      }
    ],

    // =========================================================================
    // MODULE 5: Binomial Theorem and Pascal's Triangle (9 Questions)
    // =========================================================================
    5: [
      {
        question: "According to the Binomial Theorem, what is the expansion of (a + b)ⁿ for any non-negative integer n?",
        options: [
          "∑_{k=0}^n C(n, k) · aⁿ⁻ᵏ · bᵏ",
          "∑_{k=0}^n P(n, k) · aᵏ · bⁿ⁻ᵏ",
          "aⁿ + bⁿ",
          "∑_{k=0}^n (n! / k!) · aⁿ⁻ᵏ · bᵏ"
        ],
        correctIndex: 0,
        explanation: "The Binomial Theorem proves (a + b)ⁿ = ∑_{k=0}^n C(n, k) aⁿ⁻ᵏ bᵏ, where the coefficients correspond to Row n of Pascal's Triangle."
      },
      {
        question: "What is the sum of all binomial coefficients in Row n of Pascal's Triangle: C(n, 0) + C(n, 1) + ... + C(n, n)?",
        options: [
          "2ⁿ",
          "n!",
          "2ⁿ⁻¹",
          "n²"
        ],
        correctIndex: 0,
        explanation: "Substituting a = 1 and b = 1 into the Binomial Theorem yields (1 + 1)ⁿ = 2ⁿ = ∑_{k=0}^n C(n, k)."
      },
      {
        question: "What is the value of the alternating sum of binomial coefficients: C(n, 0) - C(n, 1) + C(n, 2) - ... + (-1)ⁿ C(n, n) for n ≥ 1?",
        options: [
          "0",
          "1",
          "-1",
          "2ⁿ"
        ],
        correctIndex: 0,
        explanation: "Substituting a = 1 and b = -1 into the Binomial Theorem yields (1 - 1)ⁿ = 0ⁿ = 0."
      },
      {
        question: "What is the numerical coefficient of the term x³ in the polynomial expansion of (1 + x)⁷?",
        options: [
          "C(7, 3) = 35",
          "C(7, 4) = 21",
          "7! / 3! = 840",
          "7³ = 343"
        ],
        correctIndex: 0,
        explanation: "The general term is C(7, k) 1⁷⁻ᵏ xᵏ. For x³, k = 3, giving coefficient C(7, 3) = (7 × 6 × 5) / (3 × 2 × 1) = 35."
      },
      {
        question: "How many total terms are present in the fully expanded algebraic form of (x + y)ⁿ?",
        options: [
          "n + 1",
          "n",
          "2ⁿ",
          "n!"
        ],
        correctIndex: 0,
        explanation: "The summation index k runs from k = 0 to k = n inclusive, creating exactly n + 1 distinct polynomial terms."
      },
      {
        question: "What is the sum of the numbers in Row 5 of Pascal's Triangle (entries: 1, 5, 10, 10, 5, 1)?",
        options: [
          "2⁵ = 32",
          "5! = 120",
          "2⁴ = 16",
          "25"
        ],
        correctIndex: 0,
        explanation: "1 + 5 + 10 + 10 + 5 + 1 = 32 = 2⁵."
      },
      {
        question: "What is the 4th term (k = 3) in the expansion of (2x + 1)⁵?",
        options: [
          "C(5, 3) · (2x)² · (1)³ = 40x²",
          "10x³",
          "80x³",
          "20x²"
        ],
        correctIndex: 0,
        explanation: "T₄ = C(5, 3) · (2x)⁵⁻³ · 1³ = 10 · (4x²) · 1 = 40x²."
      },
      {
        question: "Which row of Pascal's Triangle contains the sequence of entries 1, 6, 15, 20, 15, 6, 1?",
        options: [
          "Row 6",
          "Row 5",
          "Row 7",
          "Row 20"
        ],
        correctIndex: 0,
        explanation: "Row n has second entry n. Because the second entry is 6, these are the coefficients C(6, k) for k = 0, ..., 6 (Row 6)."
      },
      {
        question: "What is the sum of the odd-indexed binomial coefficients C(n, 1) + C(n, 3) + C(n, 5) + ... for any n ≥ 1?",
        options: [
          "2ⁿ⁻¹",
          "2ⁿ",
          "n / 2",
          "2ⁿ - 1"
        ],
        correctIndex: 0,
        explanation: "Because the alternating sum is 0, the sum of even-indexed coefficients equals the sum of odd-indexed coefficients. Both equal 2ⁿ / 2 = 2ⁿ⁻¹."
      }
    ],

    // =========================================================================
    // MODULE 6: Pigeonhole Principle (Basic & Generalized) (9 Questions)
    // =========================================================================
    6: [
      {
        question: "What is the core guarantee of the basic Pigeonhole Principle (Dirichlet's Box Principle)?",
        options: [
          "If N items are placed into k boxes and N > k, at least one box contains ≥ 2 items",
          "Every box must receive at least one item",
          "Items are uniformly distributed across all boxes",
          "The maximum number of items in any box is N - k"
        ],
        correctIndex: 0,
        explanation: "If N objects are partitioned into k sets with N > k, by proof by contradiction, at least one set must contain strictly more than N/k objects, i.e., at least 2 objects."
      },
      {
        question: "What does the Generalized Pigeonhole Principle state when N items are distributed into k distinct boxes?",
        options: [
          "At least one box contains at least ⌈N / k⌉ items",
          "Every box contains exactly ⌊N / k⌋ items",
          "At least one box contains at most ⌈N / k⌉ items",
          "The total number of collisions is N - k"
        ],
        correctIndex: 0,
        explanation: "The Generalized Pigeonhole Principle states that if N items are placed into k boxes, at least one box must contain at least ⌈N / k⌉ items (where ⌈x⌉ is the ceiling function)."
      },
      {
        question: "In an MCA classroom with 37 students, what is the guaranteed minimum number of students born in the same calendar month?",
        options: [
          "⌈37 / 12⌉ = 4 students",
          "37 / 12 = 3 students",
          "12 students",
          "2 students"
        ],
        correctIndex: 0,
        explanation: "Items N = 37 students, boxes k = 12 months. By the Generalized Pigeonhole Principle, at least one month must have at least ⌈37 / 12⌉ = ⌈3.083⌉ = 4 birthdays."
      },
      {
        question: "A hash table uses modular hashing with 10 buckets. What is the minimum number of keys that must be inserted to guarantee at least one collision?",
        options: [
          "11 keys",
          "10 keys",
          "20 keys",
          "100 keys"
        ],
        correctIndex: 0,
        explanation: "There are k = 10 buckets. By the Pigeonhole Principle, inserting N = k + 1 = 11 keys mathematically guarantees at least one bucket contains ≥ 2 keys (a hash collision)."
      },
      {
        question: "In any group of 8 randomly selected individuals, at least how many must share the same day of the week for their birth?",
        options: [
          "⌈8 / 7⌉ = 2 people",
          "1 person",
          "8 / 7 = 1.14 people",
          "7 people"
        ],
        correctIndex: 0,
        explanation: "N = 8 individuals, k = 7 days of the week. By Generalized Pigeonhole: ⌈8 / 7⌉ = 2 individuals must share the same weekday."
      },
      {
        question: "Why is it mathematically impossible for a lossless compression algorithm to compress EVERY n-bit file into a shorter file of length ≤ n - 1 bits?",
        options: [
          "There are fewer shorter bitstrings (2ⁿ - 1) than n-bit bitstrings (2ⁿ), so the Pigeonhole Principle forces collisions",
          "Lossless compression algorithms introduce floating-point errors",
          "Entropy is always negative for binary data",
          "Shannon's limit applies only to lossy compression"
        ],
        correctIndex: 0,
        explanation: "Total n-bit files = 2ⁿ. Total possible files of length < n is ∑_{i=0}^{n-1} 2ⁱ = 2ⁿ - 1. Mapping 2ⁿ files to 2ⁿ - 1 outputs forces two distinct inputs to have the same compressed output, violating lossless decompression."
      },
      {
        question: "A drawer contains 10 black socks and 10 blue socks. In pitch darkness, what is the minimum number of socks a person must pull out to guarantee a matching pair?",
        options: [
          "3 socks",
          "2 socks",
          "11 socks",
          "4 socks"
        ],
        correctIndex: 0,
        explanation: "Pigeonholes are the k = 2 colors (black, blue). By Pigeonhole Principle, pulling N = k + 1 = 3 socks guarantees at least ⌈3 / 2⌉ = 2 socks of the same color."
      },
      {
        question: "If 51 points are placed inside a unit square partitioned into 25 congruent sub-squares of area 0.04, what is the minimum number of points guaranteed in some sub-square?",
        options: [
          "⌈51 / 25⌉ = 3 points",
          "2 points",
          "4 points",
          "51 / 25 = 2.04 points"
        ],
        correctIndex: 0,
        explanation: "Points N = 51, sub-squares k = 25. By Generalized Pigeonhole Principle, at least one sub-square contains at least ⌈51 / 25⌉ = ⌈2.04⌉ = 3 points."
      },
      {
        question: "What is the minimum number of cards that must be drawn from a standard 52-card deck to guarantee that at least 3 cards belong to the same suit?",
        options: [
          "2 × 4 + 1 = 9 cards",
          "3 × 4 = 12 cards",
          "13 cards",
          "7 cards"
        ],
        correctIndex: 0,
        explanation: "There are k = 4 suits. In the worst case, you could draw 2 cards of each of the 4 suits (total 8 cards) without reaching 3 of any suit. Drawing 1 more card (8 + 1 = 9) guarantees ⌈9 / 4⌉ = 3 cards of the same suit."
      }
    ],

    // =========================================================================
    // MODULE 7: Inclusion–Exclusion Principle (9 Questions)
    // =========================================================================
    7: [
      {
        question: "What is the Principle of Inclusion–Exclusion formula for the cardinality of the union of two arbitrary finite sets A and B?",
        options: [
          "|A ∪ B| = |A| + |B| - |A ∩ B|",
          "|A ∪ B| = |A| + |B| + |A ∩ B|",
          "|A ∪ B| = |A| × |B|",
          "|A ∪ B| = |A| + |B|"
        ],
        correctIndex: 0,
        explanation: "Adding |A| and |B| double-counts elements belonging to their intersection A ∩ B. Subtracting |A ∩ B| corrects the overlap."
      },
      {
        question: "What is the Inclusion–Exclusion formula for 3 sets A, B, and C?",
        options: [
          "|A ∪ B ∪ C| = |A| + |B| + |C| - (|A∩B| + |B∩C| + |A∩C|) + |A∩B∩C|",
          "|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B∩C|",
          "|A ∪ B ∪ C| = |A| + |B| + |C| - (|A∩B| + |B∩C| + |A∩C|)",
          "|A ∪ B ∪ C| = |A| × |B| × |C|"
        ],
        correctIndex: 0,
        explanation: "The alternating sum adds single set sizes, subtracts pairwise intersections (which were overcounted), and adds back the 3-way intersection (which was subtracted three times)."
      },
      {
        question: "In a department, 20 engineers know Python, 30 know Java, and 10 know both languages. How many engineers know at least one of these languages?",
        options: [
          "20 + 30 - 10 = 40",
          "20 + 30 = 50",
          "20 + 30 + 10 = 60",
          "30 - 20 = 10"
        ],
        correctIndex: 0,
        explanation: "By Inclusion-Exclusion: |P ∪ J| = |P| + |J| - |P ∩ J| = 20 + 30 - 10 = 40."
      },
      {
        question: "How many positive integers between 1 and 100 inclusive are divisible by either 2 or 3?",
        options: [
          "50 + 33 - 16 = 67",
          "50 + 33 = 83",
          "100 / 6 = 16",
          "50 + 33 + 16 = 99"
        ],
        correctIndex: 0,
        explanation: "Divisible by 2: ⌊100/2⌋ = 50. Divisible by 3: ⌊100/3⌋ = 33. Divisible by both (lcm(2,3)=6): ⌊100/6⌋ = 16. Total = 50 + 33 - 16 = 67."
      },
      {
        question: "Euler's Totient function φ(n) counts positive integers ≤ n coprime to n. For any prime number p, what is φ(p)?",
        options: [
          "p - 1",
          "p",
          "p + 1",
          "p / 2"
        ],
        correctIndex: 0,
        explanation: "Since p is prime, every integer from 1 to p - 1 shares no common factors with p other than 1. Thus φ(p) = p - 1."
      },
      {
        question: "Using the Principle of Inclusion-Exclusion, how many onto functions (surjections) exist from a set of size m to a set of size n?",
        options: [
          "∑_{k=0}^n (-1)ᵏ · C(n, k) · (n - k)ᵐ",
          "nᵐ",
          "mⁿ",
          "P(m, n)"
        ],
        correctIndex: 0,
        explanation: "The number of surjections counts mappings from m to n that miss 0 elements of the target set, derived via Inclusion-Exclusion as ∑_{k=0}^n (-1)ᵏ C(n, k) (n - k)ᵐ."
      },
      {
        question: "In a class of 100 students, 60 know C++, 50 know Java, and 20 know both. How many students know NEITHER C++ NOR Java?",
        options: [
          "100 - (60 + 50 - 20) = 10",
          "20",
          "30",
          "100 - (60 + 50) = -10"
        ],
        correctIndex: 0,
        explanation: "|C ∪ J| = 60 + 50 - 20 = 90 students know at least one language. Those knowing neither equal 100 - 90 = 10."
      },
      {
        question: "According to De Morgan's Laws, what is the complement of the union of two sets: (A ∪ B)'?",
        options: [
          "A' ∩ B'",
          "A' ∪ B'",
          "A ∩ B",
          "(A ∩ B)'"
        ],
        correctIndex: 0,
        explanation: "De Morgan's First Law states that (A ∪ B)' = A' ∩ B' (not in A AND not in B)."
      },
      {
        question: "What is the cardinality of the union of 3 mutually pairwise disjoint sets A, B, and C where A ∩ B = B ∩ C = A ∩ C = ∅?",
        options: [
          "|A| + |B| + |C|",
          "|A| + |B| + |C| - |A ∩ B ∩ C|",
          "|A| × |B| × |C|",
          "0"
        ],
        correctIndex: 0,
        explanation: "When sets are mutually disjoint, all intersection cardinalities are zero, collapsing the Inclusion-Exclusion formula directly to |A| + |B| + |C|."
      }
    ],

    // =========================================================================
    // MODULE 8: Derangements & Applications (9 Questions)
    // =========================================================================
    8: [
      {
        question: "What is the mathematical definition of a derangement of n distinct items?",
        options: [
          "A permutation where NO element appears in its original starting position (zero fixed points)",
          "A circular arrangement of items",
          "A permutation where at least one item remains fixed",
          "A random subset selection"
        ],
        correctIndex: 0,
        explanation: "A derangement is a permutation σ of {1, 2, ..., n} such that σ(i) ≠ i for all i ∈ {1, ..., n}. It has no fixed points."
      },
      {
        question: "Which recurrence relation generates the subfactorial / derangement sequence D(n)?",
        options: [
          "D(n) = (n - 1) · [D(n - 1) + D(n - 2)]",
          "D(n) = n · D(n - 1)",
          "D(n) = D(n - 1) + D(n - 2)",
          "D(n) = 2 · D(n - 1) + 1"
        ],
        correctIndex: 0,
        explanation: "Derangements satisfy the linear recurrence D(n) = (n - 1)[D(n - 1) + D(n - 2)], modeling swapping two elements vs an element participating in an n-cycle."
      },
      {
        question: "What are the standard base cases for the derangement subfactorial function D(n)?",
        options: [
          "D(0) = 1, D(1) = 0",
          "D(0) = 0, D(1) = 1",
          "D(0) = 1, D(1) = 1",
          "D(0) = 0, D(1) = 0"
        ],
        correctIndex: 0,
        explanation: "An empty set has 1 vacuous derangement (D(0) = 1), whereas a single element can only map to itself so it has 0 derangements (D(1) = 0)."
      },
      {
        question: "What is the exact value of D(3), the number of derangements of 3 elements?",
        options: [
          "2",
          "3",
          "1",
          "6"
        ],
        correctIndex: 0,
        explanation: "Using the recurrence D(3) = (3 - 1)[D(2) + D(1)] = 2 × (1 + 0) = 2. For elements (1,2,3), the derangements are (2,3,1) and (3,1,2)."
      },
      {
        question: "What is the exact value of D(4), the number of derangements of 4 elements?",
        options: [
          "9",
          "24",
          "12",
          "8"
        ],
        correctIndex: 0,
        explanation: "D(4) = (4 - 1)[D(3) + D(2)] = 3 × (2 + 1) = 3 × 3 = 9."
      },
      {
        question: "As the number of elements n approaches infinity, what does the probability of a random permutation being a derangement D(n)/n! converge to?",
        options: [
          "1 / e ≈ 0.367879 (36.79%)",
          "1 / 2 = 0.500000",
          "0",
          "1 / π ≈ 0.318310"
        ],
        correctIndex: 0,
        explanation: "D(n)/n! = ∑_{k=0}^n (-1)ᵏ / k!. As n → ∞, this Taylor series evaluates to e⁻¹ = 1/e ≈ 0.367879."
      },
      {
        question: "In the classic Hat-Check problem, 100 guests check their hats and receive a random hat on leaving. Approximately what is the probability that NO guest gets their own hat back?",
        options: [
          "≈ 1 / e ≈ 36.8%",
          "≈ 1%",
          "≈ 50%",
          "0%"
        ],
        correctIndex: 0,
        explanation: "The event that no guest receives their own hat is a derangement of 100 items. For n = 100, the probability is extraordinarily close to 1/e ≈ 0.367879."
      },
      {
        question: "What is the exact value of D(5)?",
        options: [
          "44",
          "120",
          "24",
          "45"
        ],
        correctIndex: 0,
        explanation: "D(5) = (5 - 1)[D(4) + D(3)] = 4 × (9 + 2) = 4 × 11 = 44."
      },
      {
        question: "In block cipher design (such as AES S-Box generation), why are permutations with zero fixed points (derangements) specifically preferred?",
        options: [
          "They prevent identity mappings where a byte plaintext symbol maps to itself",
          "They reduce the keyspace to make decryption faster",
          "They convert nonlinear functions into linear equations",
          "They guarantee symmetric encryption keys"
        ],
        correctIndex: 0,
        explanation: "If an S-box maps a byte to itself (fixed point S(x) = x), it leaks structural information and weakens resistance to differential cryptanalysis. Derangements ensure S(x) ≠ x for all x."
      }
    ],

    // =========================================================================
    // MODULE 9: Counting With Repetition and Multisets (9 Questions)
    // =========================================================================
    9: [
      {
        question: "Which formula gives the number of ways to distribute r identical items into n distinct categories (or selecting r items from n types with repetition)?",
        options: [
          "C(n + r - 1, r) = C(n + r - 1, n - 1)",
          "P(n + r - 1, r)",
          "nʳ",
          "rⁿ"
        ],
        correctIndex: 0,
        explanation: "The Stars and Bars theorem models r identical items as stars and n - 1 dividers between categories, yielding C(n + r - 1, r) combinations."
      },
      {
        question: "How many non-negative integer solutions (x₁, x₂, x₃ ≥ 0) exist for the equation x₁ + x₂ + x₃ = 10?",
        options: [
          "C(3 + 10 - 1, 10) = C(12, 10) = 66",
          "C(10, 3) = 120",
          "3¹⁰ = 59,049",
          "10³ = 1,000"
        ],
        correctIndex: 0,
        explanation: "Here n = 3 variables and sum r = 10. By Stars and Bars: C(n + r - 1, r) = C(3 + 10 - 1, 10) = C(12, 10) = (12 × 11) / 2 = 66."
      },
      {
        question: "How many positive integer solutions (x₁, x₂, x₃, x₄ ≥ 1) exist for the equation x₁ + x₂ + x₃ + x₄ = 12?",
        options: [
          "C(12 - 1, 4 - 1) = C(11, 3) = 165",
          "C(4 + 12 - 1, 12) = C(15, 12) = 455",
          "C(12, 4) = 495",
          "4¹² ≈ 1.67 × 10⁷"
        ],
        correctIndex: 0,
        explanation: "For strictly positive integers (xᵢ ≥ 1), place 1 star in each of the 4 bins first, leaving 12 - 4 = 8 stars. Stars and Bars gives C(4 + 8 - 1, 8) = C(11, 3) = (11 × 10 × 9) / 6 = 165."
      },
      {
        question: "A bakery sells 3 flavors of donuts (Chocolate, Glazed, Jelly). In how many ways can a customer purchase a box of 4 donuts (repetition allowed)?",
        options: [
          "C(3 + 4 - 1, 4) = C(6, 4) = 15",
          "3⁴ = 81",
          "4³ = 64",
          "C(4, 3) = 4"
        ],
        correctIndex: 0,
        explanation: "n = 3 flavors, r = 4 donuts. C(n + r - 1, r) = C(3 + 4 - 1, 4) = C(6, 4) = 15."
      },
      {
        question: "In the graphical Stars and Bars model for distributing r items into n bins, what do the 'bars' represent?",
        options: [
          "The n - 1 dividers separating the n distinct bins",
          "The items being distributed",
          "The number of equations",
          "The modulo arithmetic operations"
        ],
        correctIndex: 0,
        explanation: "To partition items into n bins, exactly n - 1 boundary dividers (bars) are placed among the r stars."
      },
      {
        question: "How can a positive integer solution problem (xᵢ ≥ 1) be converted into a non-negative integer problem (yᵢ ≥ 0)?",
        options: [
          "Substitute yᵢ = xᵢ - 1, which reduces the target sum by n",
          "Multiply both sides by n",
          "Set all xᵢ = 1",
          "Use inclusion-exclusion directly"
        ],
        correctIndex: 0,
        explanation: "Letting yᵢ = xᵢ - 1 guarantees yᵢ ≥ 0. The sum becomes ∑(yᵢ + 1) = r ⟹ ∑ yᵢ = r - n."
      },
      {
        question: "How many total terms are present in the expansion of the multinomial (x₁ + x₂ + ... + xₙ)ʳ?",
        options: [
          "C(n + r - 1, r)",
          "nʳ",
          "rⁿ",
          "n! / r!"
        ],
        correctIndex: 0,
        explanation: "Each term has the form x₁ᵏ¹ x₂ᵏ² ... xₙᵏⁿ with k₁ + ... + kₙ = r and kᵢ ≥ 0. The number of such terms is the multiset coefficient C(n + r - 1, r)."
      },
      {
        question: "A cloud load balancer distributes 5 identical computational jobs among 3 available worker servers. Servers may receive 0 jobs. How many ways can jobs be allocated?",
        options: [
          "C(3 + 5 - 1, 5) = C(7, 5) = 21",
          "3⁵ = 243",
          "5³ = 125",
          "C(5, 3) = 10"
        ],
        correctIndex: 0,
        explanation: "Identical jobs into distinct servers is Stars and Bars: n = 3, r = 5. C(3 + 5 - 1, 5) = C(7, 5) = (7 × 6) / 2 = 21."
      },
      {
        question: "How many distinct multisets of size 3 can be formed using symbols from the alphabet {A, B}?",
        options: [
          "C(2 + 3 - 1, 3) = C(4, 3) = 4",
          "2³ = 8",
          "3² = 9",
          "P(3, 2) = 6"
        ],
        correctIndex: 0,
        explanation: "n = 2 symbols, size r = 3. C(2 + 3 - 1, 3) = C(4, 3) = 4. The 4 multisets are: {A,A,A}, {A,A,B}, {A,B,B}, and {B,B,B}."
      }
    ],

    // =========================================================================
    // MODULE 10: Integer Partitions and Compositions (9 Questions)
    // =========================================================================
    10: [
      {
        question: "What is an integer partition p(n) of a positive integer n?",
        options: [
          "A representation of n as a sum of positive integers where the order of summands does NOT matter",
          "A representation of n as a sum of integers where order matters",
          "The prime factorization of n",
          "The binary representation of n"
        ],
        correctIndex: 0,
        explanation: "Partitions express n as a sum of positive integers where order is irrelevant: e.g., 3 + 1 and 1 + 3 represent the same partition of 4."
      },
      {
        question: "How many total compositions c(n) exist for any positive integer n ≥ 1 (where the order of summands DOES matter)?",
        options: [
          "2ⁿ⁻¹",
          "n!",
          "p(n)",
          "2ⁿ"
        ],
        correctIndex: 0,
        explanation: "An integer composition represents placing plus signs (+) or spaces in the n - 1 gaps between n unit dots. With 2 choices per gap, there are exactly 2ⁿ⁻¹ compositions."
      },
      {
        question: "What is the exact partition count p(4)?",
        options: [
          "5",
          "8",
          "4",
          "7"
        ],
        correctIndex: 0,
        explanation: "The 5 partitions of 4 are: 4, 3+1, 2+2, 2+1+1, and 1+1+1+1. Thus p(4) = 5."
      },
      {
        question: "What is the total number of compositions c(4) of the integer 4?",
        options: [
          "2⁴⁻¹ = 2³ = 8",
          "5",
          "16",
          "4"
        ],
        correctIndex: 0,
        explanation: "c(4) = 2⁴⁻¹ = 2³ = 8. (They are: 4; 3+1, 1+3; 2+2; 2+1+1, 1+2+1, 1+1+2; 1+1+1+1)."
      },
      {
        question: "In partition theory, what is a Ferrers diagram (or Young diagram)?",
        options: [
          "A graphical visualization using rows of dots or boxes representing partition parts in non-increasing order",
          "A binary decision tree",
          "A Venn diagram for partitions",
          "A transition graph for Markov chains"
        ],
        correctIndex: 0,
        explanation: "A Ferrers diagram represents a partition λ = (λ₁, λ₂, ...) graphically as left-justified rows of dots, where row i contains λᵢ dots."
      },
      {
        question: "How is the conjugate (transpose) of an integer partition obtained from its Ferrers diagram?",
        options: [
          "By reflecting the diagram across its main top-left to bottom-right diagonal (interchanging rows and columns)",
          "By inverting the signs of all parts",
          "By multiplying all parts by -1",
          "By reversing the order of summands"
        ],
        correctIndex: 0,
        explanation: "Reflecting a Ferrers diagram across its main diagonal interchanges rows and columns, producing the conjugate partition λ*."
      },
      {
        question: "Which deep mathematical theorem provides an efficient recurrence to compute p(n) in polynomial time O(n^(3/2)) via generalized pentagonal numbers?",
        options: [
          "Euler's Pentagonal Number Theorem",
          "Fermat's Little Theorem",
          "Lagrange's Four-Square Theorem",
          "Euclid's Lemma"
        ],
        correctIndex: 0,
        explanation: "Euler proved ∏_{k=1}^∞ (1 - xᵏ) = ∑ (-1)ᵏ x^(k(3k-1)/2), which inverts to give an efficient recurrence for computing partition numbers p(n)."
      },
      {
        question: "What is the exact partition count p(5)?",
        options: [
          "7",
          "5",
          "10",
          "16"
        ],
        correctIndex: 0,
        explanation: "The 7 partitions of 5 are: 5; 4+1; 3+2; 3+1+1; 2+2+1; 2+1+1+1; 1+1+1+1+1. Thus p(5) = 7."
      },
      {
        question: "Euler famously proved that the number of partitions of n into distinct parts is always EQUAL to the number of partitions of n into:",
        options: [
          "Odd parts only",
          "Even parts only",
          "Prime parts only",
          "At most 2 parts"
        ],
        correctIndex: 0,
        explanation: "Euler's partition identity states that the number of partitions of n into distinct parts equals the number of partitions of n into odd parts (∏(1 + xᵏ) = ∏ 1/(1 - x²ᵏ⁻¹))."
      }
    ],

    // =========================================================================
    // MODULE 11: Recurrence Relations & Solutions (9 Questions)
    // =========================================================================
    11: [
      {
        question: "The Tower of Hanoi recurrence relation is given by T(n) = 2·T(n - 1) + 1 with base case T(1) = 1. What is its exact closed-form solution?",
        options: [
          "T(n) = 2ⁿ - 1",
          "T(n) = n²",
          "T(n) = n · log₂ n",
          "T(n) = 2ⁿ + 1"
        ],
        correctIndex: 0,
        explanation: "By repeated back-substitution: T(1) = 1, T(2) = 3, T(3) = 7, T(n) = 2ⁿ - 1. Solving an n-disk puzzle requires exponential time O(2ⁿ)."
      },
      {
        question: "What is the asymptotic time complexity of the divide-and-conquer recurrence T(n) = 2·T(n/2) + n (Merge Sort)?",
        options: [
          "Θ(n · log₂ n)",
          "O(n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        correctIndex: 0,
        explanation: "Applying Master Theorem Case 2: a = 2, b = 2, f(n) = n. Since log_b(a) = log₂(2) = 1 and f(n) = Θ(n¹), T(n) = Θ(n log n)."
      },
      {
        question: "Which linear homogeneous recurrence relation with constant coefficients defines the Fibonacci numbers F(n)?",
        options: [
          "F(n) = F(n - 1) + F(n - 2) with F(0) = 0, F(1) = 1",
          "F(n) = 2 · F(n - 1)",
          "F(n) = F(n - 1) · F(n - 2)",
          "F(n) = F(n / 2) + 1"
        ],
        correctIndex: 0,
        explanation: "The Fibonacci sequence is defined by the second-order linear recurrence F(n) = F(n - 1) + F(n - 2) with base cases F(0) = 0, F(1) = 1."
      },
      {
        question: "What is the characteristic equation for the second-order recurrence a_n - 5·a_{n-1} + 6·a_{n-2} = 0?",
        options: [
          "r² - 5r + 6 = 0 (roots r = 2, r = 3)",
          "r² + 5r + 6 = 0",
          "r² - 6r + 5 = 0",
          "r² - 5r = 0"
        ],
        correctIndex: 0,
        explanation: "Assuming a solution of the form a_n = rⁿ and dividing by rⁿ⁻² gives r² - 5r + 6 = (r - 2)(r - 3) = 0."
      },
      {
        question: "What is the solution to the divide-and-conquer recurrence T(n) = T(n / 2) + O(1) governing Binary Search?",
        options: [
          "O(log₂ n)",
          "O(n)",
          "O(n · log n)",
          "O(1)"
        ],
        correctIndex: 0,
        explanation: "Halving the search space in each step requires log₂(n) steps. By Master Theorem (a = 1, b = 2): T(n) = O(log n)."
      },
      {
        question: "In the Master Theorem T(n) = a·T(n/b) + f(n), what condition leads to Case 1: T(n) = Θ(n^(log_b a))?",
        options: [
          "f(n) = O(n^(log_b(a) - ε)) for some constant ε > 0",
          "f(n) = Θ(n^(log_b a))",
          "f(n) = Ω(n^(log_b(a) + ε))",
          "a < b"
        ],
        correctIndex: 0,
        explanation: "When f(n) is polynomially smaller than n^(log_b a), the work is dominated by the leaves of the recursion tree, yielding T(n) = Θ(n^(log_b a))."
      },
      {
        question: "Why does Dynamic Programming (DP) achieve exponential speedups over naive recursion for Fibonacci and partition calculations?",
        options: [
          "It memoizes and reuses solutions to overlapping subproblems, avoiding redundant computations",
          "It converts sequential execution into parallel execution",
          "It simplifies mathematical induction into base cases",
          "It approximates BigInt arithmetic using floating-point registers"
        ],
        correctIndex: 0,
        explanation: "Naive recursion computes the same subproblems repeatedly (O(2ⁿ) call tree). DP stores results in a table, reducing time complexity to linear O(n)."
      },
      {
        question: "What is the closed-form solution to the first-order recurrence x_n = 3·x_{n-1} with initial condition x₀ = 2?",
        options: [
          "x_n = 2 · 3ⁿ",
          "x_n = 3 · 2ⁿ",
          "x_n = 3ⁿ + 2",
          "x_n = 6ⁿ"
        ],
        correctIndex: 0,
        explanation: "x₁ = 2·3, x₂ = 2·3², and by induction x_n = x₀ · 3ⁿ = 2 · 3ⁿ."
      },
      {
        question: "The Karatsuba fast integer multiplication algorithm solves the recurrence T(n) = 3·T(n/2) + O(n). What is its asymptotic time complexity?",
        options: [
          "O(n^(log₂ 3)) ≈ O(n^1.585)",
          "O(n²)",
          "O(n · log n)",
          "O(n³)"
        ],
        correctIndex: 0,
        explanation: "By Master Theorem Case 1: a = 3, b = 2, so log₂(3) ≈ 1.585. Since f(n) = O(n¹) is smaller than n^1.585, T(n) = O(n^(log₂ 3)) ≈ O(n^1.585)."
      }
    ],

    // =========================================================================
    // MODULE 12: Generating Functions & Applications (9 Questions)
    // =========================================================================
    12: [
      {
        question: "What is an Ordinary Generating Function (OGF) for a real sequence (a₀, a₁, a₂, ...)?",
        options: [
          "A formal power series G(x) = ∑_{n=0}^∞ a_n · xⁿ",
          "A differential equation of a_n",
          "The matrix representation of a recurrence",
          "The limit of a_n as n approaches infinity"
        ],
        correctIndex: 0,
        explanation: "An OGF encodes a discrete sequence as the coefficients of a formal power series: G(x) = a₀ + a₁ x + a₂ x² + ... = ∑ a_n xⁿ."
      },
      {
        question: "What is the closed-form rational generating function for the constant sequence (1, 1, 1, 1, ...) for |x| < 1?",
        options: [
          "1 / (1 - x)",
          "1 / (1 + x)",
          "1 / (1 - x²)",
          "x / (1 - x)"
        ],
        correctIndex: 0,
        explanation: "The geometric series 1 + x + x² + x³ + ... converges to 1 / (1 - x) when |x| < 1."
      },
      {
        question: "Which algebraic operation on two generating functions A(x) and B(x) yields the Cauchy convolution of their underlying sequences: c_n = ∑_{i=0}^n a_i · b_{n-i}?",
        options: [
          "Polynomial multiplication: A(x) · B(x)",
          "Polynomial addition: A(x) + B(x)",
          "Differentiation: dA / dx",
          "Polynomial division: A(x) / B(x)"
        ],
        correctIndex: 0,
        explanation: "Multiplying power series A(x)·B(x) convolves their coefficients: (∑ aᵢ xⁱ)(∑ bⱼ xʲ) = ∑_k (∑_{i=0}^k aᵢ b_{k-i}) xᵏ."
      },
      {
        question: "To find the number of ways to make change for amount S using unlimited coins of denominations 1, 2, and 5, which coefficient is extracted from the generating function?",
        options: [
          "Coefficient of xˢ in [1 / (1 - x)] · [1 / (1 - x²)] · [1 / (1 - x⁵)]",
          "Coefficient of xˢ in (1 + x + x² + x⁵)",
          "Constant term a₀",
          "Coefficient of x⁸ in (1 - x)⁻³"
        ],
        correctIndex: 0,
        explanation: "Each denomination c contributes 1/(1 - xᶜ) = 1 + xᶜ + x²ᶜ + ... The coefficient of xˢ in their product gives non-negative solutions to 1·a + 2·b + 5·c = S."
      },
      {
        question: "Which famous sequence of numbers has the generating function C(x) = (1 - √(1 - 4x)) / (2x)?",
        options: [
          "Catalan Numbers C_n = (1 / (n + 1)) · C(2n, n)",
          "Fibonacci Numbers",
          "Bell Numbers",
          "Stirling Numbers of the Second Kind"
        ],
        correctIndex: 0,
        explanation: "The Catalan generating function satisfies x C(x)² - C(x) + 1 = 0, which by the quadratic formula gives C(x) = (1 - √(1 - 4x)) / (2x)."
      },
      {
        question: "What is the coefficient of xⁿ in the binomial series expansion of (1 - x)⁻ᵏ for a positive integer k?",
        options: [
          "C(n + k - 1, n) = C(n + k - 1, k - 1)",
          "C(n, k)",
          "kⁿ",
          "nᵏ / k!"
        ],
        correctIndex: 0,
        explanation: "By the negative binomial theorem, (1 - x)⁻ᵏ = ∑_{n=0}^∞ C(n + k - 1, n) xⁿ, matching multiset selections of n items from k types."
      },
      {
        question: "What sequence does the generating function x · G(x) represent if G(x) = ∑_{n=0}^∞ a_n · xⁿ?",
        options: [
          "The right-shifted sequence: (0, a₀, a₁, a₂, ...)",
          "The left-shifted sequence: (a₁, a₂, a₃, ...)",
          "The sequence of derivatives: (a₁, 2a₂, 3a₃, ...)",
          "The reversed sequence"
        ],
        correctIndex: 0,
        explanation: "Multiplying G(x) by x increases the power of x on every term by 1: x(a₀ + a₁ x + ...) = 0 + a₀ x + a₁ x² + ..., shifting the sequence right."
      },
      {
        question: "What is the closed-form generating function for the geometric sequence a_n = 2ⁿ (1, 2, 4, 8, 16, ...) for |x| < 1/2?",
        options: [
          "1 / (1 - 2x)",
          "1 / (1 - x²)",
          "2 / (1 - x)",
          "x / (1 - 2x)"
        ],
        correctIndex: 0,
        explanation: "∑_{n=0}^∞ (2x)ⁿ = 1 / (1 - 2x) for |2x| < 1 (i.e., |x| < 1/2)."
      },
      {
        question: "What operation on the generating function G(x) = ∑ a_n xⁿ produces the generating function for the sequence (0, 1·a₁, 2·a₂, 3·a₃, ...)?",
        options: [
          "x · (d/dx G(x))",
          "d/dx G(x)",
          "∫ G(x) dx",
          "G(x) / x"
        ],
        correctIndex: 0,
        explanation: "Differentiating G(x) gives ∑ n a_n xⁿ⁻¹. Multiplying by x restores the powers: x ∑ n a_n xⁿ⁻¹ = ∑ n a_n xⁿ."
      }
    ]
  };

  const STORAGE_KEY_ATTEMPT = 'mca_quiz_current_attempt';
  const STORAGE_KEY_SEEN = 'mca_quiz_seen_history';

  // State
  let currentAttempt = 1;
  let activeQuestions = [];
  let userAnswers = {};

  function initQuiz() {
    // Increment attempt counter on each fresh visit / refresh so questions rotate continuously
    let savedAttempt = parseInt(localStorage.getItem(STORAGE_KEY_ATTEMPT), 10);
    if (isNaN(savedAttempt) || savedAttempt < 1) {
      savedAttempt = 1;
    } else {
      savedAttempt += 1;
    }
    currentAttempt = savedAttempt;
    try {
      localStorage.setItem(STORAGE_KEY_ATTEMPT, currentAttempt);
    } catch (e) {}

    loadNewQuestionSet();
    renderQuiz();

    // Retake button on score summary card
    const retakeBtn = document.getElementById('quiz-retake-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        currentAttempt++;
        try {
          localStorage.setItem(STORAGE_KEY_ATTEMPT, currentAttempt);
        } catch (e) {}
        loadNewQuestionSet();
        renderQuiz();
        if (window.showToast) {
          window.showToast(`Loaded Fresh 12 Questions for Attempt #${currentAttempt}!`);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /**
   * Loads a fresh set of 12 questions (one for each topic 1 to 12).
   * Intelligently selects unseen questions from the 108-question bank,
   * avoiding repeats across page refreshes and retakes!
   */
  function loadNewQuestionSet() {
    activeQuestions = [];
    userAnswers = {};

    let seenHistory = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SEEN);
      if (saved) seenHistory = JSON.parse(saved);
    } catch (e) {
      seenHistory = {};
    }

    for (let moduleNum = 1; moduleNum <= 12; moduleNum++) {
      const pool = questionPool[moduleNum];
      if (!pool || pool.length === 0) continue;

      if (!seenHistory[moduleNum] || !Array.isArray(seenHistory[moduleNum])) {
        seenHistory[moduleNum] = [];
      }

      // Filter pool to find indexes that haven't been seen in this cycle
      let availableIndexes = pool
        .map((_, idx) => idx)
        .filter(idx => !seenHistory[moduleNum].includes(idx));

      // If all questions in this module have been exhausted, reset cycle for this module
      if (availableIndexes.length === 0) {
        seenHistory[moduleNum] = [];
        availableIndexes = pool.map((_, idx) => idx);
      }

      // Pick random question from available pool
      const randomPos = Math.floor(Math.random() * availableIndexes.length);
      const chosenIndex = availableIndexes[randomPos];

      // Mark as seen
      seenHistory[moduleNum].push(chosenIndex);

      const baseQ = pool[chosenIndex];

      // Shuffle options while tracking correct answer
      const originalCorrectOption = baseQ.options[baseQ.correctIndex];
      const shuffledOptions = [...baseQ.options];

      // Fisher-Yates shuffle
      for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
      }

      const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

      activeQuestions.push({
        id: moduleNum,
        moduleNum: moduleNum,
        moduleTitle: `Module ${moduleNum}`,
        question: baseQ.question,
        options: shuffledOptions,
        correctIndex: newCorrectIndex,
        explanation: baseQ.explanation
      });
    }

    try {
      localStorage.setItem(STORAGE_KEY_SEEN, JSON.stringify(seenHistory));
    } catch (e) {}
  }

  function renderQuiz() {
    const container = document.getElementById('quiz-questions-container');
    const summaryCard = document.getElementById('quiz-summary-card');
    if (!container) return;

    if (summaryCard) summaryCard.style.display = 'none';

    // Top Header info card (without the manual switch button as requested)
    let html = `
      <div class="card" style="margin-bottom:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-left:4px solid var(--accent-emerald);">
        <div>
          <span class="unit-tag" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald);">Attempt #${currentAttempt}</span>
          <span style="font-weight:700; color:var(--text-primary); margin-left:0.5rem;">Randomized MCA Examination</span>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">12 Fresh questions randomly selected from a pool of 100+ questions covering all 12 modules.</div>
        </div>
      </div>
    `;

    const letters = ['A', 'B', 'C', 'D'];

    activeQuestions.forEach((q, index) => {
      const selected = userAnswers[q.id];
      const isAnswered = selected !== undefined;

      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        let btnClass = 'quiz-option-btn';
        if (isAnswered) {
          if (optIdx === q.correctIndex) {
            btnClass += ' correct';
          } else if (optIdx === selected) {
            btnClass += ' wrong';
          }
        }

        optionsHtml += `
          <button class="${btnClass}" data-qid="${q.id}" data-opt="${optIdx}" ${isAnswered ? 'disabled' : ''}>
            <span class="quiz-option-prefix">${letters[optIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      });

      html += `
        <div class="quiz-card" id="quiz-card-${q.id}" style="margin-bottom:1rem;">
          <div class="quiz-question-number">${q.moduleTitle} • Question ${index + 1} of ${activeQuestions.length}</div>
          <div class="quiz-question-text">${q.question}</div>
          <div class="quiz-options-grid">
            ${optionsHtml}
          </div>
          <div class="quiz-explanation-box ${isAnswered ? 'visible' : ''}">
            <strong>Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach click handlers to options
    container.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = parseInt(btn.getAttribute('data-qid'), 10);
        const opt = parseInt(btn.getAttribute('data-opt'), 10);
        userAnswers[qid] = opt;
        renderQuiz();
        checkCompletion();
      });
    });
  }

  function checkCompletion() {
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount === activeQuestions.length) {
      let correctCount = 0;
      activeQuestions.forEach(q => {
        if (userAnswers[q.id] === q.correctIndex) correctCount++;
      });

      const percentage = ((correctCount / activeQuestions.length) * 100).toFixed(1);
      const summaryCard = document.getElementById('quiz-summary-card');
      const scoreElem = document.getElementById('quiz-score-val');
      const msgElem = document.getElementById('quiz-score-msg');

      if (summaryCard) summaryCard.style.display = 'block';
      if (scoreElem) scoreElem.textContent = `${correctCount} / ${activeQuestions.length} (${percentage}%)`;

      if (msgElem) {
        if (correctCount >= 10) {
          msgElem.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">Outstanding Performance! You scored ${percentage}% on Attempt #${currentAttempt}. Retake below to try 12 fresh questions!</span>`;
        } else if (correctCount >= 7) {
          msgElem.innerHTML = `<span style="color:var(--accent-amber); font-weight:700;">Good Attempt! (${percentage}%). Retake below with fresh questions to further test your skills.</span>`;
        } else {
          msgElem.innerHTML = `<span style="color:var(--accent-rose); font-weight:700;">Revision Recommended (${percentage}%). Review the module calculators and retake below with fresh questions.</span>`;
        }
      }

      // Scroll smoothly to summary card
      summaryCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.initQuiz = initQuiz;
  window.loadNewQuestionSet = loadNewQuestionSet;
})(window);
