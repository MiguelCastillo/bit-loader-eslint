var eslint = require("eslint");

var defaults = {
  extensions: ["js"],
  ignores: {
    path: /\/node_modules\//
  }
};

function buildPlugin(options, builder) {
  var settings = options || {};
  eslint = settings.eslint || eslint;

  var eslintCLI = new eslint.CLIEngine(settings.options);
  var formatter = eslintCLI.getFormatter(settings.formatter);

  function postfetch(meta, context) {
    var lintResults = eslintCLI.executeOnText(meta.source, meta.path).results;
    var hasMessages = lintResults.length && lintResults[0].messages.length;

    if (!hasMessages) {
      return;
    }

    context.getLogger("eslint").warn(formatter(lintResults));

    if (settings.exitOnError && eslint.CLIEngine.getErrorResults(lintResults).length) {
      return Promise.reject("linting errors");
    }
  }

  return builder
    .configure(defaults)
    .configure({
      postfetch: postfetch
    })
    .configure(settings);
}

module.exports = function factory(options) {
  return function(builder) {
    return buildPlugin(options, builder);
  };
};
