const CryptoJS = require('crypto-js');

export const planeEncrypt = (originalText) => {
  const encryptedText = CryptoJS.AES.encrypt(
    originalText,
    process.env.ENCRYPTION_KEY
  ).toString();
  return encryptedText;
};

export const planeDecrypt = (encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.ENCRYPTION_KEY
  ).toString();
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

export const objectEncrypt = (originalObject) => {
  const encryptedObject = CryptoJS.AES.encrypt(
    JSON.stringify(originalObject),
    process.env.ENCRYPTION_KEY
  ).toString();
  return encryptedObject;
};

export const objectDecrypt = (encryptedObject) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedObject,
    process.env.ENCRYPTION_KEY
  ).toString();
  const originalObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return originalObject;
};
