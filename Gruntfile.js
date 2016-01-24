module.exports = function(grunt) {

  var package = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: package,
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['tmp/index.html'],
          dest: 'dist/',
          filter: 'isFile'
        }],
      },
      css: {
        files: [{
            src: [
              'node_modules/bootstrap/dist/css/bootstrap.css',
              'node_modules/bootstrap/dist/css/bootstrap-theme.css',
              'src/app/styles/styles.css',
            ],
            flatten: true,
            expand: true,
            dest: 'dist/styles/',
            filter: 'isFile'
          }, {
            expand: true,
            flatten: true,
            src: [
              'node_modules/bootstrap/dist/fonts/*',
            ],
            dest: 'dist/fonts/',
            filter: 'isFile'
          }, {
            expand: true,
            flatten: true,
            src: [
              'node_modules/gmaps/gmaps.js',
              'node_modules/gmaps.core/gmaps.core.js',
              'node_modules/gmaps.markers/gmaps.markers.js'
            ],
            dest: 'dist/third-party/',
            filter: 'isFile'
          }

        ]
      }, // end css
      prehtml: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/app/**/*.html'],
          dest: 'tmp/partials/',
          filter: 'isFile'
        }]
      },
      html: {
        files: [{
          expand: true,
          flatten: true,
          src: ['tmp/*.html'],
          dest: 'dist/',
          filter: 'isFile'
        }]
      }

    }, // end copy
    clean: {
      build: {
        src: ['dist']
      },
      tmp: {
        src: ['tmp']
      },
      coverage: {
        src: ['coverage']
      }
    }, // end clean
    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        }
      },
      dist: {
        files: {
          'dist/js/app.js': [
            'src/app/app.js'
          ],
        }
      },
    }, // end browserify
    concat: {
      css: {
        src: ['src/app/**/*.css'],
        dest: 'dist/styles/project-styles.css'
      }
    },
    htmlclean: {
      options: {
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) {
          return html.replace(/\begg(s?)\b/ig, 'omelet$1');
        }
      },
      partials: {
        expand: true,
        cwd: 'tmp/partials/',
        src: '**/*.html',
        dest: 'tmp/partials/'
      },
      index: {
        expand: false,
        src: 'src/index.html',
        dest: 'tmp/index.html'
      }
    },
    ngtemplates: {
      'road-mapper': {
        cwd: 'tmp',
        src: 'partials/**/*.html',
        dest: 'dist/js/templates.js'
      }
    },
    jshint: {
      src: 'src/**/*.js',
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },
  });

  // Load the npm installed tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-htmlclean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-string-replace');


  // The default tasks to run when you type: grunt
  grunt.registerTask('default', ['clean', 'browserify', 'copy', 'htmlclean',
    'copy:html', 'concat', 'ngtemplates'
  ]);
};