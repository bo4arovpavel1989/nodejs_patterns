const fs = require('fs');
const cache = {};

function inconsistentRead (filename) {
  if (!cache[filename]) {
    cache[filename] = fs.readFileSync(filename, 'utf8');
  }

  return cache[filename]
}

function createFileReader (filename, listeners) {
  listeners = listeners || [];

  let value = inconsistentRead(filename);

  listeners.forEach(listener => listener(value))
}

createFileReader('data.txt', [console.log]);
