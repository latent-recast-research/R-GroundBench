from pathlib import Path
from rdkit import Chem
from rdkit.Chem.Draw import rdMolDraw2D
from PIL import Image, ImageDraw, ImageFont

OUT = Path('outputs/r-groundbench-site/assets/molecules')
OUT.mkdir(parents=True, exist_ok=True)

# These are concrete, valid SMILES chosen to instantiate the authored demo's
# R-group choices.  They are rendered locally with RDKit and shipped as static
# PNGs so the GitHub Pages demo has no runtime chemistry dependency.
MOLECULES = {
    'markush-easy': ('c1cc([*])ccc1', 'Markush · R[1]', 'R[1]'),
    'markush-hard': ('c1nc(nc(n1)[*])[*]', 'Markush · R[2]', 'R[2]'),
    'easy-a-4-chlorophenyl': ('c1ccc(-c2ccc(Cl)cc2)cc1', 'A · 4-chlorophenyl', None),
    'easy-b-2-chlorophenyl': ('c1ccc(-c2ccccc2Cl)cc1', 'B · 2-chlorophenyl', None),
    'easy-c-2-pyridyl': ('c1ccc(-c2ccccn2)cc1', 'C · 2-pyridyl', None),
    'hard-a-phenyl': ('c1nc(nc(n1)c2ccccc2)c3ccccc3', 'A · phenyl', None),
    'hard-b-3-pyridyl': ('c1nc(nc(n1)c2ccccc2)c3cccnc3', 'B · 3-pyridyl', None),
    'hard-c-2-pyridyl': ('c1nc(nc(n1)c2ccccc2)c3ccccn3', 'C · 2-pyridyl', None),
}

def render(smiles, caption, wildcard):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError(f'Invalid SMILES: {smiles}')
    if wildcard:
        for atom in mol.GetAtoms():
            if atom.GetSymbol() == '*':
                atom.SetProp('atomLabel', wildcard)
                atom.SetProp('atomNote', 'R-group')
    d = rdMolDraw2D.MolDraw2DCairo(600, 330)
    opts = d.drawOptions()
    opts.padding = 0.12
    opts.fixedBondLength = 42
    opts.bondLineWidth = 2.0
    opts.backgroundColour = (1.0, 1.0, 1.0, 0.0)
    opts.useBWAtomPalette()
    d.DrawMolecule(mol)
    d.FinishDrawing()
    png = d.GetDrawingText()
    tmp = OUT / f'{caption.replace(" ", "_")}.tmp.png'
    tmp.write_bytes(png)
    im = Image.open(tmp).convert('RGBA')
    # Crop transparent margins while preserving breathing room.
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    canvas = Image.new('RGBA', (720, 430), (255, 255, 255, 0))
    x = (canvas.width - im.width) // 2
    y = 22
    canvas.alpha_composite(im, (x, y))
    # Captions are static metadata, not part of the molecular graph.
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype('/System/Library/Fonts/SFNSMono.ttf', 22)
    except Exception:
        font = ImageFont.load_default()
    draw.text((24, 377), caption, fill=(71, 85, 105, 255), font=font)
    out = OUT / f'{caption.lower().replace(" · ", "-").replace(" ", "-").replace("[", "").replace("]", "").replace("·", "-")}.png'
    # Derive stable names from caller by replacing later.
    return out, canvas

for key, (smi, caption, wildcard) in MOLECULES.items():
    mol = Chem.MolFromSmiles(smi)
    if mol is None:
        raise ValueError(f'Invalid SMILES for {key}: {smi}')
    if wildcard:
        for atom in mol.GetAtoms():
            if atom.GetSymbol() == '*':
                atom.SetProp('atomLabel', wildcard)
    d = rdMolDraw2D.MolDraw2DCairo(600, 330)
    opts = d.drawOptions(); opts.padding = 0.12; opts.fixedBondLength = 42; opts.bondLineWidth = 2.0
    opts.backgroundColour = (1.0, 1.0, 1.0, 0.0); opts.useBWAtomPalette()
    d.DrawMolecule(mol); d.FinishDrawing()
    temp = OUT / f'.{key}.png'; temp.write_bytes(d.GetDrawingText())
    im = Image.open(temp).convert('RGBA'); temp.unlink()
    bbox = im.getbbox()
    if bbox: im = im.crop(bbox)
    canvas = Image.new('RGBA', (720, 430), (255,255,255,0)); canvas.alpha_composite(im, ((720-im.width)//2, 20))
    draw = ImageDraw.Draw(canvas)
    try: font = ImageFont.truetype('/System/Library/Fonts/SFNSMono.ttf', 22)
    except Exception: font = ImageFont.load_default()
    draw.text((24, 377), caption, fill=(71,85,105,255), font=font)
    canvas.save(OUT / f'{key}.png', optimize=True)

# Mapping consumed by the static front-end.
import json
(OUT / 'manifest.json').write_text(json.dumps({k:{'smiles':v[0], 'caption':v[1]} for k,v in MOLECULES.items()}, indent=2, ensure_ascii=False)+'\n')
print(f'Wrote {len(MOLECULES)} images to {OUT}')
