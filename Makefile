all:
	grunt --config ./tire/grunt.js && grunt

test:
	node server.js
	
.PHONY: all test