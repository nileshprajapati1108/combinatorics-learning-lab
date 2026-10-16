/**
 * Glossary Module: Searchable Mathematical and Computing Glossary
 */
(function (window) {
  'use strict';

  const glossaryTerms = [
    {
      term: "Combinatorics",
      category: "Foundations",
      definition: "A branch of discrete mathematics concerning the study of finite or countable discrete structures, counting arrangements, selections, and algebraic configurations."
    },
    {
      term: "Addition Rule (Sum Principle)",
      category: "Counting Principles",
      definition: "If an event can occur in m ways and a second mutually exclusive event can occur in n ways, then one of these events can occur in m + n ways. Mathematically, |A ∪ B| = |A| + |B| when A ∩ B = ∅."
    },
    {
      term: "Multiplication Rule (Product Principle)",
      category: "Counting Principles",
      definition: "If an experiment occurs in consecutive stages, where stage 1 has m choices and stage 2 has n choices, there are m × n total compound outcomes: |A × B| = |A| × |B|."
    },
    {
      term: "Permutation",
      category: "Permutations & Combinations",
      definition: "An ordered arrangement of objects where the sequence matters. The number of permutations of n distinct objects taken r at a time is P(n, r) = n! / (n - r)!."
    },
    {
      term: "Combination",
      category: "Permutations & Combinations",
      definition: "An unordered selection of items from a collection where the order does not matter. The number of combinations of n objects taken r at a time is C(n, r) = n! / [r!(n - r)!]."
    },
    {
      term: "Multinomial Coefficient",
      category: "Permutations & Combinations",
      definition: "The number of ways to arrange n objects when there are n₁ identical objects of type 1, n₂ of type 2, etc.: n! / (n₁! × n₂! × ... × n_k!). Commonly used for anagram counting and multinomial expansion."
    },
    {
      term: "Pascal's Identity",
      category: "Identities",
      definition: "The combinatorial identity C(n, r) = C(n - 1, r - 1) + C(n - 1, r), representing the addition of two adjacent entries in row n - 1 of Pascal's Triangle to produce an entry in row n."
    },
    {
      term: "Binomial Theorem",
      category: "Identities",
      definition: "An algebraic formula for expanding powers of binomials: (a + b)ⁿ = ∑_{k=0}ⁿ C(n, k) aⁿ⁻ᵏ bᵏ. Essential in computing for error-correcting codes and probability distributions."
    },
    {
      term: "Pigeonhole Principle (Dirichlet Principle)",
      category: "Pigeonhole",
      definition: "If n items are put into m containers and n > m, then at least one container must contain more than one item. Used to prove hash table collisions and data compression limits."
    },
    {
      term: "Generalized Pigeonhole Principle",
      category: "Pigeonhole",
      definition: "If N objects are placed into k boxes, then at least one box must contain at least ⌈N / k⌉ objects. Critical for analyzing hash bucket load factors and network routing bottlenecks."
    },
    {
      term: "Inclusion–Exclusion Principle",
      category: "Set Theory",
      definition: "A counting technique that computes the cardinality of the union of overlapping sets by summing individual set sizes, subtracting pairwise intersections, adding triple intersections, and so on."
    },
    {
      term: "Derangement",
      category: "Permutations",
      definition: "A permutation of elements in which no element appears in its original position (a permutation with zero fixed points). Denoted by D(n) = (n - 1)[D(n - 1) + D(n - 2)]."
    },
    {
      term: "Subfactorial (!n)",
      category: "Permutations",
      definition: "Another name and notation for derangements D(n). The ratio !n / n! converges rapidly to 1/e ≈ 0.367879 as n increases."
    },
    {
      term: "Multiset",
      category: "Multisets",
      definition: "A generalization of a set where elements are allowed to appear more than once. The number of multisets of size r from n types is given by Stars and Bars as C(n + r - 1, r)."
    },
    {
      term: "Stars and Bars",
      category: "Multisets",
      definition: "A graphical method and theorem used to solve counting problems involving the distribution of r indistinguishable items into n distinguishable bins."
    },
    {
      term: "Integer Partition",
      category: "Partitions & Compositions",
      definition: "A way of writing a positive integer n as a sum of positive integers where the order of addends does not matter (e.g., 4 = 3 + 1 = 2 + 2 = 2 + 1 + 1 = 1 + 1 + 1 + 1)."
    },
    {
      term: "Integer Composition",
      category: "Partitions & Compositions",
      definition: "A way of writing a positive integer n as a sequence of positive integers where the order of summands matters. For any n ≥ 1, there are 2^(n-1) compositions."
    },
    {
      term: "Ferrers / Young Diagram",
      category: "Partitions & Compositions",
      definition: "A visual diagram of dots or squares arranged in rows representing an integer partition, where row lengths correspond to parts in non-increasing order."
    },
    {
      term: "Recurrence Relation",
      category: "Recurrences",
      definition: "An equation that expresses the n-th term of a sequence as a function of previous terms. Foundational for recursive algorithm analysis in computer science."
    },
    {
      term: "Divide-and-Conquer Recurrence",
      category: "Recurrences",
      definition: "A recurrence of the form T(n) = a T(n / b) + f(n) modeling algorithms like Merge Sort and Binary Search, solved analytically via the Master Theorem."
    },
    {
      term: "Ordinary Generating Function (OGF)",
      category: "Generating Functions",
      definition: "A formal power series G(x) = ∑ a_n xⁿ whose coefficients encode the terms of a sequence (a_n). Serves as an algebraic clothesline for discrete sequences."
    },
    {
      term: "Cauchy Product (Convolution)",
      category: "Generating Functions",
      definition: "The polynomial product of two generating series A(x) and B(x), where the k-th coefficient is c_k = ∑_{i=0}^k a_i b_{k-i}. Corresponds to combining two independent discrete resources."
    }
  ];

  function initGlossary() {
    renderGlossary(glossaryTerms);
    const searchInput = document.getElementById('glossary-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = glossaryTerms.filter(item =>
          item.term.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.definition.toLowerCase().includes(query)
        );
        renderGlossary(filtered);
      });
    }
  }

  function renderGlossary(terms) {
    const container = document.getElementById('glossary-container');
    if (!container) return;

    if (terms.length === 0) {
      container.innerHTML = `<div style="padding:2rem; text-align:center; color:var(--text-muted);">No matching glossary terms found.</div>`;
      return;
    }

    let html = '<div class="grid-2col">';
    terms.forEach(t => {
      html += `
        <div class="card" style="padding:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
            <strong style="color:var(--accent-blue); font-size:1.05rem;">${t.term}</strong>
            <span class="unit-tag" style="font-size:0.65rem;">${t.category}</span>
          </div>
          <div style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">${t.definition}</div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  }

  window.initGlossary = initGlossary;
})(window);
