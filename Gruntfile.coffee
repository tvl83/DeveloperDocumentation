module.exports = (grunt) ->
  gruntConfig =
    config:
      src: 'src'
      dist: 'build'
      content: 'src/content'
      layouts: 'src/layouts'

    # import Sphero.js docs
    execute:
      target: {
        src: ['bin/import-sphero-js']
      }

    assemble:
      # general options and defaults
      options:
        assets: '<%= config.dist %>/assets'
        expand: true
        ext: '.html'
        layoutdir: '<%= config.src %>/layouts'
        layout: 'docs.hbs'
        partials: [
          'src/content/partials/*.html',
          'src/content/partials/sdk-documentation/*.md',
          'src/content/imports/sphero-js/**/*.md'
        ]
        plugins: [
          'assemble-contrib-permalinks',
          'plugins/verbose/verbose.js'
        ]
        permalinks:
          structure: ':basename/index:ext'

      docs:
        files: [
          {
            expand: true,
            cwd: '<%= config.content %>/api-reference'
            src: ['*.html', '*.md']
            dest: '<%= config.dist %>/api-reference'
          },
          {
            expand: true,
            cwd: '<%= config.content %>/sdk'
            src: ['*.html', '*.md']
            dest: '<%= config.dist %>/sdk'
          },
          {
            expand: true,
            cwd: '<%= config.content %>/sphero-robot-basics'
            src: ['*.html', '*.md']
            dest: '<%= config.dist %>/sphero-robot-basics'
          },
          {
            expand: true,
            cwd: '<%= config.content %>/sprk-edu'
            src: ['*.html', '*.md']
            dest: '<%= config.dist %>/sprk-edu'
          }
        ]

    clean:
      dest: ['<%= config.dist %>/**']

    copy:
      assets:
        expand: true
        dest: '<%= config.dist %>/assets/'
        cwd: '<%= config.src %>/assets/'
        src: '**'

    watch:
      content:
        files: ['<%= config.content %>/**/*.*', '<%= config.layouts %>/*.hbs']
        tasks: ['build']

      stylesheets:
        files: ['<%= config.src %>/stylesheets/*.less']
        tasks: ['less']

      assets:
        files: ['<%= config.src %>/assets/**']
        tasks: ['copy']

      livereload:
        options:
          livereload: '<%= connect.options.livereload %>'

        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]

    connect:
      options:
        port: 9000
        livereload: 35729
        hostname: 'localhost'

      livereload:
        options:
          open: true
          base: ['<%= config.dist %>']

    coffeelint:
      grunt: ['Gruntfile.coffee']

    less:
      docs:
        files:
          '<%= config.dist %>/assets/css/style.css':
            '<%= config.src %>/stylesheets/style.less'

    compress:
      main:
        options:
          archive: 'docs.zip'

        files: [{
          expand: true
          cwd: '<%= config.dist %>/'
          src: ['**']
        }]

    rename:
      main:
        dest: '<%= config.dist %>/assets/docs.zip'
        src: 'docs.zip'

    replace:
      index:
        src: ['<%= config.dist %>/index.html']
        overwrite: true
        replacements: [{
          from: '../'
          to: ''
        }]
      tags:
        src: 'views/getting-started-ios/index.ejs'
        overwrite: true
        replacements: [{
          from: '&lt;%=',
          to: '<%='
        },{
          from: '%&gt;',
          to: '%>'
        }]

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-execute'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-rename'
  grunt.loadNpmTasks 'grunt-text-replace'

  grunt.registerTask 'build', [
    'execute',
    'test',
    'clean',
    'assemble',
    'less',
    'copy',
    'replace'
  ]
  grunt.registerTask 'server', ['build', 'connect:livereload', 'watch']
  grunt.registerTask 'archive', ['compress', 'rename']
  grunt.registerTask 'deploy', ['build', 'archive']
  grunt.registerTask 'test', ['coffeelint']
  grunt.registerTask 'heroku', ['deploy']
