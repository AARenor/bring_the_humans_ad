// Entry harness for bring-the-humans-03.
//
// The gate reads /output/VIDEO.json, and the video's address it holds is the only thing that counts.
// So the program copies VIDEO.json from the entry's bot directory (MAKEFUN_BOT_DIR, /bot inside the
// grader) to its output directory (MAKEFUN_OUTPUT_DIR, /output inside the grader). Nothing else
// runs: no network, no clock, no reads outside those two directories, and the copy is byte for byte
// so two runs write identical files.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const videoFile = 'VIDEO.json';

try {
  mkdirSync(outputDir, { recursive: true });
} catch (error) {
  console.error(`could not create the output directory ${outputDir}: ${(error as Error).message}`);
  process.exit(1);
}

// One byte-for-byte copy of the address file; the input is only read, never changed.
try {
  copyFileSync(join(botDir, videoFile), join(outputDir, videoFile));
} catch (error) {
  console.error(`could not copy ${videoFile} from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
