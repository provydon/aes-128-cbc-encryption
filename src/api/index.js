'use strict';
const Cypher = require('../utils/cypher');
const Enc = new Cypher(process.env.USER_AES_KEY, process.env.USER_IV_KEY);


// Check Api
exports.status = (req, res, next) => {
  res.status(200).json({ status: 'UP' });
};

// encrypt
exports.encrypt = (req, res, next) => {
  const dataEncrypted = Enc.encrypt(JSON.stringify(req.body));
  res.status(200).json({ data: dataEncrypted });
};


exports.decrypt = (req, res, next) => {
  const decryptedData = Enc.decrypt(req.body.encryptedString);
  const dataDecrypted = JSON.parse(decryptedData);
  res.status(200).json({ data: dataDecrypted });
}


