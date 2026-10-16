/**
 * Module 5: Binomial Theorem and Pascal's Triangle
 */
(function (window) {
  'use strict';

  function initModule5() {
    const aInput = document.getElementById('m5-a');
    const bInput = document.getElementById('m5-b');
    const nInput = document.getElementById('m5-n');
    const calcBtn = document.getElementById('m5-calc-btn');

    if (calcBtn) calcBtn.addEventListener('click', calculateBinomial);
    if (aInput) aInput.addEventListener('input', calculateBinomial);
    if (bInput) bInput.addEventListener('input', calculateBinomial);
    if (nInput) nInput.addEventListener('input', calculateBinomial);

    calculateBinomial();
  }

  function calculateBinomial() {
    const a = parseFloat(document.getElementById('m5-a')?.value || 1);
    const b = parseFloat(document.getElementById('m5-b')?.value || 1);
    const n = parseInt(document.getElementById('m5-n')?.value || 4, 10);

    const symbolicDisplay = document.getElementById('m5-symbolic-display');
    const termsTableBody = document.getElementById('m5-terms-tbody');
    const verifySumElem = document.getElementById('m5-verify-sum');
    const verifyPowerElem = document.getElementById('m5-verify-power');
    const verifyStatusElem = document.getElementById('m5-verify-status');
    const traceElem = document.getElementById('m5-trace-box');

    if (isNaN(n) || n < 0 || n > 15) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Power n must be an integer between 0 and 15.</div>`;
      return;
    }

    const expansion = MathUtils.binomialExpansion(a, b, n);

    // Build symbolic string
    let symbolicTerms = [];
    for (const term of expansion.terms) {
      const coeffStr = term.coeff === 1n && (term.powerA > 0 || term.powerB > 0) ? '' : term.coeff.toString();
      let partA = term.powerA === 0 ? '' : (term.powerA === 1 ? 'a' : `a^${term.powerA}`);
      let partB = term.powerB === 0 ? '' : (term.powerB === 1 ? 'b' : `b^${term.powerB}`);
      symbolicTerms.push(`${coeffStr}${partA}${partB}` || '1');
    }
    const fullSymbolic = `(a + b)^${n} = ` + symbolicTerms.join(' + ');

    if (symbolicDisplay) symbolicDisplay.innerHTML = `<span class="formula-notation">${fullSymbolic}</span>`;

    // Populate terms table
    if (termsTableBody) {
      let rowsHtml = '';
      expansion.terms.forEach(t => {
        const valA = Math.pow(a, t.powerA);
        const valB = Math.pow(b, t.powerB);
        rowsHtml += `
          <tr>
            <td>k = ${t.k}</td>
            <td><strong>C(${n}, ${t.k}) = ${t.coeff}</strong></td>
            <td>a^${t.powerA} = ${valA.toFixed(4).replace(/\.?0+$/, '')}</td>
            <td>b^${t.powerB} = ${valB.toFixed(4).replace(/\.?0+$/, '')}</td>
            <td><strong style="color:var(--accent-cyan);">${t.termValue.toFixed(4).replace(/\.?0+$/, '')}</strong></td>
          </tr>
        `;
      });
      termsTableBody.innerHTML = rowsHtml;
    }

    if (verifySumElem) verifySumElem.textContent = expansion.calculatedSum.toLocaleString(undefined, { maximumFractionDigits: 4 });
    if (verifyPowerElem) verifyPowerElem.textContent = expansion.directPower.toLocaleString(undefined, { maximumFractionDigits: 4 });

    if (verifyStatusElem) {
      if (expansion.matches) {
        verifyStatusElem.innerHTML = `<span style="color:var(--accent-emerald); font-weight:700;">✓ Verified: Direct Power (a+b)^n matches Sum of Binomial Terms exactly!</span>`;
      } else {
        verifyStatusElem.innerHTML = `<span style="color:var(--accent-rose); font-weight:700;">Mismatch detected due to floating point error.</span>`;
      }
    }

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Binomial Theorem General Form</div>
            <div><span class="step-code">(a + b)^n = ∑_{k=0}^n C(n, k) a^(n-k) b^k</span></div>
            <div>For n = ${n}, there are exactly <span class="step-code">n + 1 = ${n + 1}</span> distinct expansion terms.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Row ${n} Pascal Coefficients</div>
            <div>Coefficients correspond to row ${n} of Pascal's Triangle: <span class="step-code">[${expansion.terms.map(t => t.coeff.toString()).join(', ')}]</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-heading">Direct Numerical Evaluation Check</div>
            <div>Direct: <span class="step-code">(${a} + ${b})^${n} = (${a + b})^${n} = ${expansion.directPower.toFixed(4).replace(/\.?0+$/, '')}</span></div>
            <div>Sum of Terms: <span class="step-code">∑ T_k = ${expansion.calculatedSum.toFixed(4).replace(/\.?0+$/, '')}</span></div>
          </div>
        </div>
      `;
    }
  }

  window.initModule5 = initModule5;
  window.calculateBinomial = calculateBinomial;
})(window);
