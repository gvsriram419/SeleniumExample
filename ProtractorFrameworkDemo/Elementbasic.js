function elements() {

	this.username = element(by.model('Auth.user.name'));
	this.password = element(by.model('Auth.user.password'));
	this.model = element(by.model('model[options.key]'));
	this.button= element(by.xpath('//div[@class="form-actions"]/button')); // state and behaviour.
	this.scope = element(by.xpath('//div[@class="ng-scope"][1]'))
	this.model1= element(by.model('first'));
	this.gobutton=element(by.id('gobutton'));
	this.textcenter= element(by.xpath("//div[@class='text-center'][1]/a"));
	this.yourname= element(by.model("yourName"));
	this.reapter1= element(by.repeater("pane in panes"));
	this.panes =  element(by.repeater("pane in panes"));
	
	this.getURL= function(){
		browser.get('http://www.way2automation.com/angularjs-protractor/registeration/#/login');
	};
	
	this.geturl= function(){
		browser.get('https://angular-templates.io/');
	};
	this.loginname=element(by.xpath('//div[@id="top-navbar-items-wrapper"]/ul/li[5]/a')); 
	this.emailid=element(by.xpath('//div[@class="form-group"][1]/input'));
	this.yourpassword= element(by.xpath('//div[@class="form-group"][2]/input'));
	this.login=element(by.className('btn btn-block primary-call-to-action-btn'));
		
	
};

var object=new elements(); //creating an object in Java Script.
module.exports=new elements();// Accesiable accross the Project.
console.log(object.searchbox);
