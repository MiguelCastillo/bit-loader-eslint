var PluginBuilder = require("bit-plugin-builder");
var eslint = require("eslint");

var defaults = {
  extensions: ["js"],
  ignores: {
    path: /\/node_modules\//
  }
};

function factory(options) {
  var settings = options || {};

  var eslintCLI = new eslint.CLIEngine(settings.options);
  var formatter = eslintCLI.getFormatter(settings.formatter);

  function pretransform(meta) {
    // var config = eslintCLI.getConfigForFile(meta.path);
    // var messages = eslint.linter.verify(meta.source, config);
    var messages = eslintCLI.executeOnText(meta.source, meta.path).results[0].messages;

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
      pretransform: pretransform
    })
    .configure(settings)
    .build();
}

module.exports = factory;
