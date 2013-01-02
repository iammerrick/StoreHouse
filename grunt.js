/*global module:false*/
module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-rigger');
  
  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'build/StoreHouse.js', 'test/StoreHouseTest.js']
    },
    watch: {
      files: 'src/**/*.js',
      tasks: 'build'
    },
    rig: {
      build: {
        src: ['src/wrapper.js'],
        dest: 'build/StoreHouse.js'
      }
    },
    min: {
      dist: {
        src: ['build/StoreHouse.js'],
        dest: 'build/StoreHouse.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        strict: false,
        browser: true
      },
      globals: {
        it: true,
        expect: true,
        beforeEach: true,
        describe: true,
        StoreHouse: true,
        _: true,
        Backbone: true,
        define: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'build');
  
  grunt.registerTask('build', 'rig:build lint min');
};
