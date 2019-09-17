var encrypt = require('encryptjs');

module.exports.decipher;

function decryptPassword() {
	var decipher='';
	var secretkey = 'ios';
	decipher = encrypt.decrypt("wqoBHBobcH5dw5TDhDopdDjCrmQ=", secretkey, 256);
	if (decipher != null) {
		return decipher;
	} else {
		console.log("The decrypted password is null");
		return false;
	}

}
module.exports
		 =new decryptPassword();		
