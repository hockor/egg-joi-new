
'use strict';
const Joi = require('@hapi/joi');
const zh_cn = require('../zh-cn')

module.exports = {

  validate(schema, data, options, autoThrow) {
    if (!schema || !Joi.isSchema(schema)) {
      this.throw(422, 'Schema is missing');
    }
    if (typeof data === 'boolean') {
      autoThrow = data;
      data = null;
      options = null;
    }
    if (typeof options === 'boolean') {
      autoThrow = options;
      options = null;
    }

    data = data || this.request.body;
    const config = this.app.config || {};
    let message = {
      messages: zh_cn
    }
    if(config.joi.locale && config.joi.locale['zh-cn'] === false) {
      message = {}
    }

    let _autoThrow = true;
    if (typeof autoThrow === 'boolean') {
      _autoThrow = autoThrow;
    } else if (config.joi && typeof config.joi.throw === 'boolean') {
      _autoThrow = config.joi.throw;
    }

    let { error, value } =schema.validate(data,message)

    if (_autoThrow && error) {
      if (typeof config.joi.throwHandle === 'function') {
        error = config.joi.throwHandle(error);
      }
      this.throw(422, error);
    }

    if (error && typeof config.joi.errorHandle === 'function') {
      error = config.joi.errorHandle(error);
    }

    let result = { error, value };

    if (typeof config.joi.resultHandle === 'function') {
      result = config.joi.resultHandle(result);
    }
    return result;
  },
};
