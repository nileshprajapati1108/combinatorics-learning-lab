/**
 * Module 12: Generating Functions and Applications
 */
(function (window) {
  'use strict';

  function initModule12() {
    // Polynomial multiplication inputs
    const polyAInput = document.getElementById('m12-poly-a');
    const polyBInput = document.getElementById('m12-poly-b');
    const polyCalcBtn = document.getElementById('m12-poly-btn');

    // Coin change counting inputs
    const coinsInput = document.getElementById('m12-coins');
    const targetInput = document.getElementById('m12-target');
    const coinCalcBtn = document.getElementById('m12-coin-btn');

    if (polyCalcBtn) polyCalcBtn.addEventListener('click', calculatePolynomialProduct);
    if (polyAInput) polyAInput.addEventListener('input', calculatePolynomialProduct);
    if (polyBInput) polyBInput.addEventListener('input', calculatePolynomialProduct);

    if (coinCalcBtn) coinCalcBtn.addEventListener('click', calculateCoinChangeGeneratingFunction);
    if (coinsInput) coinsInput.addEventListener('input', calculateCoinChangeGeneratingFunction);
    if (targetInput) targetInput.addEventListener('input', calculateCoinChangeGeneratingFunction);

    calculatePolynomialProduct();
    calculateCoinChangeGeneratingFunction();
  }

  function parseCoefficients(str) {
    return str.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => parseInt(s, 10))
      .filter(n => !isNaN(n));
  }

  function formatPolynomial(coeffs) {
    if (!coeffs || coeffs.length === 0) return '0';
    const terms = [];
    for (let i = 0; i < coeffs.length; i++) {
      const c = BigInt(coeffs[i]);
      if (c === 0n) continue;
      let termStr = '';
      if (i === 0) {
        termStr = c.toString();
      } else if (i === 1) {
        termStr = (c === 1n ? '' : c.toString()) + 'x';
      } else {
        termStr = (c === 1n ? '' : c.toString()) + `x^${i}`;
      }
      terms.push(termStr);
    }
    return terms.length > 0 ? terms.join(' + ') : '0';
  }

  function calculatePolynomialProduct() {
    const rawA = document.getElementById('m12-poly-a')?.value || "1, 2, 1";
    const rawB = document.getElementById('m12-poly-b')?.value || "1, 1";

    const coeffsA = parseCoefficients(rawA);
    const coeffsB = parseCoefficients(rawB);

    const resProduct = document.getElementById('m12-poly-res');
    const traceBox = document.getElementById('m12-poly-trace');

    if (coeffsA.length === 0 || coeffsB.length === 0) {
      if (resProduct) resProduct.textContent = "0";
      return;
    }

    const productCoeffs = MathUtils.multiplyPolynomials(coeffsA, coeffsB);
    const productStr = formatPolynomial(productCoeffs);

    if (resProduct) resProduct.innerHTML = `<span class="formula-notation">${productStr}</span>`;

    if (traceBox) {
      traceBox.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Input Ordinary Generating Functions (OGFs)</div>
            <div>A(x) = <span class="step-code">${formatPolynomial(coeffsA)}</span> (degree ${coeffsA.length - 1})</div>
            <div>B(x) = <span class="step-code">${formatPolynomial(coeffsB)}</span> (degree ${coeffsB.length - 1})</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Cauchy Convolution of Sequences</div>
            <div>The k-th coefficient of C(x) = A(x)B(x) is <span class="step-code">c_k = ∑_{i=0}^k a_i · b_{k-i}</span>.</div>
            <div>Resulting sequence coefficients: <span class="step-code">[${productCoeffs.map(c => c.toString()).join(', ')}]</span></div>
          </div>
        </div>
      `;
    }
  }

  function calculateCoinChangeGeneratingFunction() {
    const rawCoins = document.getElementById('m12-coins')?.value || "1, 2, 5";
    const target = parseInt(document.getElementById('m12-target')?.value || 10, 10);

    const resWays = document.getElementById('m12-coin-res');
    const resVerify = document.getElementById('m12-coin-verify');
    const seriesFormulaElem = document.getElementById('m12-coin-formula');
    const traceElem = document.getElementById('m12-coin-trace');

    const coins = parseCoefficients(rawCoins).filter(c => c > 0);

    if (coins.length === 0 || isNaN(target) || target < 0 || target > 50) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Target must be between 0 and 50, and valid positive coins provided.</div>`;
      return;
    }

    // Generating function: product of (1 + x^c + x^(2c) + ... + x^(floor(target/c)*c))
    let currentPoly = [1n];

    const factorsLatex = [];
    for (const coin of coins) {
      // Build factor polynomial up to target degree
      const factorPoly = new Array(target + 1).fill(0n);
      for (let p = 0; p <= target; p += coin) {
        factorPoly[p] = 1n;
      }
      currentPoly = MathUtils.multiplyPolynomials(currentPoly, factorPoly);
      factorsLatex.push(`(1 + x^${coin} + x^${2 * coin} + ...)`);
    }

    const waysGF = currentPoly[target] || 0n;

    // Direct Dynamic Programming verification
    const dp = new Array(target + 1).fill(0n);
    dp[0] = 1n;
    for (const coin of coins) {
      for (let s = coin; s <= target; s++) {
        dp[s] += dp[s - coin];
      }
    }
    const waysDP = dp[target];

    if (resWays) resWays.textContent = MathUtils.formatNumber(waysGF);
    if (resVerify) {
      const match = waysGF === waysDP;
      resVerify.innerHTML = match
        ? `<span style="color:var(--accent-emerald); font-weight:700;">✓ Verified: Coefficient [x^${target}] (${waysGF}) matches Direct Dynamic Programming (${waysDP})</span>`
        : `<span style="color:var(--accent-rose); font-weight:700;">Mismatch detected</span>`;
    }

    if (seriesFormulaElem) {
      seriesFormulaElem.innerHTML = `G(x) = ${factorsLatex.join(' · ')}`;
    }

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Model Change-Making via Generating Series</div>
            <div>Each coin type <span class="step-code">c</span> contributes factor: <span class="step-code">∑_{j=0}^∞ x^(j·c) = 1 / (1 - x^c)</span>.</div>
            <div>Full series: <span class="step-code">${factorsLatex.join(' × ')}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Coefficient Extraction [x^${target}]</div>
            <div>The number of ways to partition sum <span class="step-code">S = ${target}</span> using coins <span class="step-code">[${coins.join(', ')}]</span> is exactly the coefficient of <span class="step-code">x^${target}</span> in the expanded product.</div>
            <div><span class="step-code">[x^${target}] G(x) = ${MathUtils.formatNumber(waysGF)}</span> distinct combinations.</div>
          </div>
        </div>
      `;
    }
  }

  window.initModule12 = initModule12;
  window.calculatePolynomialProduct = calculatePolynomialProduct;
  window.calculateCoinChangeGeneratingFunction = calculateCoinChangeGeneratingFunction;
})(window);
