module.exports = function(grunt) {
  grunt.file.mkdir('build');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          { src:'src/analytics.js', dest:'build/analytics.js' },
          { src:'src/purchase.js', dest:'build/purchase.js' }
        ]
      }
    },

    uglify: {
      source: {
        files: {
          'build/analytics.min.js': ['src/analytics.js'],
          'build/purchase.min.js': ['src/purchase.js']
        }
      }
    },

    watch: {
      source: {
        files: ['src/**/*.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    },

    jshint: {
      options: {
        globals: (function(){
          var globals = {
            define: true,
            jQuery: true,
            WURFL: true
          };

          if (process.env.ENV !== 'production') {
            globals.console = true;
          };

          return globals;
        })(),
        trailing: true,
        curly: true,
        undef: true,
        unused: true,
        browser: true,
        es3: true
      },

      validate: {
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'Changelog.md'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },

    changelog: {
      options: {
        dest: 'Changelog.md'
      }
    },

    s3: {
      options: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: 'cdn.getchute.com',
        access: 'public-read'
      },
      deploy: {
        upload: [{
          src: 'build/*',
          dest: 'js/analytics/<%= pkg.version %>',
          options: {
            gzip: true,
            headers: {
              'Cache-Control': 'max-age=900, must-revalidate'
            }
          }
        }]
      },
      major: {
        upload: [{
          src: 'build/*',
          dest: 'js/analytics/<%= pkg.version.split(".")[0] %>',
          options: {
            gzip: true,
            headers: {
              'Cache-Control': 'max-age=900, must-revalidate'
            }
          }
        }]
      }
    },

    invalidate_cloudfront: {
      options: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        distribution: process.env.CF_DISTR
      },
      deploy: {
        files: [{
          expand: true,
          cwd: './build/',
          src: ['**/*'],
          filter: 'isFile',
          dest: 'js/analytics/<%= pkg.version %>'
        }]
      },
      major: {
        files: [{
          expand: true,
          cwd: './build/',
          src: ['**/*'],
          filter: 'isFile',
          dest: 'js/analytics/<%= pkg.version.split(".")[0] %>'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-invalidate-cloudfront');

  grunt.registerTask('build', ['jshint', 'uglify', 'copy']);
  grunt.registerTask('deploy', ['build', 's3', 'invalidate_cloudfront']);

};
