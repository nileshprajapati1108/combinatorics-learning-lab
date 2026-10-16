/**
 * Module 3: Permutations With and Without Repetition
 */
(function (window) {
  'use strict';

  function initModule3() {
    // nPr inputs
    const nInput = document.getElementById('m3-n');
    const rInput = document.getElementById('m3-r');
    const calcBtn = document.getElementById('m3-calc-btn');

    // Repeated elements (Anagram) inputs
    const wordInput = document.getElementById('m3-word-input');
    const wordCalcBtn = document.getElementById('m3-word-btn');

    if (calcBtn) calcBtn.addEventListener('click', calculatePermutations);
    if (nInput) nInput.addEventListener('input', calculatePermutations);
    if (rInput) rInput.addEventListener('input', calculatePermutations);

    if (wordCalcBtn) wordCalcBtn.addEventListener('click', calculateWordPermutations);
    if (wordInput) wordInput.addEventListener('input', calculateWordPermutations);

    calculatePermutations();
    calculateWordPermutations();
  }

  function calculatePermutations() {
    const n = parseInt(document.getElementById('m3-n')?.value || 5, 10);
    const r = parseInt(document.getElementById('m3-r')?.value || 3, 10);

    const resNpr = document.getElementById('m3-res-npr');
    const resArrangements = document.getElementById('m3-res-distinct');
    const resRep = document.getElementById('m3-res-rep');
    const traceBox = document.getElementById('m3-trace-box');

    if (n < 0 || r < 0) {
      if (traceBox) traceBox.innerHTML = `<div class="input-feedback visible">Inputs n and r must be non-negative integers.</div>`;
      return;
    }

    let nPrVal = 0n;
    let nFactVal = 0n;
    let nRepVal = 0n;

    try {
      nPrVal = MathUtils.nPr(n, r);
      nFactVal = MathUtils.factorial(n);
      nRepVal = MathUtils.permutationsWithRepetition(n, r);
    } catch (e) {
      if (traceBox) traceBox.innerHTML = `<div class="input-feedback visible">${e.message}</div>`;
      return;
    }

    if (resNpr) resNpr.textContent = MathUtils.formatNumber(nPrVal);
    if (resArrangements) resArrangements.textContent = MathUtils.formatNumber(nFactVal);
    if (resRep) resRep.textContent = MathUtils.formatNumber(nRepVal);

    if (traceBox) {
      traceBox.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Permutations Without Repetition: nPr</div>
            <div>Formula: <span class="step-code">P(n, r) = n! / (n - r)!</span></div>
            <div>Substitution: <span class="step-code">P(${n}, ${r}) = ${n}! / (${n} - ${r})! = ${n}! / ${Math.max(0, n - r)}! = ${MathUtils.formatNumber(nPrVal)}</span></div>
            <div>${r > n ? '<small class="input-feedback visible">Note: r > n, therefore selecting ' + r + ' items without replacement from ' + n + ' items is impossible (0 ways).</small>' : ''}</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">All Arrangements of Distinct Elements: n!</div>
            <div>Arranging all ${n} items in sequence: <span class="step-code">${n}! = ${MathUtils.formatNumber(nFactVal)}</span> ways. (Base case: 0! = 1).</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-heading">Permutations With Repetition Allowed: n^r</div>
            <div>Each of the ${r} slots has ${n} available candidates: <span class="step-code">${n}^${r} = ${MathUtils.formatNumber(nRepVal)}</span> total sequences (e.g., PIN codes, passwords).</div>
          </div>
        </div>
      `;
    }
  }

  function calculateWordPermutations() {
    const rawWord = document.getElementById('m3-word-input')?.value || "ALGORITHM";
    const cleanWord = rawWord.toUpperCase().replace(/[^A-Z0-9]/g, '');

    const resElem = document.getElementById('m3-word-res');
    const freqElem = document.getElementById('m3-word-freq');
    const traceElem = document.getElementById('m3-word-trace');

    if (!cleanWord || cleanWord.length === 0) {
      if (resElem) resElem.textContent = "0";
      return;
    }

    const totalN = cleanWord.length;
    const freqMap = {};
    for (const ch of cleanWord) {
      freqMap[ch] = (freqMap[ch] || 0) + 1;
    }

    const counts = Object.values(freqMap);
    let totalPermutations = 0n;

    try {
      totalPermutations = MathUtils.multinomial(totalN, counts);
    } catch (e) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">${e.message}</div>`;
      return;
    }

    if (resElem) resElem.textContent = MathUtils.formatNumber(totalPermutations);

    // Build frequency badges
    let freqBadgesHtml = '';
    let denomFormulaHtml = [];
    for (const [letter, cnt] of Object.entries(freqMap)) {
      freqBadgesHtml += `<span class="item-badge">${letter}: ${cnt}</span> `;
      denomFormulaHtml.push(`${cnt}!`);
    }

    if (freqElem) freqElem.innerHTML = freqBadgesHtml;

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Character Frequency Analysis</div>
            <div>Word: <strong style="color:var(--accent-blue);">${cleanWord}</strong> (Length n = ${totalN}). Letters: ${freqBadgesHtml}</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Multinomial Permutation Formula</div>
            <div>Formula: <span class="step-code">Permutations = n! / (n₁! × n₂! × ... × n_k!)</span></div>
            <div>Substitution: <span class="step-code">${totalN}! / (${denomFormulaHtml.join(' × ')}) = ${MathUtils.formatNumber(totalPermutations)}</span> distinct anagrams/arrangements.</div>
          </div>
        </div>
      `;
    }
  }

  window.initModule3 = initModule3;
  window.calculatePermutations = calculatePermutations;
  window.calculateWordPermutations = calculateWordPermutations;
})(window);
