module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// concat: {
		//   dist: {
		//       src: ["src/a.js", "src/b.js"]
		//     , dest: "dist/app.js"
		//   }
		// }
		// uglify: {
		// 	options: {
		// 		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
		// 		mangle: true
		// 	},
		// 	build: {
		// 		files: {
		// 	  		'dist/main.min.js': ['dist/main.js'],
		// 		}
		// 	}
		// }
		sass: {                              
			dist: {                            
			  	options: {                       
			    	style: 'expanded'
			  	},
			  	files: {                         
			    	'./public/style.css': './src/sass/style.scss',      
		  		}
			}
		},
		cssmin: {
		  target: {
		    files: [{
		      expand: true,
		      cwd: './public/',
		      src: ['*.css', '!*.min.css'],
		      dest: './public/',
		      ext: '.min.css'
		    }]
		  }
		}    
	});

	// grunt.loadNpmTasks("grunt-contrib-concat");
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['sass','cssmin']);
};