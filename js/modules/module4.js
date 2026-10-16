/**
 * Module 4: Combinations and Related Identities
 */
(function (window) {
  'use strict';

  function initModule4() {
    const nInput = document.getElementById('m4-n');
    const rInput = document.getElementById('m4-r');
    const calcBtn = document.getElementById('m4-calc-btn');

    const pascalRowsInput = document.getElementById('m4-pascal-rows');
    const pascalGenBtn = document.getElementById('m4-pascal-btn');

    if (calcBtn) calcBtn.addEventListener('click', calculateCombinations);
    if (nInput) nInput.addEventListener('input', calculateCombinations);
    if (rInput) rInput.addEventListener('input', calculateCombinations);

    if (pascalGenBtn) pascalGenBtn.addEventListener('click', renderPascalTriangle);
    if (pascalRowsInput) pascalRowsInput.addEventListener('input', renderPascalTriangle);

    calculateCombinations();
    renderPascalTriangle();
  }

  function calculateCombinations() {
    const n = parseInt(document.getElementById('m4-n')?.value || 6, 10);
    const r = parseInt(document.getElementById('m4-r')?.value || 2, 10);

    const resNcr = document.getElementById('m4-res-ncr');
    const resNpr = document.getElementById('m4-res-npr');
    const resOrderFactor = document.getElementById('m4-res-factor');
    const traceBox = document.getElementById('m4-trace-box');
    const identityBox = document.getElementById('m4-identity-box');

    if (n < 0 || r < 0) {
      if (traceBox) traceBox.innerHTML = `<div class="input-feedback visible">Inputs n and r must be non-negative integers.</div>`;
      return;
    }

    const nCrVal = MathUtils.nCr(n, r);
    const nPrVal = MathUtils.nPr(n, r);
    const rFactVal = MathUtils.factorial(r);

    if (resNcr) resNcr.textContent = MathUtils.formatNumber(nCrVal);
    if (resNpr) resNpr.textContent = MathUtils.formatNumber(nPrVal);
    if (resOrderFactor) resOrderFactor.textContent = MathUtils.formatNumber(rFactVal);

    if (traceBox) {
      traceBox.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Combinations Formula (Unordered Selection)</div>
            <div>Formula: <span class="step-code">C(n, r) = n! / [r! × (n - r)!]</span></div>
            <div>Substitution: <span class="step-code">C(${n}, ${r}) = ${n}! / [${r}! × (${n} - ${r})!] = ${n}! / [${r}! × ${Math.max(0, n - r)}!] = ${MathUtils.formatNumber(nCrVal)}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Order Disregard: P(n, r) vs C(n, r)</div>
            <div>In permutations, order counts: <span class="step-code">P(${n}, ${r}) = ${MathUtils.formatNumber(nPrVal)}</span></div>
            <div>Because each chosen group of ${r} elements can be ordered in <span class="step-code">${r}! = ${MathUtils.formatNumber(rFactVal)}</span> ways:</div>
            <div><span class="step-code">C(${n}, ${r}) = P(${n}, ${r}) / ${r}! = ${MathUtils.formatNumber(nPrVal)} / ${MathUtils.formatNumber(rFactVal)} = ${MathUtils.formatNumber(nCrVal)}</span></div>
          </div>
        </div>
      `;
    }

    if (identityBox) {
      // Check Pascal Identity: C(n, r) = C(n-1, r-1) + C(n-1, r) (for n >= 1, 1 <= r <= n-1)
      let pascalCheck = "N/A for boundary conditions";
      if (n >= 1 && r >= 1 && r <= n) {
        const c1 = MathUtils.nCr(n - 1, r - 1);
        const c2 = MathUtils.nCr(n - 1, r);
        const sum = c1 + c2;
        pascalCheck = `C(${n-1}, ${r-1}) + C(${n-1}, ${r}) = ${MathUtils.formatNumber(c1)} + ${MathUtils.formatNumber(c2)} = ${MathUtils.formatNumber(sum)} (Matches C(${n}, ${r}) = ${MathUtils.formatNumber(nCrVal)} ✓)`;
      }

      // Check Symmetry Identity: C(n, r) = C(n, n - r)
      const cSymm = MathUtils.nCr(n, Math.max(0, n - r));
      const symmCheck = `C(${n}, ${n} - ${r}) = C(${n}, ${Math.max(0, n - r)}) = ${MathUtils.formatNumber(cSymm)} (Matches C(${n}, ${r}) = ${MathUtils.formatNumber(nCrVal)} ✓)`;

      identityBox.innerHTML = `
        <div class="step-item">
          <div class="step-number">A</div>
          <div class="step-content">
            <div class="step-heading">Pascal's Identity Verification: C(n, r) = C(n-1, r-1) + C(n-1, r)</div>
            <div style="margin-top:4px;"><span class="step-code">${pascalCheck}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">B</div>
          <div class="step-content">
            <div class="step-heading">Symmetry Identity Verification: C(n, r) = C(n, n - r)</div>
            <div style="margin-top:4px;"><span class="step-code">${symmCheck}</span></div>
          </div>
        </div>
      `;
    }
  }

  function renderPascalTriangle() {
    const rows = parseInt(document.getElementById('m4-pascal-rows')?.value || 7, 10);
    const container = document.getElementById('m4-pascal-container');
    if (!container) return;

    const safeRows = Math.min(12, Math.max(0, rows));
    const triangle = MathUtils.generatePascalTriangle(safeRows);

    let html = '';
    for (let i = 0; i < triangle.length; i++) {
      html += `<div class="pascal-row" data-row="${i}">`;
      for (let j = 0; j < triangle[i].length; j++) {
        const val = triangle[i][j];
        html += `<div class="pascal-cell" data-row="${i}" data-col="${j}" title="C(${i}, ${j}) = ${val}">${MathUtils.formatNumber(val)}</div>`;
      }
      html += `</div>`;
    }

    container.innerHTML = html;

    // Add click event for cell highlight
    container.querySelectorAll('.pascal-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        container.querySelectorAll('.pascal-cell').forEach(c => c.classList.remove('highlight'));
        const row = parseInt(cell.getAttribute('data-row'), 10);
        const col = parseInt(cell.getAttribute('data-col'), 10);
        cell.classList.add('highlight');

        // Highlight parents
        if (row > 0) {
          if (col > 0) {
            const p1 = container.querySelector(`.pascal-cell[data-row="${row - 1}"][data-col="${col - 1}"]`);
            if (p1) p1.classList.add('highlight');
          }
          if (col < row) {
            const p2 = container.querySelector(`.pascal-cell[data-row="${row - 1}"][data-col="${col}"]`);
            if (p2) p2.classList.add('highlight');
          }
        }
      });
    });
  }

  window.initModule4 = initModule4;
  window.calculateCombinations = calculateCombinations;
  window.renderPascalTriangle = renderPascalTriangle;
})(window);
