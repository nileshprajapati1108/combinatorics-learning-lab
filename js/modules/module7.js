/**
 * Module 7: Inclusion–Exclusion Principle
 */
(function (window) {
  'use strict';

  function initModule7() {
    // Mode toggle (2 sets vs 3 sets)
    const modeSelect = document.getElementById('m7-mode-select');
    const panel2 = document.getElementById('m7-panel-2set');
    const panel3 = document.getElementById('m7-panel-3set');

    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        const is2 = modeSelect.value === '2';
        if (panel2) panel2.style.display = is2 ? 'block' : 'none';
        if (panel3) panel3.style.display = is2 ? 'none' : 'block';
        if (is2) calculate2Set();
        else calculate3Set();
      });
    }

    // 2-Set inputs
    const a2 = document.getElementById('m7-2-a');
    const b2 = document.getElementById('m7-2-b');
    const ab2 = document.getElementById('m7-2-ab');
    [a2, b2, ab2].forEach(inp => inp && inp.addEventListener('input', calculate2Set));

    // 3-Set inputs
    const inputs3 = ['m7-3-a', 'm7-3-b', 'm7-3-c', 'm7-3-ab', 'm7-3-bc', 'm7-3-ac', 'm7-3-abc'];
    inputs3.forEach(id => {
      const inp = document.getElementById(id);
      if (inp) inp.addEventListener('input', calculate3Set);
    });

    calculate3Set();
  }

  function calculate2Set() {
    const a = parseInt(document.getElementById('m7-2-a')?.value || 50, 10);
    const b = parseInt(document.getElementById('m7-2-b')?.value || 40, 10);
    const ab = parseInt(document.getElementById('m7-2-ab')?.value || 15, 10);

    const resElem = document.getElementById('m7-res-union');
    const traceElem = document.getElementById('m7-trace-box');
    const vennSvg = document.getElementById('m7-venn-svg');

    // Validation
    if (ab > Math.min(a, b)) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Intersection |A ∩ B| (${ab}) cannot exceed min(|A|, |B|) (${Math.min(a, b)}).</div>`;
      return;
    }

    const union = a + b - ab;
    const aOnly = a - ab;
    const bOnly = b - ab;

    if (resElem) resElem.textContent = union.toString();

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Two-Set Inclusion–Exclusion Formula</div>
            <div>Formula: <span class="step-code">|A ∪ B| = |A| + |B| - |A ∩ B|</span></div>
            <div>Step 1: Add individual sets: <span class="step-code">|A| + |B| = ${a} + ${b} = ${a + b}</span> (intersection counted twice)</div>
            <div>Step 2: Subtract intersection: <span class="step-code">${a + b} - ${ab} = ${union}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Disjoint Regions Breakdown</div>
            <div>Only A: <span class="step-code">${aOnly}</span> | Both A and B: <span class="step-code">${ab}</span> | Only B: <span class="step-code">${bOnly}</span></div>
          </div>
        </div>
      `;
    }

    // Render 2-set Venn SVG
    if (vennSvg) {
      vennSvg.innerHTML = `
        <circle cx="160" cy="160" r="100" class="venn-circle venn-circle-A" />
        <circle cx="280" cy="160" r="100" class="venn-circle venn-circle-B" />
        <text x="120" y="165" class="venn-text">A only: ${aOnly}</text>
        <text x="220" y="165" class="venn-text">A ∩ B: ${ab}</text>
        <text x="320" y="165" class="venn-text">B only: ${bOnly}</text>
        <text x="100" y="50" fill="#38bdf8" font-size="14" font-weight="700">Set A (${a})</text>
        <text x="300" y="50" fill="#a855f7" font-size="14" font-weight="700">Set B (${b})</text>
      `;
    }
  }

  function calculate3Set() {
    const a = parseInt(document.getElementById('m7-3-a')?.value || 60, 10);
    const b = parseInt(document.getElementById('m7-3-b')?.value || 50, 10);
    const c = parseInt(document.getElementById('m7-3-c')?.value || 45, 10);
    const ab = parseInt(document.getElementById('m7-3-ab')?.value || 20, 10);
    const bc = parseInt(document.getElementById('m7-3-bc')?.value || 15, 10);
    const ac = parseInt(document.getElementById('m7-3-ac')?.value || 18, 10);
    const abc = parseInt(document.getElementById('m7-3-abc')?.value || 8, 10);

    const resElem = document.getElementById('m7-res-union');
    const traceElem = document.getElementById('m7-trace-box');
    const vennSvg = document.getElementById('m7-venn-svg');

    // Validation
    const validationErrors = [];
    if (ab > Math.min(a, b)) validationErrors.push(`|A ∩ B| (${ab}) > min(|A|, |B|)`);
    if (bc > Math.min(b, c)) validationErrors.push(`|B ∩ C| (${bc}) > min(|B|, |C|)`);
    if (ac > Math.min(a, c)) validationErrors.push(`|A ∩ C| (${ac}) > min(|A|, |C|)`);
    if (abc > Math.min(ab, bc, ac)) validationErrors.push(`|A ∩ B ∩ C| (${abc}) cannot exceed pair intersections`);

    // Disjoint regions
    const abOnly = ab - abc;
    const bcOnly = bc - abc;
    const acOnly = ac - abc;
    const aOnly = a - abOnly - acOnly - abc;
    const bOnly = b - abOnly - bcOnly - abc;
    const cOnly = c - acOnly - bcOnly - abc;

    if (aOnly < 0 || bOnly < 0 || cOnly < 0 || abOnly < 0 || bcOnly < 0 || acOnly < 0) {
      validationErrors.push("Inconsistent parameters: resulting individual disjoint region is negative.");
    }

    if (validationErrors.length > 0) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">${validationErrors.join('<br>')}</div>`;
      return;
    }

    const singleSum = a + b + c;
    const pairSum = ab + bc + ac;
    const union = singleSum - pairSum + abc;

    if (resElem) resElem.textContent = union.toString();

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Three-Set Inclusion–Exclusion Formula</div>
            <div><span class="step-code">|A ∪ B ∪ C| = |A| + |B| + |C| - (|A ∩ B| + |B ∩ C| + |A ∩ C|) + |A ∩ B ∩ C|</span></div>
            <div>Stage 1 (+ Singles): <span class="step-code">${a} + ${b} + ${c} = ${singleSum}</span></div>
            <div>Stage 2 (- Pairs): <span class="step-code">- (${ab} + ${bc} + ${ac}) = - ${pairSum}</span></div>
            <div>Stage 3 (+ Triples): <span class="step-code">+ ${abc}</span></div>
            <div>Result: <span class="step-code">${singleSum} - ${pairSum} + ${abc} = ${union}</span> total unique elements.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Disjoint Regions Breakdown</div>
            <div>A only: <span class="step-code">${aOnly}</span> | B only: <span class="step-code">${bOnly}</span> | C only: <span class="step-code">${cOnly}</span></div>
            <div>AB only: <span class="step-code">${abOnly}</span> | BC only: <span class="step-code">${bcOnly}</span> | AC only: <span class="step-code">${acOnly}</span> | ABC: <span class="step-code">${abc}</span></div>
          </div>
        </div>
      `;
    }

    // Render 3-set Venn SVG
    if (vennSvg) {
      vennSvg.innerHTML = `
        <!-- Circles -->
        <circle cx="180" cy="130" r="90" class="venn-circle venn-circle-A" />
        <circle cx="280" cy="130" r="90" class="venn-circle venn-circle-B" />
        <circle cx="230" cy="210" r="90" class="venn-circle venn-circle-C" />

        <!-- Labels -->
        <text x="135" y="115" class="venn-text">${aOnly}</text>
        <text x="325" y="115" class="venn-text">${bOnly}</text>
        <text x="230" y="270" class="venn-text">${cOnly}</text>
        <text x="230" y="105" class="venn-text">${abOnly}</text>
        <text x="180" y="185" class="venn-text">${acOnly}</text>
        <text x="280" y="185" class="venn-text">${bcOnly}</text>
        <text x="230" y="155" class="venn-text" fill="#f59e0b" font-weight="800">${abc}</text>

        <text x="110" y="45" fill="#38bdf8" font-size="13" font-weight="700">Python (${a})</text>
        <text x="300" y="45" fill="#a855f7" font-size="13" font-weight="700">Java (${b})</text>
        <text x="280" y="310" fill="#10b981" font-size="13" font-weight="700">C++ (${c})</text>
      `;
    }
  }

  window.initModule7 = initModule7;
  window.calculate2Set = calculate2Set;
  window.calculate3Set = calculate3Set;
})(window);
