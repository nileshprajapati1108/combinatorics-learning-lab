/**
 * Combinatorics Learning Lab - Mathematical Core Engine
 * Provides mathematically accurate algorithms, exact BigInt calculations,
 * and boundary validation for all 12 modules.
 */

(function (window) {
  'use strict';

  const MathUtils = {
    /**
     * Exact Factorial using BigInt
     * @param {number|bigint} n 
     * @returns {bigint} n!
     */
    factorial(n) {
      const num = BigInt(n);
      if (num < 0n) throw new Error("Factorial is undefined for negative numbers.");
      if (num === 0n || num === 1n) return 1n;
      let result = 1n;
      for (let i = 2n; i <= num; i++) {
        result *= i;
      }
      return result;
    },

    /**
     * Permutations without repetition: nPr = n! / (n - r)!
     * @param {number|bigint} n 
     * @param {number|bigint} r 
     * @returns {bigint}
     */
    nPr(n, r) {
      const bn = BigInt(n);
      const br = BigInt(r);
      if (bn < 0n || br < 0n) throw new Error("n and r must be non-negative.");
      if (br > bn) return 0n;
      let result = 1n;
      for (let i = 0n; i < br; i++) {
        result *= (bn - i);
      }
      return result;
    },

    /**
     * Combinations: nCr = n! / (r! * (n - r)!)
     * @param {number|bigint} n 
     * @param {number|bigint} r 
     * @returns {bigint}
     */
    nCr(n, r) {
      const bn = BigInt(n);
      const br = BigInt(r);
      if (bn < 0n || br < 0n) throw new Error("n and r must be non-negative.");
      if (br > bn) return 0n;
      if (br === 0n || br === bn) return 1n;
      // Symmetry optimization
      const k = br > (bn - br) ? (bn - br) : br;
      let num = 1n;
      let den = 1n;
      for (let i = 1n; i <= k; i++) {
        num *= (bn - i + 1n);
        den *= i;
      }
      return num / den;
    },

    /**
     * Permutations with repetition allowed: n^r
     * @param {number|bigint} n 
     * @param {number|bigint} r 
     * @returns {bigint}
     */
    permutationsWithRepetition(n, r) {
      const bn = BigInt(n);
      const br = BigInt(r);
      if (bn < 0n || br < 0n) throw new Error("n and r must be non-negative.");
      if (bn === 0n && br === 0n) return 1n;
      if (bn === 0n) return 0n;
      return bn ** br;
    },

    /**
     * Permutations with repeated identical elements: n! / (n1! * n2! * ... * nk!)
     * @param {bigint|number} totalN 
     * @param {Array<number|bigint>} counts 
     * @returns {bigint}
     */
    multinomial(totalN, counts) {
      const bn = BigInt(totalN);
      let sum = 0n;
      let denominator = 1n;
      for (const c of counts) {
        const bc = BigInt(c);
        if (bc < 0n) throw new Error("Count elements cannot be negative.");
        sum += bc;
        denominator *= MathUtils.factorial(bc);
      }
      if (sum !== bn) {
        throw new Error(`Sum of partition counts (${sum}) must equal total n (${bn}).`);
      }
      return MathUtils.factorial(bn) / denominator;
    },

    /**
     * Derangements: D(n) = (n - 1) * [D(n - 1) + D(n - 2)]
     * D(0) = 1, D(1) = 0
     * @param {number|bigint} n 
     * @returns {bigint}
     */
    derangement(n) {
      const bn = BigInt(n);
      if (bn < 0n) throw new Error("n must be non-negative.");
      if (bn === 0n) return 1n;
      if (bn === 1n) return 0n;
      let dPrev2 = 1n; // D(0)
      let dPrev1 = 0n; // D(1)
      let current = 0n;
      for (let i = 2n; i <= bn; i++) {
        current = (i - 1n) * (dPrev1 + dPrev2);
        dPrev2 = dPrev1;
        dPrev1 = current;
      }
      return current;
    },

    /**
     * Probability of derangement: D(n) / n!
     * @param {number} n 
     * @returns {number}
     */
    derangementProbability(n) {
      if (n === 0) return 1.0;
      if (n === 1) return 0.0;
      const d = MathUtils.derangement(n);
      const f = MathUtils.factorial(n);
      // For precision, convert via large integer scaling
      const scale = 1000000000000n;
      const scaledProb = (d * scale) / f;
      return Number(scaledProb) / Number(scale);
    },

    /**
     * Pascal's Triangle rows generator up to row n (0-indexed)
     * @param {number} rows 
     * @returns {Array<Array<bigint>>}
     */
    generatePascalTriangle(rows) {
      const triangle = [];
      for (let i = 0; i <= rows; i++) {
        const row = [];
        for (let j = 0; j <= i; j++) {
          row.push(MathUtils.nCr(i, j));
        }
        triangle.push(row);
      }
      return triangle;
    },

    /**
     * Binomial Expansion: (a + b)^n = sum_{k=0}^n C(n,k) * a^(n-k) * b^k
     * @param {number} a 
     * @param {number} b 
     * @param {number} n 
     */
    binomialExpansion(a, b, n) {
      if (n < 0 || !Number.isInteger(n)) throw new Error("n must be a non-negative integer.");
      const terms = [];
      let calculatedSum = 0;

      for (let k = 0; k <= n; k++) {
        const coeff = MathUtils.nCr(n, k);
        const powerA = n - k;
        const powerB = k;
        const valA = Math.pow(a, powerA);
        const valB = Math.pow(b, powerB);
        const termValue = Number(coeff) * valA * valB;
        calculatedSum += termValue;

        terms.push({
          k,
          coeff,
          powerA,
          powerB,
          termValue,
          strA: powerA === 0 ? '' : (powerA === 1 ? 'a' : `a^${powerA}`),
          strB: powerB === 0 ? '' : (powerB === 1 ? 'b' : `b^${powerB}`)
        });
      }

      const directPower = Math.pow(a + b, n);
      return {
        terms,
        calculatedSum,
        directPower,
        matches: Math.abs(calculatedSum - directPower) < 1e-7
      };
    },

    /**
     * Generalized Pigeonhole Principle:
     * Minimum items in at least one box = ceil(N / k)
     * @param {number} N objects
     * @param {number} k boxes
     * @returns {number}
     */
    pigeonholeGeneralized(N, k) {
      if (k <= 0) throw new Error("Number of boxes k must be >= 1.");
      if (N < 0) throw new Error("Number of items N must be non-negative.");
      return Math.ceil(N / k);
    },

    /**
     * Multisets / Stars and Bars: C(n + r - 1, r)
     * Number of ways to choose r items from n distinct types with repetition allowed
     * @param {number|bigint} n types
     * @param {number|bigint} r items
     */
    multisetCombinations(n, r) {
      const bn = BigInt(n);
      const br = BigInt(r);
      if (bn <= 0n) throw new Error("n (number of types) must be at least 1.");
      if (br < 0n) throw new Error("r (number of items) must be non-negative.");
      if (br === 0n) return 1n;
      return MathUtils.nCr(bn + br - 1n, br);
    },

    /**
     * Integer Partitions Count: p(n) using dynamic programming
     * Number of ways to write n as a sum of positive integers regardless of order.
     * @param {number} n 
     * @returns {bigint}
     */
    partitionCount(n) {
      if (n < 0) throw new Error("n must be non-negative.");
      if (n === 0) return 1n;

      // DP array of size n+1
      const dp = new Array(n + 1).fill(0n);
      dp[0] = 1n;

      for (let i = 1; i <= n; i++) {
        for (let j = i; j <= n; j++) {
          dp[j] += dp[j - i];
        }
      }
      return dp[n];
    },

    /**
     * Generates actual partitions for positive integer n
     * @param {number} n 
     * @param {number} limit Maximum partitions to return to prevent browser freeze
     */
    generatePartitions(n, limit = 200) {
      if (n <= 0) return [];
      const results = [];
      let count = 0;

      function backtrack(rem, maxPart, current) {
        if (rem === 0) {
          results.push([...current]);
          count++;
          return;
        }
        if (count >= limit) return;

        const start = Math.min(rem, maxPart);
        for (let part = start; part >= 1; part--) {
          current.push(part);
          backtrack(rem - part, part, current);
          current.pop();
          if (count >= limit) break;
        }
      }

      backtrack(n, n, []);
      return results;
    },

    /**
     * Number of compositions of n: 2^(n-1) for n >= 1
     * @param {number} n 
     * @returns {bigint}
     */
    compositionCount(n) {
      if (n <= 0) return 0n;
      return 2n ** BigInt(n - 1);
    },

    /**
     * Generates actual compositions for positive integer n
     * @param {number} n 
     * @param {number} limit 
     */
    generateCompositions(n, limit = 200) {
      if (n <= 0) return [];
      const results = [];
      let count = 0;

      function backtrack(rem, current) {
        if (rem === 0) {
          results.push([...current]);
          count++;
          return;
        }
        if (count >= limit) return;

        for (let part = 1; part <= rem; part++) {
          current.push(part);
          backtrack(rem - part, current);
          current.pop();
          if (count >= limit) break;
        }
      }

      backtrack(n, []);
      return results;
    },

    /**
     * Polynomial multiplication (Convolution)
     * polyA and polyB are arrays where index is power of x: a[0] + a[1]x + ...
     * @param {Array<number|bigint>} polyA 
     * @param {Array<number|bigint>} polyB 
     * @returns {Array<bigint>}
     */
    multiplyPolynomials(polyA, polyB) {
      const lenA = polyA.length;
      const lenB = polyB.length;
      const result = new Array(lenA + lenB - 1).fill(0n);

      for (let i = 0; i < lenA; i++) {
        const coeffA = BigInt(polyA[i]);
        if (coeffA === 0n) continue;
        for (let j = 0; j < lenB; j++) {
          const coeffB = BigInt(polyB[j]);
          result[i + j] += coeffA * coeffB;
        }
      }
      return result;
    },

    /**
     * Polynomial power: (poly)^k
     * @param {Array<number|bigint>} poly 
     * @param {number} k 
     * @returns {Array<bigint>}
     */
    powerPolynomial(poly, k) {
      if (k === 0) return [1n];
      let res = [1n];
      let base = poly.map(v => BigInt(v));
      let exp = k;

      while (exp > 0) {
        if (exp % 2 === 1) {
          res = MathUtils.multiplyPolynomials(res, base);
        }
        if (exp > 1) {
          base = MathUtils.multiplyPolynomials(base, base);
        }
        exp = Math.floor(exp / 2);
      }
      return res;
    },

    /**
     * Format BigInt nicely with thousands separators
     * @param {bigint|number} val 
     * @returns {string}
     */
    formatNumber(val) {
      if (val === undefined || val === null) return '0';
      const str = val.toString();
      if (str.length > 24) {
        // Return formatted with ellipsis and exact length for huge numbers
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  window.MathUtils = MathUtils;
})(window);
