/**
 * Module 9: Counting With Repetition and Multisets
 */
(function (window) {
  'use strict';

  function initModule9() {
    const nInput = document.getElementById('m9-n');
    const rInput = document.getElementById('m9-r');
    const calcBtn = document.getElementById('m9-calc-btn');

    if (calcBtn) calcBtn.addEventListener('click', calculateMultisets);
    if (nInput) nInput.addEventListener('input', calculateMultisets);
    if (rInput) rInput.addEventListener('input', calculateMultisets);

    calculateMultisets();
  }

  function calculateMultisets() {
    const n = parseInt(document.getElementById('m9-n')?.value || 3, 10);
    const r = parseInt(document.getElementById('m9-r')?.value || 4, 10);

    const resMultiset = document.getElementById('m9-res-multiset');
    const resSequence = document.getElementById('m9-res-sequence');
    const resNoRep = document.getElementById('m9-res-norep');
    const traceElem = document.getElementById('m9-trace-box');
    const starsBarsContainer = document.getElementById('m9-stars-bars');

    if (n <= 0 || r < 0) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Types n must be ≥ 1 and items r ≥ 0.</div>`;
      return;
    }

    const multisetWays = MathUtils.multisetCombinations(n, r);
    const sequenceWays = MathUtils.permutationsWithRepetition(n, r);
    const noRepWays = MathUtils.nCr(n, r);

    if (resMultiset) resMultiset.textContent = MathUtils.formatNumber(multisetWays);
    if (resSequence) resSequence.textContent = MathUtils.formatNumber(sequenceWays);
    if (resNoRep) resNoRep.textContent = MathUtils.formatNumber(noRepWays);

    // Stars and Bars diagram
    if (starsBarsContainer) {
      if (r <= 25 && n <= 10) {
        let starsBarsHtml = '';
        // Display r stars and n-1 bars
        // For demonstration, distribute items into buckets:
        // simple distribution: put 1 in each, then remainder in last
        const barsNeeded = n - 1;
        const totalSymbols = r + barsNeeded;

        // Visual representation:
        starsBarsHtml += `<div class="stars-bars-row">`;
        let starsPlaced = 0;
        let barsPlaced = 0;
        const perBucket = Math.floor(r / n);
        const rem = r % n;

        for (let b = 0; b < n; b++) {
          const countInThisBucket = perBucket + (b < rem ? 1 : 0);
          for (let s = 0; s < countInThisBucket; s++) {
            starsBarsHtml += `<div class="star-symbol" title="Item (Star)">★</div>`;
            starsPlaced++;
          }
          if (b < n - 1) {
            starsBarsHtml += `<div class="bar-symbol" title="Divider Bar"></div>`;
            barsPlaced++;
          }
        }
        starsBarsHtml += `</div>`;
        starsBarsHtml += `<div style="text-align:center; font-size:0.8rem; color:var(--text-secondary); margin-top:0.5rem;">
          Showing <span class="step-code">${r} Stars (Items)</span> and <span class="step-code">${barsNeeded} Bars (Dividers between ${n} types)</span>. Total positions = ${totalSymbols}.
        </div>`;
        starsBarsContainer.innerHTML = starsBarsHtml;
      } else {
        starsBarsContainer.innerHTML = `<small style="color:var(--text-muted);">(Stars and Bars graphic simplified for large n, r; total symbols = ${r + n - 1})</small>`;
      }
    }

    if (traceElem) {
      const bars = n - 1;
      const totalPositions = n + r - 1;
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Stars and Bars Theorem (Unordered Multisets)</div>
            <div>Distributing <span class="step-code">r = ${r}</span> identical items among <span class="step-code">n = ${n}</span> distinct bins requires <span class="step-code">n - 1 = ${bars}</span> divider bars.</div>
            <div>Formula: <span class="step-code">C(n + r - 1, r) = C(${totalPositions}, ${r}) = ${totalPositions}! / [${r}! × ${bars}!] = ${MathUtils.formatNumber(multisetWays)}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Ordered Sequences With Repetition (Tuples)</div>
            <div>Each of the ${r} positions can be filled by any of the ${n} types: <span class="step-code">n^r = ${n}^${r} = ${MathUtils.formatNumber(sequenceWays)}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-heading">Unordered Selections Without Repetition</div>
            <div>Standard combinations: <span class="step-code">C(n, r) = C(${n}, ${r}) = ${MathUtils.formatNumber(noRepWays)}</span> (${r > n ? '0 because r > n' : 'valid subset'})</div>
          </div>
        </div>
      `;
    }
  }

  window.initModule9 = initModule9;
  window.calculateMultisets = calculateMultisets;
})(window);
