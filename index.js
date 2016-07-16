var PluginBuilder = require("bit-plugin-builder");
var eslint = require("eslint");

var defaults = {
  extensions: ["js"],
  ignores: {
    path: /\/node_modules\//
  }
};

function factory(options) {
  options = options || {};

  var eslintVerify = eslint.linter;
  var eslintCLI = new eslint.CLIEngine(options.eslint);
  var formatter = eslintCLI.getFormatter("stylish");

  function transform(meta) {
    var config = eslintCLI.getConfigForFile(meta.path);
    var messages = eslintVerify.verify(meta.source, config);

    if (!messages.length) {
      return;
    }

    var results = [{
      filePath: meta.path,
      messages: messages
    }];

    if (results.length) {
      console.log(formatter(results));
    }

    if (eslint.CLIEngine.getErrorResults(results).length) {
      return Promise.reject("Linting errors");
    }
  }

  return PluginBuilder
    .create(defaults)
    .configure({
      transform: transform
    })
    .configure(options)
    .build();
}

module.exports = factory;
