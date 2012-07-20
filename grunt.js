/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    concat: {
      dist: {
        src: ['tire/dist/tire.js', 'src/*.js'],
        dest: 'dist/tire.js'
      }
    },
    min: {
      "dist/tire.min.js": ["dist/tire.js"]
    },
    lint: {
      files: ['src/animation.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        regexdash: true,
        laxcomma: true,
        expr: true,
        eqeqeq: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true
      },
      globals: {
        tire: true,
        define: true,
        Sizzle: true,
        document: true,
        ActiveXObject: true
      }
    },
    qunit: {
      all: ['test/index.html']
    }
  });

  grunt.registerTask('default', 'concat min');
};