export default{
    Crypto(id,pass){
        var crypto= require('crypto');
        var cipher= crypto.createCipher('aes256', id);
        return cipher.update(pass, 'ascii', 'hex')+ cipher.final('hex');
    },
    Decrpyto(id, pass){
        var crypto= require('crypto');
        var decipher= crypto.createDecipher('aes256', id);
        return decipher.update(pass, 'hex', 'ascii')+decipher.final('ascii');
    }
}
