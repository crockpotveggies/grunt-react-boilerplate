module.exports = function (grunt) {
    grunt.initConfig({
        browserify: {
            options: {
				// use grunt-react to transform JSX content on the fly when building
                transform: [require('grunt-react').browserify],
				// create source maps
                debug: false
            },
            app: {
				// main entry point for application
                src: './js/src/main.js',
				// destination output file for build
                dest: './js/build/app.js'
            }
        },
        concat: {
            js: {
                src: [
                    './js/lib/underscore-min.js',
                    './js/lib/react-with-addons.min.js',
                    './js/lib/jquery.min.js',
                    './js/lib/bootstrap.min.js',
                    './js/lib/backbone.min.js',
                    './js/build/app.js'
                ],
                dest: 'dist/all.js'
            },
            css: {
                src: 'css/*.css',
                dest: 'dist/all.css'
          }
        },
        uglify: {
            dist: {
                files: {
                    'dist/all.min.js': ['dist/all.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/all.min.css': ['dist/all.css']
                }
            }
        },
        watch: {
            files: ['./js/src/*'],
            tasks: ['build']
        },
        connect: {
            server: {
                options: {
                    port: 3000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['build', 'connect:server', 'watch']);
    grunt.registerTask('build', ['browserify:app','concat','uglify','cssmin']);
    grunt.registerTask('serve', ['connect:server']);
};