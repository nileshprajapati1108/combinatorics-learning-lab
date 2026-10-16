# Combinatorics Learning Lab – Interactive Mathematics for Computing
**Master of Computer Applications (MCA) — Semester 1 | Academic Year 2026–27**  
**Course:** Foundation of Mathematics  
**Unit 1:** Introduction to Combinatorics and Its Applications

---

## 📌 Project Overview

**Combinatorics Learning Lab** is an interactive, fully responsive, zero-dependency educational web application built specifically for MCA students and faculty evaluation. It comprehensively covers **ALL 12 syllabus topics** of Unit 1 (Combinatorics) through working calculators, exact `BigInt` mathematical computations, interactive visual simulations (SVG Venn diagrams, Ferrers Young diagrams, animated hash collisions, lattice paths, and Pascal pyramids), step-by-step mathematical proofs, and tangible computer science case studies.

---

## 🚀 Key Features

1. **Complete Coverage of All 12 Syllabus Topics**:
   - **Module 1: Introduction to Combinatorics & Computing Applications** — Keyspace brute-force analysis ($|\Sigma|^L$), Shannon entropy, and lattice routing path explorer ($C(m+n, m)$).
   - **Module 2: Basic Counting Principles** — Addition Rule (mutually exclusive disjoint sets), Multiplication Rule (sequential multi-stage actions), and PC hardware configuration builder ($CPU \times RAM \times GPU \times Storage$).
   - **Module 3: Permutations With and Without Repetition** — Selections without repetition ($P(n,r)$), arrangements ($n!$), repetition allowed ($n^r$), and multinomial repeated-character anagram analyzer (e.g. `MISSISSIPPI` $\to 34,650$).
   - **Module 4: Combinations and Related Identities** — $C(n,r)$ calculator, Pascal's Identity ($C(n,r) = C(n-1,r-1) + C(n-1,r)$), Symmetry Identity ($C(n,r) = C(n, n-r)$), and interactive clickable Pascal Pyramid.
   - **Module 5: Binomial Theorem and Pascal's Triangle** — Algebraic expansion of $(a+b)^n$, detailed binomial term table, and direct numerical substitution verification.
   - **Module 6: Pigeonhole Principle (Basic & Generalized)** — Minimum object ceiling $\lceil N/k \rceil$, animated balls-and-boxes drop simulator, and Hash Table collision demonstrator with load factor ($\alpha = N/k$).
   - **Module 7: Inclusion–Exclusion Principle** — 2-set and 3-set calculators with strict boundary constraint validation and dynamic SVG Venn diagram with calculated disjoint sectors.
   - **Module 8: Derangements & Applications** — Subfactorial recurrence $D(n) = (n-1)[D(n-1)+D(n-2)]$, base cases $D(0)=1, D(1)=0$, probability convergence to $1/e \approx 0.367879$, and Monte Carlo task/envelope assignment simulation.
   - **Module 9: Counting With Repetition and Multisets** — Stars and Bars theorem $C(n+r-1, r)$ with dynamic graphical display, and a side-by-side comparison matrix of the 4 fundamental counting models.
   - **Module 10: Integer Partitions and Compositions** — Euler DP integer partition count $p(n)$, compositions $c(n) = 2^{n-1}$, generated listings, and interactive Ferrers / Young diagram visualizer.
   - **Module 11: Recurrence Relations & Solutions** — Fibonacci, Tower of Hanoi ($T(n) = 2^n - 1$), Merge Sort Divide-and-Conquer ($\Theta(n \log n)$), Arithmetic, Geometric, and iterative DP vs naive recursive call stack comparisons.
   - **Module 12: Generating Functions & Applications** — Ordinary Generating Function (OGF) Cauchy convolution engine and target-sum coin change solver verified against dynamic programming.

2. **Dynamic MCQ Assessment Quiz (Multi-Set Question Bank)**:
   - 12 comprehensive questions per attempt (1 for each topic).
   - **Dynamic Rotation**: Whenever an exam is retaken or switched, the system automatically pulls fresh, rotated questions from the question bank and shuffles the 4 options!
   - Real-time color-coded feedback (emerald for correct, rose for incorrect) and mathematical explanations.
   - Attempt counter and percentage score summary.

3. **Faculty Viva & Presentation Features**:
   - **Demo Mode**: 1-click guided presentation mode that loads exemplary faculty-grade presets for all 12 modules.
   - **Formula Cheat Sheet**: Categorized compendium of formulas, conditions, and computing applications.
   - **CS Applications Deep Dive**: Dedicated portal explaining how combinatorics is utilized in Cryptography, Algorithm Analysis, Database Optimizers, Network Topologies, and AI.
   - **Searchable Glossary**: Instant keyword filtering across 22+ discrete math and computing definitions.
   - **Editable Student Profile**: Editable Name, Enrolment Number, Division, Semester, and Year saved to `localStorage`.
   - **Print-Ready Viva Sheet**: Clean `@media print` styling for generating PDF assignment reports.

---

## 🛠️ Technology Stack

- **Structure**: HTML5 (Semantic elements, accessible labels, clear IDs)
- **Styling**: Vanilla CSS3 (Custom properties, dark/light themes, glassmorphism, responsive CSS grid/flexbox, print media queries)
- **Logic**: Pure JavaScript ES6+ (Native `BigInt` for exact factorials, dynamic programming, zero external dependencies)
- **Portability**: 100% offline-ready. Runs directly in any web browser without Node.js, Python, or web servers required.

---

## 📁 Directory Structure

```text
Combinatorics_Learning_Lab/
├── index.html                  # Master application entry point
├── css/
│   └── styles.css              # Dark/light theme, layout, components, and print styles
├── js/
│   ├── math-utils.js           # Exact BigInt math engine (factorials, nCr, partitions, OGFs)
│   ├── app.js                  # Master application controller, router, theme & progress tracker
│   └── modules/
│       ├── module1.js          # Password keyspace & Grid lattice paths
│       ├── module2.js          # Sum rule, Product rule & PC hardware configurator
│       ├── module3.js          # Permutations (nPr, n!, n^r, repeated anagrams)
│       ├── module4.js          # Combinations, Pascal identity & clickable pyramid
│       ├── module5.js          # Binomial expansion & numerical verification
│       ├── module6.js          # Pigeonhole simulator & Hash collision table
│       ├── module7.js          # Inclusion-Exclusion & dynamic SVG Venn diagram
│       ├── module8.js          # Derangements & Monte Carlo envelope simulation
│       ├── module9.js          # Multisets, Stars & Bars visualizer & 4 models
│       ├── module10.js         # Integer partitions, compositions & Ferrers diagram
│       ├── module11.js         # Recurrence relations & iteration vs recursion steps
│       ├── module12.js         # Generating functions & coin change target sum
│       ├── quiz.js             # Dynamic MCQ exam with rotating question pool
│       ├── glossary.js         # Searchable discrete mathematics glossary
│       └── demo.js             # 1-click Faculty demonstration presets
├── README.md                   # Full documentation & setup instructions
├── TESTING_CHECKLIST.md        # Comprehensive test scenarios and boundary verification
├── FACULTY_DEMO_SCRIPT.md      # 5-minute faculty presentation script
└── SUBMISSION_TEMPLATE.md      # Email submission template for college portal
```

---

## 💻 How to Run Locally

### Option 1: Direct File Launch (Easiest)
1. Double-click `index.html` from Windows File Explorer.
2. The application will open directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
3. No internet connection or installation is required!

### Option 2: Using Python Local Server
```bash
# Open PowerShell in the project directory
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

### Option 3: Using Node.js (npx serve)
```bash
npx serve .
```

---

## 🌐 Hosting on GitHub Pages (Optional)

1. Create a new GitHub repository: `combinatorics-learning-lab`.
2. Push all project files to the `main` branch.
3. In GitHub, go to **Settings** > **Pages**.
4. Under **Source**, choose `Deploy from a branch` and select `main` / `/ (root)`.
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/combinatorics-learning-lab/`.

---

## 🎓 Academic Evaluation Details

- **Student Name**: Nilesh V.
- **Enrolment Number**: MCA2026001
- **Programme**: Master of Computer Applications (MCA)
- **Semester**: 1
- **Division**: A
- **Subject**: Foundation of Mathematics
- **Unit**: Unit 1 — Combinatorics and Its Applications
- **Academic Year**: 2026–27
