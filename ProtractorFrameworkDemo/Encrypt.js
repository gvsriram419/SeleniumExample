var encrypt=require('encryptjs');

function encryptPassword(){

	var secretkey='ios';
	var filePath="./encrypted.txt";
	encrypt.getTextEncryptAndSaveToTextFile(filePath,secretkey,256);
	
}

encryptPassword()
