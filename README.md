# egg-joi-new

- 改进自egg-joi, 使用最新版的@hapi/joi ，并且添加了中文提示支持~
- Improved from egg-joi, using the latest version of @ hapi / joi, and added Chinese hint support

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-joi-new.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-joi-new
[travis-image]: https://img.shields.io/travis/eggjs/egg-joi-new.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-joi-new
[snyk-image]: https://snyk.io/test/npm/egg-joi-new/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-joi-new
[download-image]: https://img.shields.io/npm/dm/egg-joi-new.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-joi-new
## Install

```bash

$ npm i egg-joi-new --save

```

## Usage

```js

// {app_root}/config/plugin.js
exports.joi = {
  enable: true,
  package: 'egg-joi-new',
};
```

## Configuration

```javascript

// {app_root}/config/config.default.js
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

```


## Example

`app/validator/sessions`

```js

	'use strict';
	module.exports = app => {
	    const Joi = app.Joi;
	    return {
	        login: Joi.object().keys({
	            email: Joi.string().email(),
	            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
	        })
	    }
	};
```

`app/controller/sessions`

```js

	'use strict';
	module.exports = app => {
	  class SessionsController extends app.Controller {
	    async login() {
	      this.ctx.validate(app.validator.sessions.login, this.ctx.request.body); // if get error, ctx.body will be return
	      this.body = 'hello';
	    }
	  }
	  return SessionsController;
	};	
```

## License

[ISC](LICENSE)
