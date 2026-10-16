/**
 * Module 11: Recurrence Relations and Their Solutions
 */
(function (window) {
  'use strict';

  function initModule11() {
    const templateSelect = document.getElementById('m11-template');
    const nInput = document.getElementById('m11-n');
    const calcBtn = document.getElementById('m11-calc-btn');

    if (calcBtn) calcBtn.addEventListener('click', calculateRecurrence);
    if (templateSelect) templateSelect.addEventListener('change', calculateRecurrence);
    if (nInput) nInput.addEventListener('input', calculateRecurrence);

    calculateRecurrence();
  }

  function calculateRecurrence() {
    const template = document.getElementById('m11-template')?.value || 'fibonacci';
    const n = parseInt(document.getElementById('m11-n')?.value || 10, 10);

    const resNthElem = document.getElementById('m11-res-nth');
    const resComplexityElem = document.getElementById('m11-res-complexity');
    const resIterStepsElem = document.getElementById('m11-res-iter-steps');
    const resRecCallsElem = document.getElementById('m11-res-rec-calls');
    const seqTableBody = document.getElementById('m11-seq-tbody');
    const traceElem = document.getElementById('m11-trace-box');

    if (isNaN(n) || n < 0 || n > 30) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Please enter an integer n between 0 and 30.</div>`;
      return;
    }

    let sequence = [];
    let recurrenceEq = '';
    let closedForm = '';
    let complexity = '';
    let iterSteps = n;
    let recCalls = 0;

    if (template === 'fibonacci') {
      recurrenceEq = 'F(n) = F(n-1) + F(n-2); F(0)=0, F(1)=1';
      closedForm = 'Binet\'s Formula: F(n) = (φⁿ - ψⁿ) / √5 where φ = (1+√5)/2';
      complexity = 'Iterative/DP: O(n) | Naive Recursive: O(2ⁿ)';
      sequence = [0n, 1n];
      for (let i = 2; i <= n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
      }
      iterSteps = n <= 1 ? 1 : n - 1;
      // Naive recursive calls approx 2 * F(n+1) - 1
      recCalls = n <= 1 ? 1 : (n <= 25 ? countFibCalls(n) : 'Exponential (> 10⁷)');
    } else if (template === 'hanoi') {
      recurrenceEq = 'T(n) = 2T(n-1) + 1; T(1)=1';
      closedForm = 'Exact closed form: T(n) = 2ⁿ - 1';
      complexity = 'O(2ⁿ) Exponential (Optimal move count for Tower of Hanoi)';
      sequence = [0n];
      for (let i = 1; i <= n; i++) {
        sequence.push(2n * sequence[i - 1] + 1n);
      }
      iterSteps = n;
      recCalls = 2 ** n - 1;
    } else if (template === 'mergesort') {
      recurrenceEq = 'T(n) = 2T(n/2) + n; T(1)=0';
      closedForm = 'Master Theorem Case 2: T(n) = Θ(n log₂ n)';
      complexity = 'O(n log n) Divide and Conquer';
      sequence = [0];
      for (let i = 1; i <= n; i++) {
        // approx T(i)
        const val = i <= 1 ? 0 : Math.round(i * Math.log2(i));
        sequence.push(BigInt(val));
      }
      iterSteps = n;
      recCalls = 2 * n - 1;
    } else if (template === 'arithmetic') {
      const d = 3n;
      recurrenceEq = `a(n) = a(n-1) + ${d}; a(0)=2`;
      closedForm = `a(n) = a(0) + n·d = 2 + 3n`;
      complexity = 'O(1) closed-form / O(n) iterative';
      sequence = [2n];
      for (let i = 1; i <= n; i++) {
        sequence.push(sequence[i - 1] + d);
      }
      iterSteps = n;
      recCalls = n + 1;
    } else if (template === 'geometric') {
      const r = 2n;
      recurrenceEq = `g(n) = ${r}·g(n-1); g(0)=3`;
      closedForm = `g(n) = g(0)·rⁿ = 3·2ⁿ`;
      complexity = 'O(log n) via fast exponentiation';
      sequence = [3n];
      for (let i = 1; i <= n; i++) {
        sequence.push(sequence[i - 1] * r);
      }
      iterSteps = n;
      recCalls = n + 1;
    }

    const nthVal = sequence[n] !== undefined ? sequence[n] : sequence[sequence.length - 1];

    if (resNthElem) resNthElem.textContent = MathUtils.formatNumber(nthVal);
    if (resComplexityElem) resComplexityElem.textContent = complexity;
    if (resIterStepsElem) resIterStepsElem.textContent = `${iterSteps} operations`;
    if (resRecCallsElem) resRecCallsElem.textContent = `${recCalls}`;

    // Populate sequence table (first 15 values)
    if (seqTableBody) {
      let rowsHtml = '';
      const limit = Math.min(n, 12);
      for (let i = 0; i <= limit; i++) {
        rowsHtml += `
          <tr>
            <td><strong>n = ${i}</strong></td>
            <td><strong style="color:var(--accent-blue);">${MathUtils.formatNumber(sequence[i])}</strong></td>
          </tr>
        `;
      }
      seqTableBody.innerHTML = rowsHtml;
    }

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Recurrence Definition & Base Cases</div>
            <div><span class="step-code">${recurrenceEq}</span></div>
            <div>Closed-Form Solution: <span class="step-code">${closedForm}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Algorithmic Efficiency & Tree Call Explosion</div>
            <div>Dynamic Programming (Iterative Memoization) computes term ${n} in <span class="step-code">${iterSteps} iterations (O(n))</span>.</div>
            <div>Unmemoized Naive Recursion requires <span class="step-code">${recCalls} function activations</span>, demonstrating why understanding recurrence relations is essential for MCA algorithm design.</div>
          </div>
        </div>
      `;
    }
  }

  function countFibCalls(n) {
    if (n <= 1) return 1;
    let calls = 1;
    let prev2 = 1;
    let prev1 = 1;
    for (let i = 2; i <= n; i++) {
      const cur = 1 + prev1 + prev2;
      prev2 = prev1;
      prev1 = cur;
      calls = cur;
    }
    return calls;
  }

  window.initModule11 = initModule11;
  window.calculateRecurrence = calculateRecurrence;
})(window);
