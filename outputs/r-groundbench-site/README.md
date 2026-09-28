# R-GroundBench Academic Project Page

Static GitHub Pages site for **R-GroundBench: A Diagnostic Benchmark for R-Group Grounding in Markush Molecular Editing**.

The page follows the [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template) structure and adds a deterministic benchmark-style interaction with four visual/symbolic VQA modalities, real molecule graphs, a SMILES → molecular graph converter, a performance-cliff readout, paper figures, and reproducibility links.

Open `index.html` directly or serve this folder with:

```bash
python3 -m http.server 4173 --directory .
```

The interactive examples are authored teaching slices. Full evaluation code and benchmark data are linked from the page.

The molecule cards use illustrative, valid SMILES from the paper’s substituent pool and are rendered as atom-and-bond graphs in the browser with the vendored MIT-licensed [SmilesDrawer](https://github.com/reymond-group/smilesDrawer) library. They are teaching examples rather than claims about a specific hidden benchmark record.
