// scripts/generate-audio-manifest.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const audioDir = path.join(__dirname, "../public/audio");
const outputFile = path.join(audioDir, "manifest.json");

const files = fs.readdirSync(audioDir).filter(file => file.endsWith(".mp3"));

const manifest = files.map(file => {
  const filePath = path.join(audioDir, file);

  let durationSeconds = 0;
  try {
    const stdout = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
    durationSeconds = parseFloat(stdout.toString());
  } catch (err) {
    console.warn(`⚠️ Could not get duration for ${file}`);
  }

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60).toString().padStart(2, "0");
  const duration = isNaN(minutes) ? "unknown" : `${minutes}:${seconds}`;

  return {
    title: file.replace(".mp3", "").replace(/[-_]/g, " "),
    file: `/audio/${file}`,
    duration,
  };
});

fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
console.log(`✅ Generated manifest.json with ${manifest.length} tracks`);
