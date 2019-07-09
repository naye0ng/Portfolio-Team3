export default{
    Crypto(id,pass){
        console.log("here : "+pass);
        var crypto= require('crypto');
        var cipher= crypto.createCipher('aes256', id);
        cipher.update(pass, 'ascii', 'hex');
        return cipher.final('hex');
    }
}
