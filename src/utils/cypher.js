const crypto = require('crypto');
class Cypher {
    constructor(aesKey, ivKey) {
        this.aesKey = aesKey;
        this.ivKey = ivKey;
        this.algorithm = 'aes-128-cbc';
        // this.algorithm = 'aes-256-gcm';
    }
    encrypt(dataToBeEncrypted) {
        if (typeof dataToBeEncrypted !== 'string') {
            throw new Error(
                'Cypher.encrypt: argument must be string; objects must must be stringified');
        }
        const cypher = crypto.createCipheriv(
            this.algorithm,
            Buffer.from(this.aesKey),
            this.ivKey
        );
        const encrypted = cypher.update(dataToBeEncrypted);
        const encryptedData = Buffer.concat([encrypted, cypher.final()]);
        return encryptedData.toString('hex');


        // const cipher = crypto.createCipheriv(this.algorithm, this.aesKey, this.ivKey);
        // // Hint: Larger inputs (it's GCM, after all!) should use the stream API
        // let enc = cipher.update(dataToBeEncrypted, 'utf8', 'base64');
        // enc += cipher.final('base64');
        // return [enc, this.ivKey];
    }
    decrypt(encryptedData) {
        if (typeof encryptedData !== 'string') {
            throw new Error('Cypher.decrypt error: argument must be string');
        }
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            Buffer.from(this.aesKey),
            this.ivKey
        );
        const encryptedText = Buffer.from(encryptedData, 'hex');
        const decrypted = decipher.update(encryptedText);
        const decryptedData = Buffer.concat([decrypted, decipher.final()]);
        return decryptedData.toString();

        // const decipher = crypto.createDecipheriv(this.algorithm, this.aesKey, this.ivKey);
        // let str = decipher.update(encryptedData, 'base64', 'utf8');
        // str += decipher.final('utf8');
        // return str;
    }
}

module.exports = Cypher