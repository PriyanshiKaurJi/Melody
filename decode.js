const bytenode = require('bytenode');
const fs = require('fs');
const path = require('path');

// Path to your compiled .jsc file
const compiledFilePath = './.mitski-obf.jsc';

// Path for the decompiled JavaScript
const outputFilePath = './deco.decom-mitski.js';

try {
  // Decompile the file
  bytenode.decompile(compiledFilePath, outputFilePath);
  console.log(`Successfully decompiled to ${outputFilePath}`);
} catch (error) {
  console.error('Error during decompilation:', error);
}
