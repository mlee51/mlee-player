// scripts/generate-audio-manifest.js
const fs = require("fs");
const path = require("path");

const audioDir = path.join(__dirname, "../public/audio");
const outputFile = path.join(audioDir, "manifest.json");

const files = fs.readdirSync(audioDir).filter(file => file.endsWith(".mp3"));

const manifest = files.map(file => ({
  title: file.replace(".mp3", "").replace(/[-_]/g, " "),
  file: `/audio/${file}`,
}));

fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));

console.log(`✅ Generated manifest.json with ${manifest.length} tracks`);
