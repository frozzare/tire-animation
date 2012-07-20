# Tire animation plugin

Animation is not a core feature in tire so let's provide plugin to tire with animation features. No stable version yet.

## Build

Be sure to checkout `tire` via submodule before you build or it will fail.

```sh
git submodule init
git submodule update
````

Then you can build it via `grunt`.

```sh
npm install -g grunt
make
```

On Windows

```sh
npm install -g grunt
grunt.cmd --config ./tire/grunt.js && grunt.cmd
```