// news-image-20261122 entry (Node 22, standard library only).
// One image summing up the world's news of Sunday 22 November 2026:
// Iran strikes an industrial site in Bahrain as Gulf tensions flare,
// COP31 climate talks in Antalya run into a second day of overtime over
// fossil fuels, Mexico captures cartel boss "El Chapo Isidro" in Sinaloa,
// and world markets slide into correction on an AI sell-off.
// Running this program copies the front page beside this file to the
// output directory, where the grader expects it as entry.png.
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// The grader runs this program twice and both runs must write the same
// bytes, so read the copy back and fail loudly unless it is byte-identical
// to the source image: a truncated or altered copy must never pass silently.
const sourceBytes = readFileSync(source);
const targetBytes = readFileSync(target);
const digest = (buf: Buffer) => createHash('sha256').update(buf).digest('hex');
if (sourceBytes.length !== targetBytes.length || digest(sourceBytes) !== digest(targetBytes)) {
  throw new Error(
    `entry.png copy failed verification: wrote ${targetBytes.length} of ${sourceBytes.length} bytes`,
  );
}
console.log(`verified ${target} (${targetBytes.length} bytes, sha256 ${digest(targetBytes).slice(0, 16)}…)`);
