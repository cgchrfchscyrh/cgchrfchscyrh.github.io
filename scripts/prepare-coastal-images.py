"""Export the supplied coastal slide's native image on its original white background.

Only format conversion and the previously documented detail crops are applied.
The source presentation is never modified.
"""
from pathlib import Path
from PIL import Image
from io import BytesIO
import argparse
import hashlib
import json
import zipfile

parser = argparse.ArgumentParser()
parser.add_argument("presentation", type=Path)
args = parser.parse_args()
repo = Path(__file__).resolve().parents[1]
source_media = "ppt/media/image17.png"
with zipfile.ZipFile(args.presentation) as archive:
    raw = archive.read(source_media)
original = Image.open(BytesIO(raw)).convert("RGBA")
# Resolve source transparency against the slide's white canvas, not RGB black.
canvas = Image.alpha_composite(Image.new("RGBA", original.size, "white"), original).convert("RGB")
exports = [
    ("coastal-overview-full.webp", None),
    ("module-geometry.webp", (103, 68, 435, 389)),
    ("connection-strategies-full.webp", (0, 389, 1071, 978)),
    ("manufacturing-reference.webp", (771, 68, 1169, 389)),
]
records = []
for name, bounds in exports:
    image = canvas.crop(bounds) if bounds else canvas
    path = repo / "public/projects/robotic-block-assembly" / name
    image.save(path, "WEBP", lossless=True)
    records.append({"file": name, "crop": bounds, "dimensions": image.size,
                    "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
report = {"source": args.presentation.name, "slide": 7, "sourceMedia": source_media,
          "sourceSha256": hashlib.sha256(raw).hexdigest(),
          "transformation": "Original native image, resolved against the white slide background; lossless WebP. Detail crops retain their original coordinates. No generated or altered research content.",
          "exports": records}
(repo / "reports/coastal-image-export.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
