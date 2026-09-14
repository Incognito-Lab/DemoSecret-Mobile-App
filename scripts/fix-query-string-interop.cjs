// query-string 7 expects a CommonJS function, while the patched decoder is ESM.
// Keep its existing API until Expo Router and React Navigation can update it.
const fs = require('node:fs');
const { createRequire } = require('node:module');

const original = "const decodeComponent = require('decode-uri-component');";
const patched = [
  "const decodeComponentModule = require('decode-uri-component');",
  'const decodeComponent = decodeComponentModule.default || decodeComponentModule;',
].join('\n');

for (const parent of ['expo-router', '@react-navigation/core']) {
  const resolveFromParent = createRequire(require.resolve(parent));
  const parserFile = resolveFromParent.resolve('query-string');
  const source = fs.readFileSync(parserFile, 'utf8');
  if (source.includes(patched)) continue;
  if (!source.includes(original)) {
    throw new Error(`Unexpected query-string source at ${parserFile}`);
  }
  fs.writeFileSync(parserFile, source.replace(original, patched));
}
