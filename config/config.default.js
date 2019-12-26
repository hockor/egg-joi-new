'use strict';

/**
 * egg-joi-new default config
 * @member Config#joi
 * @property {String} SOME_KEY - some description
 */
exports.joi = {
  options: {},
  locale: {
    'zh-cn': true,  // if you don't need  error message with chinese ,you can set to false
  },
  throw: true, // throw error when capture exception
  throwHandle: error => { // when throw is true the error message format
    return error;
  },
  errorHandle: error => { // when throw is false the error message format
    return error;
  },
  resultHandle: result => { // fromat result
    return result;
  },
};
