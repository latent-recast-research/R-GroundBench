# R-GroundBench GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished bilingual static GitHub Pages site that presents R-GroundBench's strengths, lets visitors try a deterministic benchmark-style question, and exposes the benchmark's observed failure modes and limitations.

**Architecture:** One static `index.html`, one `styles.css`, and one `app.js` inside `outputs/r-groundbench-site/`. The browser owns all UI state; data for demo questions, metrics, translations, and failure cases is embedded in `app.js`. Paper figures are copied into a local `assets/` folder only where they improve comprehension.

**Tech Stack:** Semantic HTML, CSS custom properties/grid, vanilla JavaScript, inline SVG/CSS visualizations, local PNG/JPG assets.

---

### Task 1: Create the static page structure

**Files:**
- Create: `outputs/r-groundbench-site/index.html`
- Create: `outputs/r-groundbench-site/styles.css`
- Create: `outputs/r-groundbench-site/app.js`
- Create: `work/check_site.mjs`

- [ ] **Step 1: Write the failing smoke check**

Create `work/check_site.mjs` that reads the three site files and asserts the HTML contains the main section IDs, the JS contains the interaction handlers, and the CSS contains the responsive breakpoint.

```js
import fs from 'node:fs';
const html = fs.readFileSync('outputs/r-groundbench-site/index.html', 'utf8');
const css = fs.readFileSync('outputs/r-groundbench-site/styles.css', 'utf8');
const js = fs.readFileSync('outputs/r-groundbench-site/app.js', 'utf8');
for (const id of ['hero', 'evidence', 'try', 'cliff', 'failures', 'limits']) {
  if (!html.includes(`id="${id}"`)) throw new Error(`missing section ${id}`);
}
for (const token of ['setLanguage', 'submitAnswer', 'setDifficulty']) {
  if (!js.includes(token)) throw new Error(`missing handler ${token}`);
}
if (!css.includes('@media')) throw new Error('missing responsive CSS');
console.log('site smoke check passed');
```

- [ ] **Step 2: Run the check to verify it fails**

Run `node work/check_site.mjs`. Expected: FAIL because the site files do not exist yet.

- [ ] **Step 3: Implement the semantic HTML skeleton**

Create a single page with skip link, header navigation, language toggle, hero, evidence cards, benchmark interaction section, metric cliff section, failure case cards, limitations/reproduction section, and footer. Include accessible live regions for answer feedback and metric text.

- [ ] **Step 4: Implement the visual system**

Use CSS variables for ink/navy/paper/amber/coral/teal, a distinctive serif display face plus readable sans fallback, paper-like grain using gradients, asymmetrical hero composition, cards with clear borders, visible focus rings, and responsive layouts at 760px.

- [ ] **Step 5: Implement local data and interaction behavior**

In `app.js`, define English/Chinese copy, two deterministic demo questions, failure labels, metric states, and functions named `setLanguage`, `submitAnswer`, and `setDifficulty`. The question flow must show selected candidates, correct/incorrect feedback, a reset action, and a short explanation of the relevant shortcut/failure mode. Metric controls must update values and an accessible text description.

- [ ] **Step 6: Run the check to verify it passes**

Run `node work/check_site.mjs`. Expected: `site smoke check passed`.

- [ ] **Step 7: Commit**

```bash
git add outputs/r-groundbench-site work/check_site.mjs
git commit -m "feat: build interactive R-GroundBench GitHub Pages site"
```

### Task 2: Add paper-grounded assets and links

**Files:**
- Create: `outputs/r-groundbench-site/assets/`
- Modify: `outputs/r-groundbench-site/index.html`

- [ ] **Step 1: Copy only useful local figures**

Copy `case_study.png`, `case_study.jpg`, and `fig/R_GROUNDBENCH_v2.pdf` if browser support is useful; prefer PNG/JPG in the page and retain the PDF as a linked source if needed. Add descriptive alt text that identifies the figure's purpose.

- [ ] **Step 2: Wire verified project links**

Add links to `https://github.com/CrisYing/R-GROUNDBENCH/`, `https://huggingface.co/Crisying`, the local paper PDF, and the local reproducibility checklist. Use `target="_blank"` and `rel="noreferrer"` for external destinations.

- [ ] **Step 3: Verify asset references**

Run `rg -n 'src=|href=' outputs/r-groundbench-site/index.html` and check every local path exists. Expected: no missing local asset path.

- [ ] **Step 4: Commit**

```bash
git add outputs/r-groundbench-site
git commit -m "feat: add grounded figures and reproduction links"
```

### Task 3: Browser QA and final delivery checks

**Files:**
- Modify: `outputs/r-groundbench-site/index.html` only if QA finds a broken label or link.
- Modify: `outputs/r-groundbench-site/styles.css` only if QA finds layout issues.
- Modify: `outputs/r-groundbench-site/app.js` only if QA finds interaction issues.

- [ ] **Step 1: Start a local static server**

Run `python3 -m http.server 4173 --directory outputs/r-groundbench-site` and keep it running for browser inspection.

- [ ] **Step 2: Inspect the first meaningful preview**

Open `http://127.0.0.1:4173` in a browser. Confirm the first viewport shows the thesis, primary CTA, and evidence signal without runtime errors.

- [ ] **Step 3: Exercise interactions**

Click Easy and Hard, select each answer option, submit, reset, toggle English/Chinese, and verify the metric cliff updates and feedback is announced.

- [ ] **Step 4: Check responsive layout and source quality**

Inspect desktop and narrow widths. Run `node --check outputs/r-groundbench-site/app.js`, `node work/check_site.mjs`, and `rg -n 'TODO|TBD|lorem|undefined' outputs/r-groundbench-site`.

- [ ] **Step 5: Commit fixes**

```bash
git add outputs/r-groundbench-site
git commit -m "fix: polish responsive and interaction QA"
```
