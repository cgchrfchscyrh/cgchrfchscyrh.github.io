// Run from the repository root. Requires FFmpeg (FFMPEG_PATH may point to it).
import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const chapters = JSON.parse(await readFile("src/data/school-chapters.json", "utf8"));
const directory = "public/projects/disease-resistant-school-communities";
const input = `${directory}/school-research.mp4`;
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg";
const timestamp = seconds => {
  const milliseconds = Math.round(seconds * 1000);
  return `${String(Math.floor(milliseconds / 3600000)).padStart(2, "0")}:${String(Math.floor(milliseconds / 60000) % 60).padStart(2, "0")}:${String(Math.floor(milliseconds / 1000) % 60).padStart(2, "0")}.${String(milliseconds % 1000).padStart(3, "0")}`;
};
const seconds = time => time.split(":").reduce((sum, part) => sum * 60 + Number(part), 0);
function sliceVtt(source, start, end) {
  const cues = source.replace(/\r/g, "").trim().split(/\n\n+/).slice(1).flatMap(block => {
    const lines = block.split("\n");
    const timingIndex = lines.findIndex(line => line.includes(" --> "));
    if (timingIndex < 0) return [];
    const [from, to] = lines[timingIndex].split(" --> ").map(seconds);
    if (from >= end || to <= start) return [];
    return [`${timestamp(Math.max(from, start) - start)} --> ${timestamp(Math.min(to, end) - start)}\n${lines.slice(timingIndex + 1).join("\n")}`];
  });
  return `WEBVTT\n\n${cues.join("\n\n")}\n`;
}
function run(args) {
  const result = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", ...args], { stdio: "inherit" });
  if (result.error || result.status !== 0) throw result.error || new Error(`FFmpeg exited ${result.status}`);
}
const captions = await readFile(`${directory}/school-research.en.vtt`, "utf8");
const descriptions = (await readFile(`${directory}/school-research.vtt`, "utf8"))
  .replace("The sponsor logo remains on the source credit strip.", "The sponsor logo remains on the source credit strip. The final publisher slate reads Wiley.");
for (const chapter of chapters) {
  const base = `${directory}/${chapter.id}`;
  run(["-y", "-ss", String(chapter.start), "-i", input, "-t", String(chapter.end - chapter.start),
    "-map", "0:v:0", "-map", "0:a:0", "-c:v", "libx264", "-preset", "medium", "-crf", "23",
    "-pix_fmt", "yuv420p", "-threads", "4", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", base + ".mp4"]);
  run(["-y", "-ss", String(chapter.posterTime), "-i", input, "-frames:v", "1", "-q:v", "2", "-update", "1", base + ".jpg"]);
  await writeFile(base + ".en.vtt", sliceVtt(captions, chapter.start, chapter.end));
  await writeFile(base + ".vtt", sliceVtt(descriptions, chapter.start, chapter.end));
  console.log(`${chapter.id}: ${chapter.sourceRange}`);
}
