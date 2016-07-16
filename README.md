# bit-eslint
eslint plugin for bit-loader

This plugin facilitates linting your source files with [eslint](http://eslint.org).

## Install

```
$ npm install --save bit-eslint
```

## bit-bundler

Sample configuration for bit-bundler

``` javascript
var Bitbundler = require("bit-bundler");
var jsPlugin = require("bit-loader-js");
var eslintPlugin = require("bit-eslint");

var bitbundler = new Bitbundler({
  loader: {
    plugins: [
      eslintPlugin(),
      jsPlugin()
    ]
  }
});

bitbundler.bundle([{
  src: "browser.js",
  dest: "dist/<%= pkg.name %>.js"
}]);
```

## Options

You can specify options for bit-loader as well as the eslint formatter by passing in an object into the plugin.

For example, you can specify the formatter by specifying the `formatter` string option:

> Other formatters are available [here](http://eslint.org/docs/developer-guide/nodejs-api#getformatter)

``` javascript
eslintPlugin({
  formatter: "compact",
  extensions: ["js", "jsx"]
});
```

## ESLint options

You can also provide [eslint](http://eslint.org) specific options.

> List of [eslint options](http://eslint.org/docs/developer-guide/nodejs-api#cliengine).

``` javascript
eslintPlugin({
  options: {
    useEslintrc: false
  }
})
```

## License

Licensed under MIT
