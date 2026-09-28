# R-GroundBench GitHub Pages Experience Design

## Goal
Build a bilingual static GitHub Pages site that explains the R-GroundBench benchmark, lets visitors experience its shortcut-sensitive VQA task and recognition-to-generation gap, and makes its current limitations visible.

## Audience and tone
The audience is researchers, ML practitioners, and scientifically curious visitors. The visual direction is a dark diagnostic laboratory: warm paper white for readable evidence, ink/navy for structure, and amber/coral accents for failure states. The writing is direct and evidence-led. English is the default with a Chinese toggle.

## Experience flow
1. Hero states the thesis: candidate recognition is easier than grounded molecular editing.
2. Evidence cards show the benchmark's real scale, four modalities, and two evaluation tracks.
3. Interactive “try the benchmark” panel presents a hand-curated Basic question with Easy/Hard modes, candidates, feedback, and a short error taxonomy. It is a transparent teaching demo, not a live chemistry engine.
4. A “performance cliff” control switches between Easy VQA, Hard VQA, and Generation and updates a visual comparison using the paper's reported values.
5. Failure cases explain semantic disconnect, pseudo-reasoning, structural error, and backbone alteration.
6. Limits and reproduction links make the scope explicit and link to GitHub, Hugging Face, paper PDF, and checklist.

## Architecture
Plain static HTML/CSS/JS, no build step and no backend. The page is deployable as the repository root on GitHub Pages. All interactions use deterministic local data. The demo uses authored examples whose answers and explanations are stored in JavaScript; no model call or chemical validity claim is implied.

## Data and evidence
Use reported benchmark facts: 14,394 clean Markush structures, 12,962 unique scaffolds, 55,982 editing operations, 56,500 instruction records, four modalities, and VQA/Generation tracks. Use explicit table values for the performance comparison, including GPT-5.5 s2s Basic Easy 98.3, Hard 66.1, Generation Easy EM 44.6, and Hard EM 38.4. Label values as reported benchmark results and show the model/modality alongside them.

## Interaction and accessibility
The language toggle updates all marked copy without reload. The benchmark panel supports keyboard selection, visible selected state, a submit button, feedback text, and a reset control. Reduced-motion users receive a static layout. Buttons have labels and focus states, and charts include text equivalents.

## Verification
Open the local static page in a browser, verify the benchmark interaction in both modes, toggle language, test responsive widths, and confirm all external links are present. Search source for unresolved placeholder text and run a simple HTML/JS syntax check.
