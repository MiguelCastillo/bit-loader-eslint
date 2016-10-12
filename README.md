# bit-eslint
[eslint](http://eslint.org) plugin for linting you JavaScript assets in bit-bundler.

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

You can specify an eslint formatter:

> Other formatters are available [here](http://eslint.org/docs/developer-guide/nodejs-api#getformatter)

``` javascript
eslintPlugin({
  formatter: "compact"
});
```

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
