describe('angularjs homepage todo list',function() {
			var obj=require("./Elementbasic.js");
			var data=require("./TestData.js");
			var login=require("./Login.js");
			
			
			beforeEach(function() {  //URL Execution 
				obj.getURL();
				
			});


it('Test case functionality', function() { //Functionality Execution 
				obj.loginname.click();
				obj.emailid.sendKeys(login.logindetails.username);
				obj.yourpassword.sendKeys(login.logindetails.password);
				obj.login.click();

			});

afterEach(function() {
	console.log("Testing5 is completed"); // For Screen Shot
	
});
			
});


