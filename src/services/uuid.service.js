import cryptoRandomString from 'crypto-random-string';

export const generateUUID = () => {
  return cryptoRandomString({ length: 32, type: 'url-safe' });
};