#!/usr/bin/env node

const yargs = require("yargs");
const ejs = require('ejs');
const fs = require('fs');

const options = yargs
 .usage("Usage: -n <plugin name>")
 .option("n", { alias: "name", describe: "Name of your plugin", type: "string", demandOption: true })
 .argv;

const greeting = `Creating ${options.name}!`;

console.log(greeting);

const shell = require('shelljs');
shell.exec('git clone git@github.com:jinjin-gsma/plugin-boilerplate.git');

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


const data = { pluginName: options.name };

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

fs.unlink(`./${options.name}/package.json.ejs`, (err) => {
  if (err) {
    console.error(err);
    return;
  }
})