var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
	directConnect : true,
	//seleniumAddress : 'http://localhost:4444/wd/hub',
	specs: ['Test2.js'],
	onPrepare : function()  //Global Framework
	{
		browser.manage().window().maximize();
		jasmine.getEnv().addReporter(
		        new Jasmine2HtmlReporter({
		          savePath: 'target/screenshots'
		        })
		      ); 
	},
	//Test Suite Creation(Regression or Smoke)
	suites :
		{
		 Smoke :['Test1.js'], //'Test1.js','Test3.js',
		 Regression :['LoginAngular.js']	
		},
	// Options to be passed to Jasmine-node.
	  jasmineNodeOpts: {
	    showColors: true, // Use colors in the command line report.
	  }

};