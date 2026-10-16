/**
 * Module 8: Derangements and Applications
 */
(function (window) {
  'use strict';

  function initModule8() {
    const nInput = document.getElementById('m8-n');
    const calcBtn = document.getElementById('m8-calc-btn');

    // Simulation inputs
    const simN = document.getElementById('m8-sim-n');
    const simTrials = document.getElementById('m8-sim-trials');
    const simBtn = document.getElementById('m8-sim-btn');

    if (calcBtn) calcBtn.addEventListener('click', calculateDerangements);
    if (nInput) nInput.addEventListener('input', calculateDerangements);

    if (simBtn) simBtn.addEventListener('click', runDerangementSimulation);

    calculateDerangements();
  }

  function calculateDerangements() {
    const n = parseInt(document.getElementById('m8-n')?.value || 4, 10);

    const resDn = document.getElementById('m8-res-dn');
    const resFact = document.getElementById('m8-res-fact');
    const resProb = document.getElementById('m8-res-prob');
    const traceElem = document.getElementById('m8-trace-box');
    const tableBody = document.getElementById('m8-sequence-tbody');

    if (isNaN(n) || n < 0 || n > 25) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Please enter an integer n between 0 and 25.</div>`;
      return;
    }

    const dn = MathUtils.derangement(n);
    const fact = MathUtils.factorial(n);
    const prob = MathUtils.derangementProbability(n);

    if (resDn) resDn.textContent = MathUtils.formatNumber(dn);
    if (resFact) resFact.textContent = MathUtils.formatNumber(fact);
    if (resProb) resProb.textContent = `${(prob * 100).toFixed(4)}% (P ≈ ${prob.toFixed(6)})`;

    // Populate D(0) to D(n) table
    if (tableBody) {
      let rowsHtml = '';
      let prev2 = 1n;
      let prev1 = 0n;

      for (let i = 0; i <= Math.min(n, 12); i++) {
        let val = 0n;
        if (i === 0) val = 1n;
        else if (i === 1) val = 0n;
        else {
          val = BigInt(i - 1) * (prev1 + prev2);
          prev2 = prev1;
          prev1 = val;
        }
        const p = MathUtils.derangementProbability(i);
        rowsHtml += `
          <tr>
            <td><strong>n = ${i}</strong></td>
            <td>D(${i}) = ${MathUtils.formatNumber(val)}</td>
            <td>${MathUtils.formatNumber(MathUtils.factorial(i))}</td>
            <td>${(p * 100).toFixed(2)}%</td>
          </tr>
        `;
      }
      tableBody.innerHTML = rowsHtml;
    }

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Recurrence Relation & Base Conditions</div>
            <div>Base cases: <span class="step-code">D(0) = 1, D(1) = 0</span></div>
            <div>Recurrence: <span class="step-code">D(n) = (n - 1) × [D(n - 1) + D(n - 2)]</span></div>
            <div>For n = ${n}: <span class="step-code">D(${n}) = ${MathUtils.formatNumber(dn)}</span> permutations with NO fixed points.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Derangement Probability & Euler's Number Limit</div>
            <div><span class="step-code">P(n) = D(n) / n! = ${MathUtils.formatNumber(dn)} / ${MathUtils.formatNumber(fact)} ≈ ${prob.toFixed(6)}</span></div>
            <div>As n → ∞, <span class="step-code">lim_{n→∞} P(n) = 1/e ≈ 0.36787944117...</span> (approx. 36.79%).</div>
          </div>
        </div>
      `;
    }
  }

  function runDerangementSimulation() {
    const n = parseInt(document.getElementById('m8-sim-n')?.value || 4, 10);
    const trials = parseInt(document.getElementById('m8-sim-trials')?.value || 1000, 10);

    const resSimRate = document.getElementById('m8-sim-res-rate');
    const resSimCount = document.getElementById('m8-sim-res-count');
    const permGrid = document.getElementById('m8-perm-grid');

    if (n < 2 || n > 8 || trials < 10) return;

    let derangementCount = 0;
    const baseArray = Array.from({ length: n }, (_, i) => i);

    // Monte Carlo simulation
    for (let t = 0; t < trials; t++) {
      const arr = [...baseArray];
      // Fisher-Yates shuffle
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }

      // Check if derangement: no arr[i] === i
      let isDerange = true;
      for (let i = 0; i < n; i++) {
        if (arr[i] === i) {
          isDerange = false;
          break;
        }
      }
      if (isDerange) derangementCount++;
    }

    const empiricalRate = (derangementCount / trials) * 100;
    const theoreticalRate = MathUtils.derangementProbability(n) * 100;

    if (resSimCount) resSimCount.textContent = `${derangementCount} / ${trials}`;
    if (resSimRate) resSimRate.textContent = `${empiricalRate.toFixed(2)}% (Theory: ${theoreticalRate.toFixed(2)}%)`;

    // If n <= 4, render all permutations and mark derangements
    if (n <= 4 && permGrid) {
      const allPerms = generateAllPermutations(baseArray);
      let html = '';
      allPerms.forEach(p => {
        let isD = true;
        for (let i = 0; i < n; i++) {
          if (p[i] === i) { isD = false; break; }
        }
        const str = p.map(x => x + 1).join('');
        html += `<span class="item-badge" style="${isD ? 'border-color:var(--accent-emerald); color:var(--accent-emerald); font-weight:700;' : 'opacity:0.6;'}">${str} ${isD ? '✓' : ''}</span>`;
      });
      permGrid.innerHTML = html;
    } else if (permGrid) {
      permGrid.innerHTML = `<small style="color:var(--text-muted);">(Exhaustive permutation listing hidden for n > 4 to preserve UI performance; total permutations = ${MathUtils.factorial(n)})</small>`;
    }
  }

  function generateAllPermutations(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const subPerms = generateAllPermutations(remaining);
      for (const p of subPerms) {
        result.push([current, ...p]);
      }
    }
    return result;
  }

  window.initModule8 = initModule8;
  window.calculateDerangements = calculateDerangements;
  window.runDerangementSimulation = runDerangementSimulation;
})(window);
