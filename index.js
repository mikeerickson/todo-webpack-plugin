const path   = require('path')
const fs     = require('fs')
const leasot = require('leasot')
const merge  = require('lodash/merge')

const DEFAULT_OPTIONS = {
  console:  true,       // default true
  tags:     [],         // default TODO
  reporter: 'markdown', // default markdown
}

function TodoWebpackPlugin(options) {
  this.pluginOpts = merge({}, DEFAULT_OPTIONS, options)
}

TodoWebpackPlugin.prototype = {
  constructor: TodoWebpackPlugin,

  apply: function (compiler) {
    compiler.plugin('done', (compilation, callback) => {
      return reporter(this.pluginOpts, compiler._lastCompilationFileDependencies)
    })
  }
}

function reporter(options, files) {

    var todos  = [];
    var output = '';

    files.forEach(file => {
      // skip file if it matches exclude option
      var exclude = options.exclude;
      if (exclude instanceof RegExp && exclude.test(file)) {
        return
      }

      var todo = leasot.parse({
        ext:        path.extname(file),
        content:    fs.readFileSync(file, 'utf8'),
        fileName:   file,
        customTags: options.tags,
        reporter:   options.reporter
      });
      todos = todos.concat(todo);
    })

    if (options.console) {
      output = leasot.reporter(todos, {reporter: 'table', spacing: 2});
      console.log(output); // eslint-disable-line
    }

    output = leasot.reporter(todos, {reporter: options.reporter, spacing: 2});
    if (output.length > 0) {
      var outputFilename = options.filename || ''

      if (outputFilename.length === 0) {
        outputFilename = (options.reporter === 'markdown') ? 'TODO.md' : 'todo.' + options.reporter
        if (options.reporter === 'table') {
          outputFilename = 'todo.txt'
        }
      }
      fs.writeFile(outputFilename, output, (err) => {
        if (err) throw err
      })
    }

    return true;

}
module.exports = TodoWebpackPlugin;
