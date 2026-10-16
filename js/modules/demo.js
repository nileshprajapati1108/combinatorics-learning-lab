/**
 * Faculty Demo Module: Predefined Exemplary Test Scenarios & Guided Presentation Controller
 */
(function (window) {
  'use strict';

  const demoPresets = {
    module1: {
      title: "Module 1: Password Space & Grid Paths",
      run() {
        if (window.navigateTo) window.navigateTo('module1');
        const charset = document.getElementById('m1-charset');
        const length = document.getElementById('m1-length');
        const lengthVal = document.getElementById('m1-length-val');
        const gridM = document.getElementById('m1-grid-m');
        const gridN = document.getElementById('m1-grid-n');

        if (charset) charset.value = "62";
        if (length) { length.value = "10"; if (lengthVal) lengthVal.textContent = "10"; }
        if (gridM) gridM.value = "4";
        if (gridN) gridN.value = "4";

        if (window.calculatePasswordSpace) window.calculatePasswordSpace();
        if (window.calculateGridPaths) window.calculateGridPaths();
      }
    },
    module2: {
      title: "Module 2: Computer Hardware Config Builder",
      run() {
        if (window.navigateTo) window.navigateTo('module2');
        const cpu = document.getElementById('m2-cfg-cpu');
        const ram = document.getElementById('m2-cfg-ram');
        const gpu = document.getElementById('m2-cfg-gpu');
        const storage = document.getElementById('m2-cfg-storage');

        if (cpu) cpu.value = "4";
        if (ram) ram.value = "4";
        if (gpu) gpu.value = "3";
        if (storage) storage.value = "4";

        if (window.calculateSystemConfig) window.calculateSystemConfig();
      }
    },
    module3: {
      title: "Module 3: MISSISSIPPI Anagram & P(8, 3)",
      run() {
        if (window.navigateTo) window.navigateTo('module3');
        const nInp = document.getElementById('m3-n');
        const rInp = document.getElementById('m3-r');
        const wordInp = document.getElementById('m3-word-input');

        if (nInp) nInp.value = "8";
        if (rInp) rInp.value = "3";
        if (wordInp) wordInp.value = "MISSISSIPPI";

        if (window.calculatePermutations) window.calculatePermutations();
        if (window.calculateWordPermutations) window.calculateWordPermutations();
      }
    },
    module4: {
      title: "Module 4: Combinations C(10, 4) & Pascal Identity",
      run() {
        if (window.navigateTo) window.navigateTo('module4');
        const nInp = document.getElementById('m4-n');
        const rInp = document.getElementById('m4-r');

        if (nInp) nInp.value = "10";
        if (rInp) rInp.value = "4";

        if (window.calculateCombinations) window.calculateCombinations();
      }
    },
    module5: {
      title: "Module 5: Binomial Expansion of (2 + 3)^5",
      run() {
        if (window.navigateTo) window.navigateTo('module5');
        const aInp = document.getElementById('m5-a');
        const bInp = document.getElementById('m5-b');
        const nInp = document.getElementById('m5-n');

        if (aInp) aInp.value = "2";
        if (bInp) bInp.value = "3";
        if (nInp) nInp.value = "5";

        if (window.calculateBinomial) window.calculateBinomial();
      }
    },
    module6: {
      title: "Module 6: Pigeonhole Principle (25 items, 6 boxes) & Hash Collisions",
      run() {
        if (window.navigateTo) window.navigateTo('module6');
        const nInp = document.getElementById('m6-n');
        const kInp = document.getElementById('m6-k');
        const hashBuckets = document.getElementById('m6-hash-buckets');

        if (nInp) nInp.value = "25";
        if (kInp) kInp.value = "6";
        if (hashBuckets) hashBuckets.value = "5";

        if (window.runPigeonholeSimulation) window.runPigeonholeSimulation();
        if (window.renderHashTable) window.renderHashTable();
      }
    },
    module7: {
      title: "Module 7: 3-Set Inclusion–Exclusion (MCA Languages)",
      run() {
        if (window.navigateTo) window.navigateTo('module7');
        const mode = document.getElementById('m7-mode-select');
        if (mode) {
          mode.value = "3";
          mode.dispatchEvent(new Event('change'));
        }
        const a = document.getElementById('m7-3-a');
        const b = document.getElementById('m7-3-b');
        const c = document.getElementById('m7-3-c');
        const ab = document.getElementById('m7-3-ab');
        const bc = document.getElementById('m7-3-bc');
        const ac = document.getElementById('m7-3-ac');
        const abc = document.getElementById('m7-3-abc');

        if (a) a.value = "70";
        if (b) b.value = "55";
        if (c) c.value = "45";
        if (ab) ab.value = "25";
        if (bc) bc.value = "18";
        if (ac) ac.value = "20";
        if (abc) abc.value = "10";

        if (window.calculate3Set) window.calculate3Set();
      }
    },
    module8: {
      title: "Module 8: Derangements D(5) and Envelope Simulation",
      run() {
        if (window.navigateTo) window.navigateTo('module8');
        const nInp = document.getElementById('m8-n');
        const simN = document.getElementById('m8-sim-n');
        const simTrials = document.getElementById('m8-sim-trials');

        if (nInp) nInp.value = "5";
        if (simN) simN.value = "4";
        if (simTrials) simTrials.value = "2000";

        if (window.calculateDerangements) window.calculateDerangements();
        if (window.runDerangementSimulation) window.runDerangementSimulation();
      }
    },
    module9: {
      title: "Module 9: Multisets C(4+8-1, 8) and Stars & Bars",
      run() {
        if (window.navigateTo) window.navigateTo('module9');
        const nInp = document.getElementById('m9-n');
        const rInp = document.getElementById('m9-r');

        if (nInp) nInp.value = "4";
        if (rInp) rInp.value = "8";

        if (window.calculateMultisets) window.calculateMultisets();
      }
    },
    module10: {
      title: "Module 10: Integer Partitions p(6) & Compositions c(6)",
      run() {
        if (window.navigateTo) window.navigateTo('module10');
        const nInp = document.getElementById('m10-n');
        if (nInp) nInp.value = "6";

        if (window.calculatePartitionsAndCompositions) window.calculatePartitionsAndCompositions();
      }
    },
    module11: {
      title: "Module 11: Tower of Hanoi Recurrence T(n)=2T(n-1)+1",
      run() {
        if (window.navigateTo) window.navigateTo('module11');
        const tpl = document.getElementById('m11-template');
        const nInp = document.getElementById('m11-n');

        if (tpl) tpl.value = "hanoi";
        if (nInp) nInp.value = "8";

        if (window.calculateRecurrence) window.calculateRecurrence();
      }
    },
    module12: {
      title: "Module 12: Generating Functions for Coin Change S=12",
      run() {
        if (window.navigateTo) window.navigateTo('module12');
        const coins = document.getElementById('m12-coins');
        const target = document.getElementById('m12-target');

        if (coins) coins.value = "1, 2, 5";
        if (target) target.value = "12";

        if (window.calculateCoinChangeGeneratingFunction) window.calculateCoinChangeGeneratingFunction();
      }
    }
  };

  let demoModuleKeys = Object.keys(demoPresets);
  let currentDemoStep = 0;

  function initDemoMode() {
    const launchDemoBtn = document.getElementById('btn-launch-demo');
    const demoNextBtn = document.getElementById('demo-next-step-btn');

    if (launchDemoBtn) {
      launchDemoBtn.addEventListener('click', () => {
        currentDemoStep = 0;
        runStep(currentDemoStep);
      });
    }

    if (demoNextBtn) {
      demoNextBtn.addEventListener('click', () => {
        currentDemoStep = (currentDemoStep + 1) % demoModuleKeys.length;
        runStep(currentDemoStep);
      });
    }

    // Attach individual preset buttons
    document.querySelectorAll('[data-demo-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetKey = btn.getAttribute('data-demo-target');
        if (demoPresets[targetKey]) {
          demoPresets[targetKey].run();
          if (window.showToast) window.showToast(`Loaded Preset: ${demoPresets[targetKey].title}`);
        }
      });
    });
  }

  function runStep(index) {
    const key = demoModuleKeys[index];
    const demo = demoPresets[key];
    if (demo) {
      demo.run();
      if (window.showToast) {
        window.showToast(`Faculty Demo (${index + 1}/12): ${demo.title}`);
      }
    }
  }

  window.initDemoMode = initDemoMode;
  window.demoPresets = demoPresets;
})(window);
