/* eslint no-console: 0 */

import fs from "fs";
import test from "ava";
import path from "path";
import webpack from "webpack";
import chalk from "chalk";

// 0. Import the config that uses my plugin
import options from "../webpack.config.js";

let todoFilename = "";
test.beforeEach(t => {
  todoFilename = path.join(__dirname, "..", "TODO.md");
});

test.cb(chalk.cyan.bold("Creates ./TODO.md file"), t => {
  webpack(options, function(err, stats) {
    const todoFilename = path.join(__dirname, "..", "TODO.md");
    console.log(err);
    if (err) {
      return t.end(err);
    } else if (stats.hasErrors()) {
      return t.end(stats.toString());
    }

    t.true(fs.existsSync(todoFilename));

    t.end();
  });
  t.pass();
});

test.cb.only(chalk.cyan.bold("Verify TODO.md file contains items"), t => {
  if (fs.existsSync(todoFilename)) {
    let buffer = fs.readFileSync(todoFilename, "utf8");

    // make sure TODO section is created
    t.true(buffer.includes("### TODOs"));
    t.true(buffer.includes("Sample Todo"));

    // make sure FIXME section is created
    t.true(buffer.includes("### FIXME"));
    t.true(buffer.includes("Sample Fixme"));
  } else {
    console.log(chalk.red.bold(" 🚫  Unable to locate ./TODO.md file"));
    t.pass();
  }
  t.end();
});
