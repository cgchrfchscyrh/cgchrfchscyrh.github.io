"""Prepare web copies of supplied Building Immunology media; originals stay untouched."""
from pathlib import Path
from zipfile import ZipFile
from io import BytesIO
import hashlib
import json
import subprocess
import argparse
from PIL import Image

REPO = Path(__file__).resolve().parents[1]
MATERIALS = REPO.parents[1] / "materials"
OUT = REPO / "public/projects/building-immunology"
VIDEO = MATERIALS / "Animated_Infographics_May_09_2022.mp4"
DECK = MATERIALS / "Building Immunology 1.pptx"
OUT.mkdir(parents=True, exist_ok=True)
parser = argparse.ArgumentParser()
parser.add_argument("--images-only", action="store_true", help="Refresh figures without re-encoding unchanged videos")
args = parser.parse_args()
records = []

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

with ZipFile(DECK) as archive:
    for source, name, slide in [
        ("image1.png", "building-immunity", 2),
        ("image3.png", "immunity-framework", 3),
        ("image2.png", "occupant-interaction", 3),
    ]:
        data = archive.read("ppt/media/" + source)
        original = Image.open(BytesIO(data))
        transform = "WebP conversion; complete image, original colors and aspect ratio retained"
        if name == "immunity-framework":
            # Discarding alpha exposes black RGB values stored in transparent pixels.
            rgba = original.convert("RGBA")
            image = Image.alpha_composite(Image.new("RGBA", rgba.size, "white"), rgba).convert("RGB")
            name = "immunity-framework-white"
            transform = "Original transparent PNG composited on white before WebP conversion; complete labels, lines and frame retained"
        elif name == "occupant-interaction":
            # Never recreate a public unredacted photograph during media refreshes.
            image = Image.open(REPO / "assets/edited/occupant-interaction-redacted.png").convert("RGB")
            name = "occupant-interaction-redacted"
            transform = "Privacy mosaic applied to face region only; remaining source pixels retained before WebP conversion"
        else:
            image = original.convert("RGB")
        image.save(OUT / f"{name}.webp", quality=90, method=6)
        record = {"file": f"{name}.webp", "source": DECK.name, "slide": slide,
                  "embedded": "ppt/media/" + source, "source_sha256": hashlib.sha256(data).hexdigest(),
                  "dimensions": image.size, "transform": transform}
        if name == "building-immunity":
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(OUT / f"{name}-preview.webp", quality=87, method=6)
            record["preview"] = f"{name}-preview.webp"
        records.append(record)

clips = [
    ("robotic-perception", 8, 9, 13, [
        (0, 9, "An animated mobile robot appears beside a surface. Labels identify a camera and LiDAR for perception and navigation, and UV, spray or wipe accessories for disinfection. This is an illustrated research overview. Wiley, the journal, and the Hu and Li (2022) paper credit remain along the bottom."),
    ]),
    ("surface-materials", 19.5, 10, 24, [
        (0, 10, "Glass, fabric and metal appear as labeled surface examples. The infographic explains that surface materials can affect pathogen retention and transmission, motivating disinfection that adapts to the identified material. The animation presents the research motivation, not measurements for these illustrated objects. The publisher and paper credits remain visible."),
    ]),
    ("adaptive-disinfection", 32, 21, 47, [
        (0, 6, "Pictures of a table, bed and window feed a deep learning network. The diagram labels multi-level feature fusion and texture features, then shows identified glass, fabric and metal materials."),
        (6, 15, "A second diagram connects identified materials to pathogen survivability, surface-to-hand transfer and hand-to-mucous transfer. Arrows lead to a suitable disinfection dosage."),
        (15, 21, "The completed diagram links material recognition and surface infection risk with adapted disinfection procedures and dose. The Wiley and Hu and Li (2022) paper credits remain visible. This is an animated explanation of the framework, not a recorded robot experiment."),
    ]),
]

def stamp(seconds):
    ms = round(seconds * 1000)
    return f"{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02}.{ms % 1000:03}"

for name, start, duration, poster, cues in clips:
    if not args.images_only:
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-ss", str(start), "-i", str(VIDEO),
                    "-t", str(duration), "-an", "-vf", "scale=1280:-2", "-c:v", "libx264", "-preset", "slow",
                    "-crf", "21", "-pix_fmt", "yuv420p", "-threads", "2", "-movflags", "+faststart",
                    "-y", str(OUT / f"{name}.mp4")], check=True)
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-ss", str(poster), "-i", str(VIDEO),
                    "-frames:v", "1", "-vf", "scale=1280:-2", "-q:v", "2", "-y", str(OUT / f"{name}.jpg")], check=True)
    (OUT / f"{name}.vtt").write_text("WEBVTT\n\n" + "\n\n".join(
        f"{stamp(a)} --> {stamp(b)}\n{text}" for a, b, text in cues) + "\n")
    records.append({"file": f"{name}.mp4", "source": VIDEO.name, "source_start_seconds": start,
                    "duration_seconds": duration, "poster_source_seconds": poster,
                    "transform": "Muted web excerpt; original speed, complete frame and publisher credits retained; 1280 x 720 H.264"})

report = {"sources": [{"file": p.name, "sha256": sha(p)} for p in [DECK, VIDEO]], "assets": records,
          "paper": "https://doi.org/10.1111/mice.12811",
          "scope": "PPT concept and integration diagrams; publisher infographic excerpts; no new experimental or clinical efficacy claim."}
(REPO / "reports/immunology-media-refresh.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({"prepared": len(records), "output": str(OUT)}, indent=2))
