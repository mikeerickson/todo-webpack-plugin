# todo-webpack-plugin

Brought to you by [codedungeon](http://www.codedungeon.io)

npm link [https://www.npmjs.com/package/todo-webpack-plugin](https://www.npmjs.com/package/todo-webpack-plugin)

## Overview

Webpack Plugin to generate TODO report (markdown, json, xml or text format) and optionally to `stdout` (console)

## Getting Started

1. Install plugin

    `$ npm i -D todo-webpack-plugin`

2. Import plugin into webpack.config.js

    `var TodoWebpackPlugin = require('todo-webpack-plugin');`

    or ES6

    `import TodoWebpackPlugin from 'todo-webpack-plugin'`

3. Add plugin to plugin section of `webpack.config.js`

    ```javascript

    // configure plugin to send output to console in addition to default file
    plugins: [
      new TodoWebpackPlugin({
        console:  true,
      })
    ]

    // configure plugin to create output file
    plugins: [
      new TodoWebpackPlugin({
        console:  true,
        // tags:              ['error','info'], // default will be TODO, FIXME
        // reporter:          'json',           // default `markdown`
        // filename:          'todo.json',      // default `TODO.md`
        // skipUnsupported:   true,             // skip unsupported files
        // suppressFileOutput false,            // suppress file output to disk
        // relativeFilePath   true ,            // display relative file paths
        // withInlineFiles    false ,           // support inline js (ie Vue)

      })
    ]
    ```

## Plugin Options

```bash
variable        type          default          description
===========================================================================================
tags               array      todo, fixme      list of optional objects to watch
reporter           string     markdown         markdown | xml      | json      | text
filename           string     TODO.md          TODO.md  | todo.xml | todo.json | todo.txt
console            boolean    true             output report to console ( true | false )
skipUnsupported    boolean    true             skip unsupported files ( true | false )
suppressFileOutput boolean    false            suppress output file to disk
relativeFilePaths  boolean    true             display relative file paths ( true | false )
```

## Things To Know

These are some things I figured you should know (this will be expanded)

- Plugin ignores `node_modules` globally (ala ESLint)

- Plugin uses [leasot](https://github.com/pgilad/leasot) internally

- Project inspired by [gulp-todo](https://www.npmjs.com/package/gulp-todo)

- you can run tests (note: tests incomplete at the moment, just placeholder)
  `$ npm test`

- you can run linting
  `$ npm run lint`

## Credits

todo-webpack-plugin written by Mike Erickson

E-Mail: [codedungeon@gmail.com](mailto:codedungeon@gmail.com)

Twitter: [@codedungeon](http://twitter.com/codedungeon)

Website: [codedungeon.io](http://codedungeon.io)
