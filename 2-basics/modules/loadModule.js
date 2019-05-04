function loadModule (filename, module, require) {
  const wrappedSrc = `(function (module, exports, require) {
    ${fs.readFileSync(filename, 'utf8')}
  })(module, module.exports, require);`;
  eval(wrappedSrc);
}

const require = (moduleName) => {
  console.log('Require invoked for: ' + moduleName);

  const id = require.resolve(moduleName);

  if (require.cache[id]) return require.cache[id].exports;

  // module meta-data
  const module = {
    exports: {}, id
  };

  // add to cache
  require.cache[id] = module;

  // load module
  loadModule(id, module, require);

  return module.exports;
};

require.cache = {};
require.resolve = (moduleName) => {
  // извлечение полного идентификатора по имени модуля
}
