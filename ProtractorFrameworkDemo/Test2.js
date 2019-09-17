describe("Testing the application", function() {
	var obj=require("./Elementbasic.js");

	beforeEach(function() {
		browser.get("https://angularjs.org/");
		
	})
	
	it("loginapplication", function() {
		obj.textcenter.click();
		obj.yourname.sendKeys("This is SREERAM");
		console.log("Sreeram Next");
		test =obj.reapter1.getWebElement();
		console.log(test);
		hai = obj.panes.getLocation();
		console.log(hai);

	})
	
	afterEach(function() {
		console.log("Testing 2 is completed");
	})
	
	
})