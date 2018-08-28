import { Promise } from 'bluebird';
import { sign as signOrig, verify as verifyOrig } from 'signcode';

const log = require('debug')('electron-windows-installer:codesign-utils');

export const sign = Promise.promisify(signOrig);
export const verify = Promise.promisify(verifyOrig);

export function codeSign(options) {
  return sign(options)
    .then(() => log(options.path + ' is now signed'))
    .catch((error) => log('Signing failed', error.message));
}

export function verifySign(path) {
  return verify({ path })
    .then(() => log(path + ' is signed'))
    .catch((error) => log('Not signed', error.message));
}
