describe('angularjs homepage todo list',function() {
			var obj=require("./Elementbasic.js");
			var data=require("./TestData.js");
			var login=require("./Login.js");
			
			
beforeEach(function() {  //URL Execution 
				obj.getURL();
				
			});


it('Test case functionality', function() {   //Functionality Execution 
				obj.username.sendKeys(data.datadrive.firstname);
				obj.password.sendKeys('password');//single data & Parameters data sets
				obj.model.sendKeys('angular');
				obj.button.click();
				obj.scope.click();

			});

afterEach(function() {
	console.log("Testing1 is completed"); // For Screen Shot
	
});
			
});


