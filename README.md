# del-dev-assets
A webpack plugin to delete some code in the development environment.

### Function
使用`angular-m-cli`在生产环境下，你需要手动删除每个页面上的`/entry/angular.dll.js`、`/vendor.__bundle.js`以及`/[filename]/main.__bundle.js`，这样降低了开发效率并且不利于自动部署。为了解决该问题，编写了此插件。

### How To Use
```
var DelDevAssets = require("del-dev-assets");
var webpackConfig = {
    ...
    plugins: [
        new DelDevAssets({
            outputPath: path.join(__dirname, "build"),
            htmlName: "index.html",
            delNames: ["angular.dll.js", "vendor.__bundle.js", "main.__bundle.js"]
        })
    ]
    ...
}
```

### End
该插件已经自动集成到了`angular-m-cli`中。
