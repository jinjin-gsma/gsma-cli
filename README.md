## install
```
git clone git@github.com:jinjin-gsma/gsma-cli.git
cd gsma-cli
npm install -g .
```

## usage
Go to the folder where you want to create your plugin, then
```
createPlugin -n <plugin name>
```

more options
```
--no-webpack // disable webpack and karma tests
--no-test // disable php unit tests
```

## uninstall
```
npm uninstall -g gsma-cli
```

## third party libraries
- ejs https://ejs.co/
- rimraf https://www.npmjs.com/package/rimraf
- shelljs https://github.com/shelljs/shelljs
- yargs https://github.com/yargs/yargs