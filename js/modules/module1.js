/**
 * Module 1: Introduction to Combinatorics and Its Applications
 */
(function (window) {
  'use strict';

  function initModule1() {
    const charsetSelect = document.getElementById('m1-charset');
    const lengthInput = document.getElementById('m1-length');
    const lengthVal = document.getElementById('m1-length-val');
    const speedSelect = document.getElementById('m1-speed');
    const calcBtn = document.getElementById('m1-calc-btn');

    // Grid inputs
    const gridM = document.getElementById('m1-grid-m');
    const gridN = document.getElementById('m1-grid-n');
    const gridCalcBtn = document.getElementById('m1-grid-btn');

    if (lengthInput && lengthVal) {
      lengthInput.addEventListener('input', () => {
        lengthVal.textContent = lengthInput.value;
        calculatePasswordSpace();
      });
    }

    if (charsetSelect) charsetSelect.addEventListener('change', calculatePasswordSpace);
    if (speedSelect) speedSelect.addEventListener('change', calculatePasswordSpace);
    if (calcBtn) calcBtn.addEventListener('click', calculatePasswordSpace);

    if (gridCalcBtn) {
      gridCalcBtn.addEventListener('click', calculateGridPaths);
    }
    if (gridM) gridM.addEventListener('input', calculateGridPaths);
    if (gridN) gridN.addEventListener('input', calculateGridPaths);

    // Initial run
    calculatePasswordSpace();
    calculateGridPaths();
  }

  function calculatePasswordSpace() {
    const charsetSize = BigInt(document.getElementById('m1-charset')?.value || 62);
    const length = BigInt(document.getElementById('m1-length')?.value || 8);
    const speed = BigInt(document.getElementById('m1-speed')?.value || 1000000000); // 10^9

    const totalCombinations = charsetSize ** length;
    const entropyBits = (Number(length) * Math.log2(Number(charsetSize))).toFixed(1);

    // Time to crack in seconds
    const seconds = totalCombinations / speed;
    let timeStr = "";

    if (seconds < 60n) {
      timeStr = `${seconds} seconds`;
    } else if (seconds < 3600n) {
      timeStr = `${(Number(seconds) / 60).toFixed(1)} minutes`;
    } else if (seconds < 86400n) {
      timeStr = `${(Number(seconds) / 3600).toFixed(1)} hours`;
    } else if (seconds < 31536000n) {
      timeStr = `${(Number(seconds) / 86400).toFixed(1)} days`;
    } else {
      const years = Number(seconds) / 31536000;
      if (years > 1e12) {
        timeStr = `${years.toExponential(2)} years (Practically Uncrackable)`;
      } else {
        timeStr = `${years.toLocaleString(undefined, { maximumFractionDigits: 1 })} years`;
      }
    }

    const resCombinations = document.getElementById('m1-res-combinations');
    const resEntropy = document.getElementById('m1-res-entropy');
    const resTime = document.getElementById('m1-res-time');
    const traceBox = document.getElementById('m1-trace-box');

    if (resCombinations) resCombinations.textContent = MathUtils.formatNumber(totalCombinations);
    if (resEntropy) resEntropy.textContent = `${entropyBits} bits`;
    if (resTime) resTime.textContent = timeStr;

    if (traceBox) {
      traceBox.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Alphabet Size (|Σ|) & Length (L)</div>
            <div>Alphabet cardinality <span class="step-code">|Σ| = ${charsetSize}</span>, string length <span class="step-code">L = ${length}</span>.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Multiplication Rule for Sequences</div>
            <div>Each position has ${charsetSize} independent choices: <span class="step-code">Total Space = |Σ|^L = ${charsetSize}^${length} = ${MathUtils.formatNumber(totalCombinations)}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <div class="step-heading">Brute Force Time Calculation</div>
            <div>At attack throughput of <span class="step-code">${MathUtils.formatNumber(speed)} guesses/sec</span>: Time = Total Space / Speed = <span class="step-code">${timeStr}</span></div>
          </div>
        </div>
      `;
    }
  }

  function calculateGridPaths() {
    const m = parseInt(document.getElementById('m1-grid-m')?.value || 3, 10);
    const n = parseInt(document.getElementById('m1-grid-n')?.value || 3, 10);

    if (m < 0 || n < 0 || m > 15 || n > 15) return;

    // Total steps: m + n. Choose m right-steps: C(m+n, m)
    const totalPaths = MathUtils.nCr(m + n, m);

    const pathRes = document.getElementById('m1-grid-res');
    const pathTrace = document.getElementById('m1-grid-trace');
    const canvas = document.getElementById('m1-grid-canvas');

    if (pathRes) pathRes.textContent = MathUtils.formatNumber(totalPaths);

    if (pathTrace) {
      pathTrace.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Total Path Movements</div>
            <div>To reach (${m}, ${n}) from (0,0), you must make exactly <span class="step-code">${m} East moves (E)</span> and <span class="step-code">${n} North moves (N)</span>. Total moves = ${m + n}.</div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Combinatorial Selection Formula</div>
            <div>Choosing ${m} positions for East moves out of ${m + n} total moves: <span class="step-code">C(${m + n}, ${m}) = (${m + n})! / (${m}! × ${n}!) = ${MathUtils.formatNumber(totalPaths)}</span> distinct routing paths.</div>
          </div>
        </div>
      `;
    }

    if (canvas && canvas.getContext) {
      drawGrid(canvas, m, n);
    }
  }

  function drawGrid(canvas, m, n) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const pad = 25;
    const cellW = (width - 2 * pad) / m;
    const cellH = (height - 2 * pad) / n;

    // Draw grid lines
    ctx.strokeStyle = '#273549';
    ctx.lineWidth = 1.5;

    for (let i = 0; i <= m; i++) {
      ctx.beginPath();
      ctx.moveTo(pad + i * cellW, pad);
      ctx.lineTo(pad + i * cellW, height - pad);
      ctx.stroke();
    }

    for (let j = 0; j <= n; j++) {
      ctx.beginPath();
      ctx.moveTo(pad, pad + j * cellH);
      ctx.lineTo(width - pad, pad + j * cellH);
      ctx.stroke();
    }

    // Highlight one sample path (staircase)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pad, height - pad);
    // Draw sample path: right then up
    for (let i = 1; i <= m; i++) {
      ctx.lineTo(pad + i * cellW, height - pad);
    }
    for (let j = 1; j <= n; j++) {
      ctx.lineTo(pad + m * cellW, height - pad - j * cellH);
    }
    ctx.stroke();

    // Draw Start and End dots
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(pad, height - pad, 6, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(pad + m * cellW, pad, 6, 0, 2 * Math.PI);
    ctx.fill();
  }

  window.initModule1 = initModule1;
  window.calculatePasswordSpace = calculatePasswordSpace;
  window.calculateGridPaths = calculateGridPaths;
})(window);
