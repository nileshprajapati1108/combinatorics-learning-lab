/**
 * Module 10: Integer Partitions and Compositions
 */
(function (window) {
  'use strict';

  function initModule10() {
    const nInput = document.getElementById('m10-n');
    const calcBtn = document.getElementById('m10-calc-btn');
    const maxItemsInput = document.getElementById('m10-max-display');

    if (calcBtn) calcBtn.addEventListener('click', calculatePartitionsAndCompositions);
    if (nInput) nInput.addEventListener('input', calculatePartitionsAndCompositions);
    if (maxItemsInput) maxItemsInput.addEventListener('input', calculatePartitionsAndCompositions);

    calculatePartitionsAndCompositions();
  }

  function calculatePartitionsAndCompositions() {
    const n = parseInt(document.getElementById('m10-n')?.value || 5, 10);
    const maxDisplay = parseInt(document.getElementById('m10-max-display')?.value || 50, 10);

    const resPartCount = document.getElementById('m10-res-part-count');
    const resCompCount = document.getElementById('m10-res-comp-count');
    const partitionsList = document.getElementById('m10-partitions-list');
    const compositionsList = document.getElementById('m10-compositions-list');
    const ferrersContainer = document.getElementById('m10-ferrers-box');
    const traceElem = document.getElementById('m10-trace-box');

    if (isNaN(n) || n < 1 || n > 40) {
      if (traceElem) traceElem.innerHTML = `<div class="input-feedback visible">Please enter an integer n between 1 and 40.</div>`;
      return;
    }

    const pCount = MathUtils.partitionCount(n);
    const cCount = MathUtils.compositionCount(n);

    if (resPartCount) resPartCount.textContent = MathUtils.formatNumber(pCount);
    if (resCompCount) resCompCount.textContent = MathUtils.formatNumber(cCount);

    // Generate for small/moderate n
    const safeGenLimit = Math.min(maxDisplay, 100);
    let partitions = [];
    let compositions = [];

    if (n <= 25) {
      partitions = MathUtils.generatePartitions(n, safeGenLimit);
      compositions = MathUtils.generateCompositions(n, safeGenLimit);
    }

    // Render Partitions badges
    if (partitionsList) {
      if (partitions.length > 0) {
        let html = '';
        partitions.forEach((p, idx) => {
          const str = p.join(' + ');
          html += `<span class="item-badge partition-item" data-idx="${idx}" style="cursor:pointer;" title="Click to view Ferrers diagram">${str}</span>`;
        });
        if (pCount > BigInt(partitions.length)) {
          html += `<span class="item-badge" style="opacity:0.6;">+ ${pCount - BigInt(partitions.length)} more...</span>`;
        }
        partitionsList.innerHTML = html;

        // Render first partition's Ferrers diagram by default
        renderFerrersDiagram(partitions[0]);

        // Click handler to inspect different partitions
        partitionsList.querySelectorAll('.partition-item').forEach(item => {
          item.addEventListener('click', () => {
            const idx = parseInt(item.getAttribute('data-idx'), 10);
            renderFerrersDiagram(partitions[idx]);
          });
        });
      } else {
        partitionsList.innerHTML = `<span style="color:var(--text-muted);">(Partitions list generated for n ≤ 25; count is ${MathUtils.formatNumber(pCount)})</span>`;
      }
    }

    // Render Compositions badges
    if (compositionsList) {
      if (compositions.length > 0) {
        let html = '';
        compositions.forEach(c => {
          const str = c.join(' + ');
          html += `<span class="item-badge">${str}</span>`;
        });
        if (cCount > BigInt(compositions.length)) {
          html += `<span class="item-badge" style="opacity:0.6;">+ ${cCount - BigInt(compositions.length)} more...</span>`;
        }
        compositionsList.innerHTML = html;
      } else {
        compositionsList.innerHTML = `<span style="color:var(--text-muted);">(Compositions list generated for n ≤ 25; count is ${MathUtils.formatNumber(cCount)})</span>`;
      }
    }

    if (traceElem) {
      traceElem.innerHTML = `
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <div class="step-heading">Partition vs Composition Core Distinction</div>
            <div><strong>Integer Partition p(n):</strong> Order does <em>NOT</em> matter. For example, 4+1 and 1+4 are the identical partition. Computed using Euler's DP algorithm: <span class="step-code">p(${n}) = ${MathUtils.formatNumber(pCount)}</span></div>
            <div style="margin-top:4px;"><strong>Integer Composition c(n):</strong> Order <em>DOES</em> matter. 4+1 and 1+4 are distinct compositions. Formula: <span class="step-code">c(n) = 2^(n-1) = 2^${n-1} = ${MathUtils.formatNumber(cCount)}</span></div>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-heading">Computer Science Workload Partitioning</div>
            <div>In parallel computing, allocating a workload of <span class="step-code">${n} tasks</span> across arbitrary threads without order is an integer partition problem, whereas ordered sequence execution of pipeline stages corresponds to a composition.</div>
          </div>
        </div>
      `;
    }
  }

  function renderFerrersDiagram(parts) {
    const container = document.getElementById('m10-ferrers-box');
    if (!container || !parts) return;

    let html = `
      <div style="margin-bottom:0.5rem; font-size:0.85rem; color:var(--text-secondary);">
        Ferrers / Young Diagram for: <strong style="color:var(--accent-blue);">${parts.join(' + ')}</strong>
      </div>
      <div class="ferrers-diagram">
    `;

    parts.forEach(count => {
      html += `<div class="ferrers-row">`;
      for (let i = 0; i < count; i++) {
        html += `<div class="ferrers-dot" title="dot"></div>`;
      }
      html += `</div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  window.initModule10 = initModule10;
  window.calculatePartitionsAndCompositions = calculatePartitionsAndCompositions;
  window.renderFerrersDiagram = renderFerrersDiagram;
})(window);
