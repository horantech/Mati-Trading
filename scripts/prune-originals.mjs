/** After build: drop heavy originals from out/images when an optimised .webp exists. */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "out", "images");
if (fs.existsSync(dir)) {
  let removed = 0;
  for (const file of fs.readdirSync(dir)) {
    const m = file.match(/^(.*)\.(jpe?g|png)$/i);
    if (m && fs.existsSync(path.join(dir, `${m[1]}.webp`))) {
      fs.rmSync(path.join(dir, file));
      removed++;
    }
  }
  if (removed) console.log(`Removed ${removed} original image(s) from out/ (optimised versions are served).`);
}
