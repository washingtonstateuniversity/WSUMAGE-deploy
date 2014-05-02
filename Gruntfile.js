module.exports = function(grunt) {
	var secret=grunt.file.readJSON('secret.json');
	var privateKey=grunt.file.read(secret.privateKey);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		secret: grunt.file.readJSON('secret.json'),	  
		privateKey:'<%= secret.host %>',
		sshexec: {
			test: {
				command: 'touch testfile.txt',
				options: {
					host: '<%= secret.host %>',
					username: '<%= secret.username %>',
					privateKey: privateKey
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-ssh');
	grunt.registerTask('default', ['sshexec:test']);

	grunt.registerTask('test', ['sshexec:test']);
	grunt.registerTask('deploy', ['sshexec:test']);
	
};


