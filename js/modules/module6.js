/**
 * Module 6: Pigeonhole Principle - Basic and Generalized
 */
(function (window) {
  'use strict';

  let currentHashKeys = ["alice", "bob", "carol", "dave", "eric", "frank", "grace"];

  function initModule6() {
    const nInput = document.getElementById('m6-n');
    const kInput = document.getElementById('m6-k');
    const simBtn = document.getElementById('m6-sim-btn');
    const distTypeSelect = document.getElementById('m6-dist-type');

    // Hash table inputs
    const hashBucketsInput = document.getElementById('m6-hash-buckets');
    const hashFuncSelect = document.getElementById('m6-hash-func');
    const hashAddKeyInput = document.getElementById('m6-hash-newkey');
    const hashAddKeyBtn = document.getElementById('m6-hash-addbtn');
    const hashResetBtn = document.getElementById('m6-hash-resetbtn');

    if (simBtn) simBtn.addEventListener('click', runPigeonholeSimulation);
    if (nInput) nInput.addEventListener('input', runPigeonholeSimulation);
    if (kInput) kInput.addEventListener('input', runPigeonholeSimulation);
    if (distTypeSelect) distTypeSelect.addEventListener('change', runPigeonholeSimulation);

    if (hashBucketsInput) hashBucketsInput.addEventListener('input', renderHashTable);
    if (hashFuncSelect) hashFuncSelect.addEventListener('change', renderHashTable);
    if (hashAddKeyBtn) {
      hashAddKeyBtn.addEventListener('click', () => {
        const val = hashAddKeyInput?.value.trim();
        if (val) {
          currentHashKeys.push(val);
          if (hashAddKeyInput) hashAddKeyInput.value = '';
          renderHashTable();
        }
      });
    }
    if (hashResetBtn) {
      hashResetBtn.addEventListener('click', () => {
        currentHashKeys = ["alice", "bob", "carol", "dave", "eric", "frank", "grace"];
        renderHashTable();
      });
    }

    runPigeonholeSimulation();
    renderHashTable();
  }

  function runPigeonholeSimulation() {
    const N = parseInt(document.getElementById('m6-n')?.value || 10, 10);
    const k = parseInt(document.getElementById('m6-k')?.value || 4, 10);
    const distType = document.getElementById('m6-dist-type')?.value || 'random';

    const resCeil = document.getElementById('m6-res-ceil');
    const resBasic = document.getElementById('m6-res-basic');
    const traceBox = document.getElementById('m6-trace-box');
    const boxesContainer = document.getElementById('m6-boxes-container');

    if (k <= 0 || N < 0) {
      if (traceBox) traceBox.innerHTML = `<div class="input-feedback visible">Number of boxes k must be ≥ 1, and N ≥ 0.</div>`;
      return;
    }

    const minGuaranteed = MathUtils.pigeonholeGeneralized(N, k);
    const hasCollision = N > k;

    if (resCeil) resCeil.textContent = minGuaranteed.toString();
    if (resBasic) resBasic.textContent = hasCollision ? `Guaranteed (N = ${N} > k = ${k})` : `Not Guaranteed (N ≤ k)`;

    // Simulate distribution
    const boxes = new Array(k).fill(0);

    if (distType === 'uniform') {
      // Even distribution
      for (let i = 0; i < N; i++) {
        boxes[i % k]++;
      }
    } else if (distType === 'worst') {
      // Pack into first box as much as possible
      boxes[0] = N;
    } else {
      // Random
      for (let i = 0; i < N; i++) {
        const r = Math.floor(Math.random() * k);
        boxes[r]++;
      }
    }

    const maxInAnyBox = Math.max(...boxes);

    // Render Boxes
    if (boxesContainer) {
      let html = '';
      for (let i = 0; i < k; i++) {
        const count = boxes[i];
        const isWinner = count >= minGuaranteed;
        let ballsHtml = '';
        const displayCount = Math.min(count, 30);
        for (let b = 0; b < displayCount; b++) {
          ballsHtml += `<div class="pigeon-ball" title="Object #${b + 1}"></div>`;
        }
        if (count > 30) {
          ballsHtml += `<small style="font-size:0.65rem; color:var(--accent-amber);">+${count - 30}</small>`;
        }

        html += `
          <div class="box-bucket ${isWinner ? 'pigeonhole-winner' : ''}">
            <div class="box-balls-container">${ballsHtml}</div>
            <div class="box-bucket-label">Box ${i + 1} (${count})</div>
          </div>
        `;
      }
      boxesContainer.innerHTML = html;
    }

    if (traceBox) {
      traceBox.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Generalized Pigeonhole Principle Formula</div>
            <div>If <span class="step-code">N = ${N}</span> items are put into <span class="step-code">k = ${k}</span> containers, then at least one container must contain at least:</div>
            <div><span class="step-code">⌈N / k⌉ = ⌈${N} / ${k}⌉ = ⌈${(N / k).toFixed(2)}⌉ = ${minGuaranteed}</span> items.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Simulation Verification</div>
            <div>Observed maximum count in any box: <span class="step-code">${maxInAnyBox}</span>. (Guaranteed floor was <span class="step-code">≥ ${minGuaranteed}</span>). Condition satisfied: <span style="color:var(--accent-emerald); font-weight:700;">${maxInAnyBox >= minGuaranteed ? '✓ YES' : '✗ NO'}</span>.</div>
          </div>
        </div>
      `;
    }
  }

  function hashFunc(str, numBuckets, type) {
    if (type === 'djb2') {
      let hash = 5381;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
      }
      return Math.abs(hash) % numBuckets;
    } else {
      // Simple ASCII sum modulo
      let sum = 0;
      for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
      }
      return sum % numBuckets;
    }
  }

  function renderHashTable() {
    const bucketsCount = parseInt(document.getElementById('m6-hash-buckets')?.value || 5, 10);
    const funcType = document.getElementById('m6-hash-func')?.value || 'sum';
    const tbody = document.getElementById('m6-hash-tbody');
    const loadFactorElem = document.getElementById('m6-hash-alpha');
    const collisionsElem = document.getElementById('m6-hash-collisions');
    const explanationElem = document.getElementById('m6-hash-expl');

    if (bucketsCount <= 0) return;

    const buckets = Array.from({ length: bucketsCount }, () => []);

    for (const key of currentHashKeys) {
      const idx = hashFunc(key, bucketsCount, funcType);
      buckets[idx].push(key);
    }

    let collisionCount = 0;
    let rowsHtml = '';

    for (let i = 0; i < bucketsCount; i++) {
      const items = buckets[i];
      const hasColl = items.length > 1;
      if (hasColl) collisionCount += (items.length - 1);

      const pills = items.map(k => `<span class="hash-key-pill">${k}</span>`).join(' ') || '<span style="color:var(--text-muted);">(empty)</span>';

      rowsHtml += `
        <tr class="${hasColl ? 'collision-row' : ''}">
          <td><strong>Bucket [${i}]</strong></td>
          <td>${pills}</td>
          <td>${items.length}</td>
          <td>${hasColl ? '<span style="color:var(--accent-rose); font-weight:700;">Collision (≥ 2 keys)</span>' : '<span style="color:var(--text-muted);">None</span>'}</td>
        </tr>
      `;
    }

    if (tbody) tbody.innerHTML = rowsHtml;

    const alpha = (currentHashKeys.length / bucketsCount).toFixed(2);
    if (loadFactorElem) loadFactorElem.textContent = alpha;
    if (collisionsElem) collisionsElem.textContent = collisionCount.toString();

    if (explanationElem) {
      const pigeonholePredicts = currentHashKeys.length > bucketsCount;
      explanationElem.innerHTML = `
        <strong>Computer Science Analysis:</strong> With <span class="step-code">N = ${currentHashKeys.length}</span> keys and <span class="step-code">k = ${bucketsCount}</span> buckets, load factor is <span class="step-code">α = ${alpha}</span>.
        By the Pigeonhole Principle, since ${pigeonholePredicts ? 'N > k, at least one bucket MUST contain ≥ 2 keys (collision guaranteed!)' : 'N ≤ k, collisions are possible but not mathematically forced by the basic principle alone'}.
      `;
    }
  }

  window.initModule6 = initModule6;
  window.runPigeonholeSimulation = runPigeonholeSimulation;
  window.renderHashTable = renderHashTable;
})(window);
