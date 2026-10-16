/**
 * Quiz Module: Interactive MCA Combinatorics Examination
 * Features a dynamic multi-set question bank covering all 12 modules.
 * After finishing an exam, retaking it loads a fresh, rotated question set
 * with shuffled options and attempt tracking!
 */
(function (window) {
  'use strict';

  // Dynamic Question Bank: Multiple distinct questions per module
  const questionPool = {
    1: [
      {
        question: "In computer security, if a password contains 8 characters chosen from an alphanumeric character set of size 62, what is the total number of possible passwords?",
        options: [
          "62 × 8 = 496",
          "62⁸ ≈ 2.18 × 10¹⁴",
          "C(62, 8) ≈ 3.78 × 10⁹",
          "P(62, 8) ≈ 1.34 × 10¹³"
        ],
        correctIndex: 1,
        explanation: "By the multiplication principle with repetition allowed, each of the 8 character positions can be independently chosen from any of the 62 available alphanumeric symbols, yielding 62⁸ total combinations."
      },
      {
        question: "In a network grid routing model, how many monotonic paths exist from node (0, 0) to node (m, n) using only East and North movements?",
        options: [
          "m × n",
          "C(m + n, m) = (m + n)! / (m! · n!)",
          "P(m + n, m)",
          "2^(m + n)"
        ],
        correctIndex: 1,
        explanation: "Every valid path requires exactly m East moves and n North moves (total m + n moves). Choosing m positions for East moves from m + n total steps yields C(m + n, m) paths."
      }
    ],
    2: [
      {
        question: "Which rule of counting is applied when selecting an option from mutually exclusive alternatives (e.g., choosing either a Linux server OR a Windows server)?",
        options: [
          "Product Rule (Multiplication)",
          "Sum Rule (Addition)",
          "Pigeonhole Principle",
          "Inclusion-Exclusion with non-empty intersection"
        ],
        correctIndex: 1,
        explanation: "The Sum Rule (Addition Principle) applies when events are mutually exclusive (disjoint), meaning choosing one alternative precludes choosing the other (|A ∪ B| = |A| + |B| when A ∩ B = ∅)."
      },
      {
        question: "A cloud instance can be configured with 4 CPU types, 3 RAM sizes, and 2 storage options. How many total distinct hardware configurations can be constructed?",
        options: [
          "4 + 3 + 2 = 9",
          "4 × 3 × 2 = 24",
          "C(9, 3) = 84",
          "4³ × 2 = 128"
        ],
        correctIndex: 1,
        explanation: "Because hardware procurement consists of consecutive sequential stages (CPU AND RAM AND Storage), the Multiplication Rule yields 4 × 3 × 2 = 24 unique builds."
      }
    ],
    3: [
      {
        question: "How many distinct anagrams can be formed using all the letters in the word 'SUCCESS'?",
        options: [
          "7! = 5,040",
          "7! / (3! × 2!) = 420",
          "7! / 3! = 840",
          "C(7, 3) = 35"
        ],
        correctIndex: 1,
        explanation: "The word SUCCESS has 7 letters with repeated identical characters: 'S' appears 3 times and 'C' appears 2 times. Using the multinomial permutation formula: 7! / (3! × 2! × 1! × 1!) = 5040 / 12 = 420."
      },
      {
        question: "How many distinct 4-digit security codes can be created from the digits {1, 2, 3, 4, 5, 6, 7} without repeating any digit?",
        options: [
          "P(7, 4) = 7! / (7 - 4)! = 840",
          "7⁴ = 2,401",
          "C(7, 4) = 35",
          "7! = 5,040"
        ],
        correctIndex: 0,
        explanation: "Because order matters and repetition is prohibited, this is a permutation without repetition: P(7, 4) = 7 × 6 × 5 × 4 = 840."
      }
    ],
    4: [
      {
        question: "Which of the following combinatorial identities is known as Pascal's Identity?",
        options: [
          "C(n, r) = C(n, n - r)",
          "C(n, r) = C(n - 1, r - 1) + C(n - 1, r)",
          "P(n, r) = r! × C(n, r)",
          "∑_{k=0}^n C(n, k) = 2ⁿ"
        ],
        correctIndex: 1,
        explanation: "Pascal's Identity states that C(n, r) = C(n - 1, r - 1) + C(n - 1, r), which forms the recurrence relationship used to construct Pascal's Triangle."
      },
      {
        question: "In a cluster of 8 server nodes, how many ways can 3 replica nodes be chosen to host a distributed microservice (order does not matter)?",
        options: [
          "P(8, 3) = 336",
          "C(8, 3) = 8! / (3! · 5!) = 56",
          "8³ = 512",
          "3⁸ = 6,561"
        ],
        correctIndex: 1,
        explanation: "Because the order in which replica servers are chosen does not affect the resulting server subset, this is an unordered combination: C(8, 3) = (8 × 7 × 6) / (3 × 2 × 1) = 56."
      }
    ],
    5: [
      {
        question: "In the binomial expansion of (x + y)⁶, what is the coefficient of the term x⁴y²?",
        options: [
          "C(6, 2) = 15",
          "C(6, 4) × 2 = 30",
          "6! / 2! = 360",
          "C(6, 3) = 20"
        ],
        correctIndex: 0,
        explanation: "According to the Binomial Theorem, the general term is C(n, k) x^(n-k) y^k. For x⁴y², k = 2 and n = 6, so the coefficient is C(6, 2) = 6! / (2! × 4!) = 15."
      },
      {
        question: "What is the sum of all binomial coefficients in row n of Pascal's Triangle: ∑_{k=0}^n C(n, k)?",
        options: [
          "n²",
          "2ⁿ",
          "n!",
          "2^(n - 1)"
        ],
        correctIndex: 1,
        explanation: "By substituting a = 1 and b = 1 into the Binomial Theorem (1 + 1)ⁿ = ∑ C(n, k) 1^(n-k) 1^k = 2ⁿ. This also proves that a set with n elements has 2ⁿ total subsets."
      }
    ],
    6: [
      {
        question: "If 85 records are hashed into a hash table with 10 buckets, what is the MINIMUM number of records that must collide in at least one bucket by the Generalized Pigeonhole Principle?",
        options: [
          "8",
          "9",
          "10",
          "85"
        ],
        correctIndex: 1,
        explanation: "By the Generalized Pigeonhole Principle, at least one bucket must contain at least ⌈N / k⌉ = ⌈85 / 10⌉ = ⌈8.5⌉ = 9 records."
      },
      {
        question: "What is the minimum number of students required in an MCA classroom to guarantee that at least two students share the exact same birth month?",
        options: [
          "12",
          "13",
          "24",
          "366"
        ],
        correctIndex: 1,
        explanation: "There are 12 months in a year (pigeonholes). By the basic Pigeonhole Principle, with N = 13 students (pigeons), at least one month must have at least 2 students."
      }
    ],
    7: [
      {
        question: "If 40 students know Python, 35 know Java, and 15 know both languages, how many students know at least one of these two languages?",
        options: [
          "75",
          "60",
          "50",
          "90"
        ],
        correctIndex: 1,
        explanation: "By the Principle of Inclusion–Exclusion for two sets: |P ∪ J| = |P| + |J| - |P ∩ J| = 40 + 35 - 15 = 60 students."
      },
      {
        question: "In the 3-set Inclusion–Exclusion formula for |A ∪ B ∪ C|, what is the sign of the triple intersection term |A ∩ B ∩ C|?",
        options: [
          "Always Negative (-)",
          "Always Positive (+)",
          "Zero (it cancels out)",
          "Multiplied by 3"
        ],
        correctIndex: 1,
        explanation: "In |A ∪ B ∪ C| = (|A|+|B|+|C|) - (|AB|+|BC|+|AC|) + |ABC|, the triple intersection was added 3 times in singletons and subtracted 3 times in pairs, so it must be added back (+) once."
      }
    ],
    8: [
      {
        question: "What is the number of derangements D(4) (permutations of 4 items with zero fixed points)?",
        options: [
          "4! = 24",
          "12",
          "9",
          "0"
        ],
        correctIndex: 2,
        explanation: "Using the recurrence D(n) = (n - 1)[D(n-1) + D(n-2)] with D(0)=1, D(1)=0: D(2)=1, D(3)=2, D(4)=3 × (2 + 1) = 9. As a fraction of 4!, 9/24 = 37.5%, closely approximating 1/e."
      },
      {
        question: "As the number of elements n grows large, what theoretical constant does the probability of a derangement D(n) / n! approach?",
        options: [
          "0",
          "1/2 = 0.5",
          "1/e ≈ 0.367879...",
          "1/π ≈ 0.318309..."
        ],
        correctIndex: 2,
        explanation: "From the series D(n)/n! = ∑_{k=0}^n (-1)^k / k!, the limit as n → ∞ is the Taylor expansion of e^(-1) = 1/e ≈ 0.36787944."
      }
    ],
    9: [
      {
        question: "How many ways can 5 identical tasks be assigned to 3 distinct server worker nodes (repetition allowed, multisets)?",
        options: [
          "3⁵ = 243",
          "C(3 + 5 - 1, 5) = C(7, 5) = 21",
          "5³ = 125",
          "P(7, 5) = 2,520"
        ],
        correctIndex: 1,
        explanation: "Distributing r identical items into n distinct bins uses Stars and Bars: C(n + r - 1, r) = C(3 + 5 - 1, 5) = C(7, 5) = 21 ways."
      },
      {
        question: "Which of the four fundamental counting models represents selecting r items from n types where order does NOT matter and repetition IS allowed?",
        options: [
          "Permutations P(n, r)",
          "Sequences n^r",
          "Combinations C(n, r)",
          "Multisets C(n + r - 1, r)"
        ],
        correctIndex: 3,
        explanation: "Multisets (solved via Stars and Bars C(n + r - 1, r)) model unordered collections with repetition allowed, such as choosing identical resource allocations."
      }
    ],
    10: [
      {
        question: "What is the primary difference between an Integer Partition and an Integer Composition of n?",
        options: [
          "Partitions are only for prime numbers; compositions are for composites.",
          "In a partition, the order of parts does not matter; in a composition, order matters.",
          "Partitions use negative numbers; compositions use positive integers.",
          "There is no difference; they are synonymous terms."
        ],
        correctIndex: 1,
        explanation: "For an integer partition, order is irrelevant (e.g., 3+1 and 1+3 are the same partition of 4). For an integer composition, order is significant (3+1 and 1+3 are distinct compositions; total compositions of n is 2^(n-1))."
      },
      {
        question: "For any positive integer n ≥ 1, how many total integer compositions exist?",
        options: [
          "n!",
          "2^(n - 1)",
          "C(n, 2)",
          "p(n)"
        ],
        correctIndex: 1,
        explanation: "An integer composition represents placing plus signs (+) or spaces in the n - 1 gaps between n unit dots. With 2 choices per gap, there are exactly 2^(n-1) compositions."
      }
    ],
    11: [
      {
        question: "The Tower of Hanoi recurrence relation is given by T(n) = 2T(n-1) + 1 with T(1) = 1. What is its exact closed-form solution?",
        options: [
          "T(n) = n²",
          "T(n) = 2ⁿ - 1",
          "T(n) = n log₂ n",
          "T(n) = 2ⁿ + 1"
        ],
        correctIndex: 1,
        explanation: "By repeated substitution: T(1)=1, T(2)=3, T(3)=7, T(n)=2ⁿ - 1. Thus solving an n-disk Tower of Hanoi puzzle requires exponential time O(2ⁿ)."
      },
      {
        question: "What is the asymptotic time complexity of the divide-and-conquer recurrence T(n) = 2T(n/2) + n (Merge Sort)?",
        options: [
          "O(n)",
          "Θ(n log₂ n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        correctIndex: 1,
        explanation: "Applying the Master Theorem (Case 2: a = 2, b = 2, f(n) = n, log_b(a) = 1), since f(n) = Θ(n^1), the solution is T(n) = Θ(n log n)."
      }
    ],
    12: [
      {
        question: "To find the number of ways to make change for a sum S using unlimited coins of denominations 1, 2, and 5, which coefficient is extracted from the generating function?",
        options: [
          "Coefficient of x^(1+2+5) = x⁸",
          "Coefficient of xˢ in (1/(1-x))(1/(1-x²))(1/(1-x⁵))",
          "Constant term a₀",
          "Coefficient of x^(S!)"
        ],
        correctIndex: 1,
        explanation: "Each denomination c contributes the geometric series 1 + x^c + x^(2c) + ... = 1 / (1 - x^c). The Cauchy product of these series yields a polynomial where the coefficient of xˢ represents the number of non-negative integer solutions to 1·a + 2·b + 5·c = S."
      },
      {
        question: "Which algebraic operation on two generating functions A(x) and B(x) yields the Cauchy convolution of their underlying sequences?",
        options: [
          "Polynomial addition A(x) + B(x)",
          "Polynomial multiplication A(x) · B(x)",
          "Differentiation dA/dx",
          "Polynomial division A(x) / B(x)"
        ],
        correctIndex: 1,
        explanation: "Multiplying polynomials A(x) · B(x) convolves their coefficients: c_k = ∑_{i=0}^k a_i · b_{k-i}, which models combining two independent combinatorial resources."
      }
    ]
  };

  // State
  let currentAttempt = 1;
  let activeQuestions = [];
  let userAnswers = {};

  function initQuiz() {
    loadNewQuestionSet();
    renderQuiz();

    const retakeBtn = document.getElementById('quiz-retake-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        currentAttempt++;
        loadNewQuestionSet();
        userAnswers = {};
        renderQuiz();
        if (window.showToast) {
          window.showToast(`Loaded Question Set for Attempt #${currentAttempt}!`);
        }
      });
    }
  }

  /**
   * Loads a fresh set of 12 questions (one for each topic 1 to 12).
   * Rotates questions across attempts and shuffles option orders.
   */
  function loadNewQuestionSet() {
    activeQuestions = [];
    userAnswers = {};

    for (let moduleNum = 1; moduleNum <= 12; moduleNum++) {
      const pool = questionPool[moduleNum];
      if (!pool || pool.length === 0) continue;

      // Select question based on current attempt rotation
      const qIndex = (currentAttempt - 1) % pool.length;
      const baseQ = pool[qIndex];

      // Shuffle options while keeping track of correct answer
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
  }

  function renderQuiz() {
    const container = document.getElementById('quiz-questions-container');
    const summaryCard = document.getElementById('quiz-summary-card');
    if (!container) return;

    if (summaryCard) summaryCard.style.display = 'none';

    const setLetter = String.fromCharCode(65 + ((currentAttempt - 1) % 2));
    let html = `
      <div class="card" style="margin-bottom:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; border-left:4px solid var(--accent-emerald);">
        <div>
          <span class="unit-tag" style="background:rgba(16,185,129,0.15); color:var(--accent-emerald);">Current Attempt #${currentAttempt}</span>
          <span style="font-weight:700; color:var(--text-primary); margin-left:0.5rem;">Question Set ${setLetter} (Rotated Pool)</span>
          <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.25rem;">12 Questions covering all 12 modules. Retaking generates a new question set!</div>
        </div>
        <button class="action-btn" id="btn-force-new-set" title="Click to manually load a different question set">
          <span>🔄</span> <span>Switch to Fresh Question Set</span>
        </button>
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

    // Attach switch question set button
    const forceBtn = document.getElementById('btn-force-new-set');
    if (forceBtn) {
      forceBtn.addEventListener('click', () => {
        currentAttempt++;
        loadNewQuestionSet();
        userAnswers = {};
        renderQuiz();
        if (window.showToast) {
          window.showToast(`Switched to Question Set for Attempt #${currentAttempt}!`);
        }
      });
    }
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
          msgElem.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">Outstanding Performance! You scored ${percentage}% on Attempt #${currentAttempt}. Click below to challenge yourself with a fresh set of questions!</span>`;
        } else if (correctCount >= 7) {
          msgElem.innerHTML = `<span style="color:var(--accent-amber); font-weight:700;">Good Attempt! (${percentage}%). Retake with new questions to strengthen your problem-solving speed.</span>`;
        } else {
          msgElem.innerHTML = `<span style="color:var(--accent-rose); font-weight:700;">Revision Recommended (${percentage}%). Review the step-by-step traces in the modules and retake with new questions.</span>`;
        }
      }

      // Scroll smoothly to summary card
      summaryCard.scrollIntoView({ behavior: 'smooth' });
    }
  }

  window.initQuiz = initQuiz;
  window.loadNewQuestionSet = loadNewQuestionSet;
})(window);
