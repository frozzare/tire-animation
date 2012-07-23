/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    concat: {
      dist: {
        src: ['tire/dist/tire.js', 'src/header.js', 'src/base.js', 'src/fx/easing.js', 'src/fx/color.js', 'src/fx/animate.js', 'src/footer.js'],
        dest: 'dist/tire.js'
      }
    },
    min: {
      "dist/tire.min.js": ["dist/tire.js"]
    },
    lint: {
      files: ['dist/tire.js']
    },
    watch: {
      files: '<config:dist.files>',
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
  
  grunt.registerMultiTask('concat', 'Fix indent for files', function () {
    var src = ''
      , dest = this.file.dest;
      
    grunt.file.expandFiles(this.file.src).forEach(function (file) {      
      if (file.indexOf('header') !== -1 || file.indexOf('footer') !== -1) {
        src += grunt.file.read(file) + '\n';
      } else {
        var lines = grunt.file.read(file).split('\n');
        lines.forEach(function (line) {
          src += '  ' + line + '\n';
        });
      }
      grunt.file.write(dest, src);
    });
    
    grunt.log.writeln('File "' + dest + '" created.');
  });

  grunt.registerTask('default', 'concat min');
};