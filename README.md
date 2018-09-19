# bit-loader-eslint

[![Greenkeeper badge](https://badges.greenkeeper.io/MiguelCastillo/bit-loader-eslint.svg)](https://greenkeeper.io/)

[eslint](http://eslint.org) plugin for bit-loader to lint your JavaScript assets.

## Install

```
$ npm install --save @bit/loader-eslint
```

## bit-bundler

Sample configuration for bit-bundler

``` javascript
var Bitbundler = require("@bit/bundler");
var jsPlugin = require("@bit/loader-js");
var eslintPlugin = require("@bit/loader-eslint");

var bitbundler = new Bitbundler({
  loader: {
    plugins: [
      eslintPlugin({
        extensions: ["js", "jsx"]
      }),
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

### `exitOnError`

Flag to exit as soon as eslint reports an error.  Defaults to false.

``` javascript
eslintPlugin({
  exitOnError: true
});
```

### `formatter`

You can specify an eslint formatter:

> Other formatters are available [here](http://eslint.org/docs/developer-guide/nodejs-api#getformatter)

``` javascript
eslintPlugin({
  formatter: "compact"
});
```

### `options`

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
