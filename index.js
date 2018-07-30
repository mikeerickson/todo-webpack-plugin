/* global require, module */

const path   = require('path');
const fs     = require('fs');
const leasot = require('leasot');
const slash  = require('slash');

const DEFAULT_OPTIONS = {
  console:            true,       // default true
  tags:               [],         // default TODO
  reporter:           'markdown', // default markdown
  reporterOptions:    {},         // additional reporter options
  skipUnsupported:    true,       // skip unsupported files
  suppressFileOutput: false,      // don't output to file,
  relativeFilePath:   true,       // display relative file paths in report
  withInlineFiles:    false       // parse possible inline files
};

function TodoWebpackPlugin(options) {
  this.pluginOpts = Object.assign({}, DEFAULT_OPTIONS, options);
}

TodoWebpackPlugin.prototype = {
  constructor: TodoWebpackPlugin,

  apply: function (compiler) {
    compiler.plugin('done', (compilation, callback) => {
      return reporter(this.pluginOpts, compiler._lastCompilationFileDependencies);
    });
  }
};

function reporter(options, files) {
    let todos  = [];
    let output = '';

    files.forEach(file => {
      if (/node_modules|bower_components|vendor/.test(file)) {
        return; // skip node modules
      }
      if (options.skipUnsupported) {
        if (!leasot.isExtSupported(path.extname(file))) {
          return;
        }
      }
      const todo = leasot.parse({
        ext:              path.extname(file),
        content:          fs.readFileSync(file, 'utf8'),
        fileName:         file,
        customTags:       options.tags,
        reporter:         options.reporter,
        withInlineFiles:  options.withInlineFiles
      });
      todos = todos.concat(todo);
    });

    if (options.console) {
      console.log('\n');
      output = leasot.reporter(todos, {reporter: 'table', spacing: 2});
      if (options.relativeFilePath) {
        output = relativePath(output);
      }
      console.log(output); // eslint-disable-line
      console.log('\n\n');
    }

    output = leasot.reporter(todos, Object.assign({
      reporter: options.reporter,
      spacing: 2
    }, options.reporterOptions));

  if (output.length > 0) {
      let outputFilename = options.filename || '';
      if (outputFilename.length === 0) {
        outputFilename = (options.reporter === 'markdown') ? 'TODO.md' : 'todo.' + options.reporter;
        if (options.reporter === 'table') {
          outputFilename = 'todo.txt';
        }
      }

      if (!options.suppressFileOutput) {
        if (options.relativeFilePath) {
          output = relativePath(output);
        }
        fs.writeFile(outputFilename, output, (err) => {
          if (err) throw err;
        });
      }
    }

    return true;

}

function relativePath(output) {
  const cwd = slash(process.cwd());
  output = slash(output);
  const regex = new RegExp(cwd + '/', 'g');
  output = output.replace(regex, '');
  return output;
}
module.exports = TodoWebpackPlugin;
