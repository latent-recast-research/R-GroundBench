const resultsText = {
  en: {
    visualKicker: 'FROM RECOGNITION TO GENERATION',
    visualTitle: 'When the candidates disappear, performance falls.',
    openFigure: 'Open full-size figure ↗',
    visualIntro: 'Read each panel from left to right: Basic VQA → Advanced VQA → Generation. Selecting a plausible molecule does not guarantee that a model can construct the correct one.',
    snapshot: 'PAPER FIGURE · EARLIER SNAPSHOT',
    visualCaption: 'Original s2s figure from the paper appendix. This figure reflects an earlier evaluation snapshot; some model names and scores differ from the current manuscript tables below.',
    tableKicker: 'THE COMPLETE RESULTS', tableTitle: 'Every model. Every modality. Every split.',
    download: 'Download CSV ↓',
    tableIntro: 'Full results transcribed from the current manuscript tables. Filter the rows or scroll horizontally to compare all metrics.',
    groupLabel: 'Model group', allGroups: 'All model groups', vlms: 'General VLMs', llms: 'General LLMs', chemical: 'Chemical-domain models',
    modalityLabel: 'Modality', allModalities: 'All modalities', searchLabel: 'Find a model',
    empty: 'No rows match these filters. Try another model or modality.',
    tableNote: 'Scores are percentages; ΔEH is Easy − Hard in percentage points. EM = Exact Match; Scaff. = Scaffold Match; Tani. = Tanimoto Similarity. Values and emphasis are reproduced as reported in the manuscript.',
    sourceNote: '† A source-reported Δ differs from Easy − Hard for the displayed scores; the original value is retained. Ranking marks are also transcribed, not recomputed.',
    modalityNote: 'i = image; s = E-SMILES input / SMILES output. Bold and underlined values reproduce the paper’s best / second-best annotations within each model group and modality.'
  },
  zh: {
    visualKicker: '从候选识别到分子生成', visualTitle: '候选消失后，表现便急剧下降。',
    openFigure: '查看高清原图 ↗',
    visualIntro: '从左到右阅读每个模型面板：Basic VQA → Advanced VQA → Generation。能够选出看似合理的分子，不代表能够正确构建这个分子。',
    snapshot: '论文原图 · 较早评测快照',
    visualCaption: '论文附录中的 s2s 原图。此图对应较早的评测快照，部分模型名称和数值与下方当前论文结果表不同。',
    tableKicker: '完整评测结果', tableTitle: '逐一比较模型、模态与难度。', download: '下载 CSV ↓',
    tableIntro: '完整呈现当前论文结果表。可筛选模型和模态，横向滚动查看所有指标。',
    groupLabel: '模型类别', allGroups: '全部模型类别', vlms: '通用 VLM', llms: '通用 LLM', chemical: '化学领域模型',
    modalityLabel: '模态', allModalities: '全部模态', searchLabel: '查找模型',
    empty: '没有符合条件的结果，请尝试其他模型或模态。',
    tableNote: '得分单位为百分比；ΔEH 为 Easy − Hard，单位为百分点。EM = 精确匹配；Scaff. = 骨架匹配；Tani. = Tanimoto 相似度。数值及重点标记均按论文原表保留。',
    sourceNote: '† 表示原表中的差值与所列 Easy − Hard 不一致；此处保留原值。排名标记也直接转录，未重新计算。',
    modalityNote: 'i 表示图像；s 表示 E-SMILES 输入 / SMILES 输出。粗体和下划线保留论文在各模型类别、模态内的最优 / 次优标记。'
  }
};
let resultsTrack = 'vqa';
const resultsGroup = document.getElementById('results-group-filter');
const resultsModality = document.getElementById('results-modality-filter');
const resultsSearch = document.getElementById('results-search');
function updateResultTables() {
  const query = resultsSearch.value.trim().toLowerCase();
  let visible = 0, total = 0;
  document.querySelectorAll('[data-result-panel]').forEach(panel => {
    const active = panel.dataset.resultPanel === resultsTrack;
    panel.hidden = !active;
    if (!active) return;
    panel.querySelectorAll('tbody tr[data-model]').forEach(row => {
      total++;
      const match = (resultsGroup.value === 'all' || row.dataset.group === resultsGroup.value)
        && (resultsModality.value === 'all' || row.dataset.modality === resultsModality.value)
        && row.dataset.model.toLowerCase().includes(query);
      row.hidden = !match;
      if (match) visible++;
    });
  });
  document.getElementById('results-count').textContent = `${visible} / ${total} ${lang === 'zh' ? '行' : 'rows'}`;
  document.getElementById('results-empty').hidden = visible > 0;
  document.getElementById('results-download').href = `assets/results/${resultsTrack}-results.csv`;
  document.querySelectorAll('[data-result-track]').forEach(button => {
    const active = button.dataset.resultTrack === resultsTrack;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function translateResults() {
  document.querySelectorAll('[data-results-i18n]').forEach(el => {
    const text = resultsText[lang][el.dataset.resultsI18n];
    if (text) el.textContent = text;
  });
  resultsSearch.placeholder = lang === 'zh' ? '如 Qwen、GPT、ChemVLM' : 'e.g. Qwen, GPT, ChemVLM';
  updateResultTables();
}
document.querySelectorAll('[data-result-track]').forEach(button => button.addEventListener('click', () => {
  resultsTrack = button.dataset.resultTrack;
  if (resultsTrack === 'generation' && ['i2i', 's2i'].includes(resultsModality.value)) resultsModality.value = 'all';
  for (const option of resultsModality.options) option.disabled = resultsTrack === 'generation' && ['i2i', 's2i'].includes(option.value);
  updateResultTables();
}));
resultsGroup.addEventListener('change', updateResultTables);
resultsModality.addEventListener('change', updateResultTables);
resultsSearch.addEventListener('input', updateResultTables);
document.addEventListener('languagechange', translateResults);
translateResults();
