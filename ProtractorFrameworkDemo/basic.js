/*Java Script Runs on node.js*/

console.log("Hello World");
// no need to bother return types,java script it
var a = 4;
var b = "hell"; // Dynamic type languaage, dynamical used by engine, var we need
// to use.it can hold any value.
console.log(a);
console.log(b);
var c = "one";

if (c == "on1e") {
	console.log("sucess");
} else {
	console.log("Faile");
}

/* Print no */

for (var i = 1; i <= 100; i=i+4) {
	console.log(i);
}

// while and do while
var j=1;
while(j<21){
	console.log("while loop");
	j++;/* condition is important*/
}

var k=100;
do{
	console.log(k);
	k++;//condition is important
}while(k<20)
	
	
//Functions module
function add(a,ab){
	
	return a+ab;
	
}
var f=add(7,7);
var g=add(7,7);
var g=add(7,7);
var g=add(7,7);
var g=add(7,7);
var g=add(7,444);
console.log(g);
console.log(f);


//Array 
var a= 7;

//object based programming.
var c= ["sree","Ram","Raju"];  //don't provide int/float, always need to provide var

for(var i=c.length-1;i>=0;i--){ //length of the string and condition for increment.
	
	console.log(c[i]+ "  is the string available in the array");
}

var name= "Rahul";

console.log(name.charAt(2));

console.log(name.indexOf("u")); //3

//substring

//start & end

console.log(name.slice(1));








	
	
	