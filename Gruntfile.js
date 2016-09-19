module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
          separator: '\n',
          banner:   '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        dist: {
          src: [
            'js/Card.js',
            'js/Deck.js',
            'js/ElementFactory.js',
            'js/Element.js',
            'js/Select.js',
            'js/Toggle.js',
            'js/Modal.js',
            'js/Button.js',
            'js/Group.js',
            'js/Timer.js',
            'js/Overlay.js',
            'js/Counter.js',
            'js/Loader.js',
            'js/Indicator.js',
            'js/ProgressBar.js',
            'js/Quiz.js',
            'js/EventManager.js',
            'js/Config.js',
            'js/Application.js',
            'js/UI.js'
          ],
          dest: 'dist/FlashDeck.js',
        },
      },
	jshint: {

      files: [
        'dist/FlashDeck.js'
      ],
      options: {
		 jshintrc: '.jshintrc'

      }
		  
    },
	 less : {
      options : {
        banner: '/* Auto generated by LESS compiler.  Do not modify!  */ \n'
      },
      src: {
        expand: true,
        cwd: './',
        src: [
          
          'css/**/*.less'

        ],
        dest: '../',
        ext: '.css'
      }
    },
    watch: {
      files:
          [
		'<%= jshint.files %>'
          ],
      tasks:
          [
              'jshint'
			  // 'less'
          ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s) to run when we type c:\grunt.
  grunt.registerTask('default', [ 

        'concat',
		'jshint'

	]);
  
};