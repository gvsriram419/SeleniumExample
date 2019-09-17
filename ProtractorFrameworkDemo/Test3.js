describe("testing a application",function(){
	var obj=require("./Elementbasic.js");
	var data=require("./data.js");
	var using = require('jasmine-data-provider');
	var d1=require("./TestData.js");
	
	
	beforeEach(function() {  
		browser.get("http://juliemr.github.io/protractor-demo/");
		
	})
	
	 using(data.DataDriver, function (data, description) {
			it("loginapplication"+description, function() {  //Functionality execution 
				obj.model1.sendKeys(data.value);
				expect(obj.gobutton.getText()).toBe(d1.datadrive.verfication);

		})
		 
	 })
	
	afterEach(function() {
		console.log("Testing 3 is completed");
		
		
	});
	

})