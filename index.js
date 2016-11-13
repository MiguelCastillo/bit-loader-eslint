var eslint = require("eslint");

var defaults = {
  extensions: ["js"],
  ignores: {
    path: /\/node_modules\//
  }
};

function buildPlugin(options, builder) {
  var settings = options || {};

  var eslintCLI = new eslint.CLIEngine(settings.options);
  var formatter = eslintCLI.getFormatter(settings.formatter);

  function pretransform(meta, context) {
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
      context.getLogger("eslint").warn(formatter(results));
    }

    if (settings.exitOnError === true && eslint.CLIEngine.getErrorResults(results).length) {
      return Promise.reject("linting errors");
    }
  }

  return builder
    .configure(defaults)
    .configure({
      pretransform: pretransform
    })
    .configure(settings);
}

module.exports = function factory(options) {
  return function(builder) {
    return buildPlugin(options, builder);
  };
};
