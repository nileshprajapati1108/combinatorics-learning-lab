/**
 * Module 2: Basic Counting Principles - Addition and Multiplication Rules
 */
(function (window) {
  'use strict';

  function initModule2() {
    // Addition Rule inputs
    const addA = document.getElementById('m2-add-a');
    const addB = document.getElementById('m2-add-b');
    const addC = document.getElementById('m2-add-c');
    const addBtn = document.getElementById('m2-add-btn');

    // Multiplication Rule inputs
    const mulA = document.getElementById('m2-mul-a');
    const mulB = document.getElementById('m2-mul-b');
    const mulC = document.getElementById('m2-mul-c');
    const mulBtn = document.getElementById('m2-mul-btn');

    // System Config Builder inputs
    const configCpu = document.getElementById('m2-cfg-cpu');
    const configRam = document.getElementById('m2-cfg-ram');
    const configGpu = document.getElementById('m2-cfg-gpu');
    const configStorage = document.getElementById('m2-cfg-storage');

    if (addBtn) addBtn.addEventListener('click', calculateAdditionRule);
    if (addA) addA.addEventListener('input', calculateAdditionRule);
    if (addB) addB.addEventListener('input', calculateAdditionRule);
    if (addC) addC.addEventListener('input', calculateAdditionRule);

    if (mulBtn) mulBtn.addEventListener('click', calculateMultiplicationRule);
    if (mulA) mulA.addEventListener('input', calculateMultiplicationRule);
    if (mulB) mulB.addEventListener('input', calculateMultiplicationRule);
    if (mulC) mulC.addEventListener('input', calculateMultiplicationRule);

    const configInputs = [configCpu, configRam, configGpu, configStorage];
    configInputs.forEach(input => {
      if (input) input.addEventListener('input', calculateSystemConfig);
    });

    calculateAdditionRule();
    calculateMultiplicationRule();
    calculateSystemConfig();
  }

  function calculateAdditionRule() {
    const a = parseInt(document.getElementById('m2-add-a')?.value || 0, 10);
    const b = parseInt(document.getElementById('m2-add-b')?.value || 0, 10);
    const c = parseInt(document.getElementById('m2-add-c')?.value || 0, 10);

    const safeA = Math.max(0, a);
    const safeB = Math.max(0, b);
    const safeC = Math.max(0, c);

    const sum = safeA + safeB + safeC;
    const resElem = document.getElementById('m2-add-res');
    const traceElem = document.getElementById('m2-add-trace');

    if (resElem) resElem.textContent = MathUtils.formatNumber(sum);

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Check Mutual Exclusivity (Disjoint Sets)</div>
            <div>Alternatives are independent and mutually disjoint: <span class="step-code">A ∩ B = ∅, A ∩ C = ∅, B ∩ C = ∅</span>. You choose exactly ONE option from ANY set.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Apply Sum Rule Formula</div>
            <div><span class="step-code">|A ∪ B ∪ C| = |A| + |B| + |C| = ${safeA} + ${safeB} + ${safeC} = ${sum}</span> total mutually exclusive possibilities.</div>
          </div>
        </div>
      `;
    }
  }

  function calculateMultiplicationRule() {
    const a = parseInt(document.getElementById('m2-mul-a')?.value || 1, 10);
    const b = parseInt(document.getElementById('m2-mul-b')?.value || 1, 10);
    const c = parseInt(document.getElementById('m2-mul-c')?.value || 1, 10);

    const safeA = Math.max(0, a);
    const safeB = Math.max(0, b);
    const safeC = Math.max(0, c);

    const product = BigInt(safeA) * BigInt(safeB) * BigInt(safeC);
    const resElem = document.getElementById('m2-mul-res');
    const traceElem = document.getElementById('m2-mul-trace');

    if (resElem) resElem.textContent = MathUtils.formatNumber(product);

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Sequential Multi-Stage Process</div>
            <div>Event consists of sequential stages: Stage 1 has <span class="step-code">${safeA}</span> choices, followed by Stage 2 with <span class="step-code">${safeB}</span> choices, followed by Stage 3 with <span class="step-code">${safeC}</span> choices.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Apply Product Rule Formula</div>
            <div><span class="step-code">|A × B × C| = |A| × |B| × |C| = ${safeA} × ${safeB} × ${safeC} = ${MathUtils.formatNumber(product)}</span> distinct sequential combinations.</div>
          </div>
        </div>
      `;
    }
  }

  function calculateSystemConfig() {
    const cpu = parseInt(document.getElementById('m2-cfg-cpu')?.value || 3, 10);
    const ram = parseInt(document.getElementById('m2-cfg-ram')?.value || 4, 10);
    const gpu = parseInt(document.getElementById('m2-cfg-gpu')?.value || 3, 10);
    const storage = parseInt(document.getElementById('m2-cfg-storage')?.value || 3, 10);

    const total = BigInt(cpu) * BigInt(ram) * BigInt(gpu) * BigInt(storage);
    const resElem = document.getElementById('m2-cfg-res');
    const traceElem = document.getElementById('m2-cfg-trace');

    if (resElem) resElem.textContent = MathUtils.formatNumber(total);

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Computer Hardware Configurator Stages</div>
            <div>CPU choices: <span class="step-code">${cpu}</span> (e.g. Intel, AMD, Apple M-series), RAM options: <span class="step-code">${ram}</span> (8GB, 16GB, 32GB, 64GB), GPU options: <span class="step-code">${gpu}</span>, Storage options: <span class="step-code">${storage}</span>.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Cartesian Product Evaluation</div>
            <div><span class="step-code">Total PC Configurations = ${cpu} × ${ram} × ${gpu} × ${storage} = ${MathUtils.formatNumber(total)}</span> unique custom builds.</div>
          </div>
        </div>
      `;
    }
  }

  window.initModule2 = initModule2;
  window.calculateAdditionRule = calculateAdditionRule;
  window.calculateMultiplicationRule = calculateMultiplicationRule;
  window.calculateSystemConfig = calculateSystemConfig;
})(window);
