module.exports = function (grunt) {
    const imageminPngquant = require('imagemin-pngquant');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            assets: ['dist/assets/'],
            pngimg: ['dist/assets/img/**/*.png'],
        },
        copy: {
            icons: {
                expand: true,
                cwd: 'src/assets/icons/',
                src: '**',
                dest: 'dist/assets/icons/',
            },
            css: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css', '!*main.css'],
                dest: 'dist/css/',
            }
        },
        // =======================================
        concat: {
            jsmain: {
                src: ['src/js/parts/*.js'],
                dest: 'src/js/main.js',
            },
            jsdist: {
                src: ['src/js/libs/*.js', 'src/js/main.js'],
                dest: 'dist/js/script.js',
            },
            css: {
                src: ['src/css/*.css'],
                dest: 'dist/css/style.css',
            },
        },
        uglify: {
            target: {
                options: {
                    beautify: true,
                    // mangle: false // prevent changes to variable and function names
                    mangle: {
                        reserved: ['jQuery']
                    }
                },
                files: {
                    'dist/js/script.min.js': ['dist/js/script.js']
                }
            }
        },
        jshint: {
            beforeconcat: ['src/js/parts/**/*.js'],
            afterconcat: ['dist/js/script.min.js']
        },
        // =======================================
        sass: {
            target: {
                options: {
                    style: 'compress',
                },
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['**/*.scss'],
                    dest: 'src/css/',
                    ext: '.css',
                }, ],
            },
        },
        postcss: {
            options: {
                // remove: false,
                processors: [
                    require('pixrem')({
                        atrules: true
                    }),
                    require('autoprefixer')({
                        grid: 'autoplace',
                    })
                ],
            },
            target: {
                src: 'dist/css/*.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css',
                }, ],
            },
        },
        // =======================================
        responsive_images: {
            options: {
                engine: 'im',
                newFilesOnly: true,
                verbose: true,
                quality: 70,
                density: 72,
                sizes: [{
                        name: 'sm',
                        width: 500
                    },
                    {
                        name: 'sm',
                        width: 500 * 2,
                        suffix: '_2x',
                    },
                    {
                        name: 'md',
                        width: 1000
                    },
                    {
                        name: 'md',
                        width: 1000 * 2,
                        suffix: '_2x',
                        // quality: 70
                    },
                    {
                        name: 'lg',
                        width: 2000
                    },
                    {
                        name: 'lg',
                        width: 2000 * 2,
                        suffix: '_2x',
                        // quality: 70
                    },
                    {
                        name: 'big',
                        width: 1600,
                        // quality: 70,
                    },
                    {
                        name: 'big',
                        width: 1600 * 2,
                        suffix: '_2x',
                        // quality: 70,
                    },
                ],
            },
            files: {
                expand: true,
                cwd: 'src/assets/',
                src: ['**/*.{jpg,jpeg}'],
                dest: 'dist/assets/',
            },
        },
        imagemin: {
            png: {
                options: {
                    quality: [0.3, 0.6],
                    use: [imageminPngquant()] // Example plugin usage
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/img/',
                    src: ['**/*.png'],
                    dest: 'dist/assets/img/'
                }]
            }
        },
        // =======================================
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html'],
                    dest: 'dist',
                }, ],
            },
        },
        // =======================================
        watch: {
            html: {
                files: ['src/*.html'],
                tasks: ['htmlmin']
            },
            css: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass', 'concat:css', 'postcss', 'cssmin']
            },
/*             cssdirect: {
                files: ['src/css/*.css', '!*main.css'],
                tasks: ['copy:css', 'postcss', 'cssmin']
            }, */
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['jshint:beforeconcat', 'concat:jsmain', 'concat:jsdist', 'uglify']
            },

        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('css', ['sass', 'concat:css', 'postcss', 'cssmin']);
    grunt.registerTask('cssdirect', ['copy:css', 'postcss', 'cssmin']);
    grunt.registerTask('js', ['jshint:beforeconcat', 'concat:jsmain', 'concat:jsdist', 'uglify']);
    // , 'jshint:afterconcat'
    grunt.registerTask('img', ['clean:assets', 'copy:icons', 'imagemin', 'responsive_images']);
    grunt.registerTask('imgmin:png', ['clean:pngimg', 'imagemin']);

    grunt.registerTask('default', ['htmlmin', 'sass', 'concat:css', 'postcss', 'cssmin', 'jshint:beforeconcat', 'concat:jsmain', 'concat:jsdist', 'uglify', 'jshint:afterconcat', 'clean:assets', 'copy:icons', 'imagemin', 'responsive_images']);
}