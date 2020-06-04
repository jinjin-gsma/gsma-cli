#!/usr/bin/env node

const yargs = require('yargs');
const ejs = require('ejs');
const fs = require('fs');
const rimraf = require('rimraf');

const PLUGIN_REPO = 'git@github.com:jinjin-gsma/plugin-boilerplate.git';

const options = yargs
 .usage('Usage: -n <plugin name> --no-webpack --no-test')
 .option('n', { alias: 'name', describe: 'Name of your plugin', type: 'string', demandOption: true })
 .option('webpack', { alias:'webpack', describe: 'disable webpack and karma tests', type: 'boolean', default: true, demandOption: false })
 .option('test', { alias:'test', describe: 'disable php unit tests', type: 'boolean', default: true, demandOption: false })
 .argv;

const greeting = `Creating ${options.name}! with webpack = ${options.webpack}, test = ${options.test} `;

console.log(greeting);

const shell = require('shelljs');
shell.exec(`git clone ${PLUGIN_REPO}`);

fs.rename('./plugin-boilerplate', `./${options.name}`, function (err) {
    if (err) throw err;
    console.log('renamed folder complete');

    fs.rename(`./${options.name}/plugin_boilerplate.php`, `./${options.name}/${options.name}.php`, function (err) {
        if (err) throw err;
        console.log('renamed file complete');
    });

    fs.rename(`./${options.name}/tests/test_plugin_boilerplate.php`, `./${options.name}/tests/test_${options.name}.php`, function (err) {
        if (err) throw err;
        console.log('renamed test file complete');
    });
});

const data = {
    pluginName: options.name,
    noWebpack: !options.webpack
};

ejs.renderFile(`./${options.name}/package.json.ejs`, data, (err, result) => {
    if (err) {
        console.log('info', 'error encountered: ' + err);
    }
    else {
        try {
            fs.writeFileSync(`./${options.name}/package.json`, result, 'utf8');
        } catch(err) {
            if (err) {
                throw err;
            }
        }
    }
});

if (!options.webpack) {
    fs.unlink(`./${options.name}/webpack.config.js`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    fs.unlink(`./${options.name}/karma.conf.js`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    rimraf(`./${options.name}/build`, () => {
        console.log('build directory Deleted!');
    });
}

if (!options.test) {
    fs.unlink(`./${options.name}/phpunit.xml.dist`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    fs.unlink(`./${options.name}/.phpcs.xml.dist`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    rimraf(`./${options.name}/tests`, () => {
        console.log('tests directory Deleted!');
    });

    rimraf(`./${options.name}/bin`, () => {
        console.log('bin directory Deleted!');
    });
}

fs.unlink(`./${options.name}/package.json.ejs`, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});