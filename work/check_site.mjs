import fs from 'node:fs';
const html = fs.readFileSync('outputs/r-groundbench-site/index.html', 'utf8');
const css = fs.readFileSync('outputs/r-groundbench-site/styles.css', 'utf8');
const js = fs.readFileSync('outputs/r-groundbench-site/app.js', 'utf8');
for (const id of ['hero', 'evidence', 'try', 'cliff', 'failures', 'limits']) {
  if (!html.includes(`id="${id}"`)) throw new Error(`missing section ${id}`);
}
for (const token of ['setLanguage', 'submitAnswer', 'setDifficulty', 'setModality', 'moleculeSvg']) {
  if (!js.includes(token)) throw new Error(`missing handler ${token}`);
}
if (!css.includes('@media')) throw new Error('missing responsive CSS');
for (const token of ['data-modality="i2i"', 'data-modality="i2s"', 'data-modality="s2i"', 'data-modality="s2s"']) {
  if (!html.includes(token)) throw new Error(`missing modality ${token}`);
}
console.log('site smoke check passed');
