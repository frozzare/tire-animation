/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    concat: {
      dist: {
        src: ['tire/dist/tire.js', 'src/header.js', 'src/base.js', 'src/footer.js'],
        dest: 'dist/tire.js'
      }
    },
    min: {
      "dist/tire.min.js": ["dist/tire.js"]
    },
    lint: {
      files: ['src/header.js', 'src/base.js', 'src/footer.js']
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
  
  grunt.registerMultiTask('concat', 'Fix indent for files', function () {
    var src = ''
      , dest = this.file.dest
      , banner = grunt.task.directive(this.file.src[0], function() { return null; });
  
    src += banner;
    
    this.file.src.shift();
      
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