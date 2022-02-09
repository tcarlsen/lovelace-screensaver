(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var constants = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  var API_URL = exports.API_URL = "https://api.unsplash.com";
	  var API_VERSION = exports.API_VERSION = "v1";
	  var OAUTH_AUTHORIZE_URL = exports.OAUTH_AUTHORIZE_URL = "https://unsplash.com/oauth/authorize";
	  var OAUTH_TOKEN_URL = exports.OAUTH_TOKEN_URL = "https://unsplash.com/oauth/token";
	});
	unwrapExports(constants);
	var constants_1 = constants.API_URL;
	var constants_2 = constants.API_VERSION;
	var constants_3 = constants.OAUTH_AUTHORIZE_URL;
	var constants_4 = constants.OAUTH_TOKEN_URL;

	// Copyright Joyent, Inc. and other Node contributors.
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var decode = function (qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);
	  var maxKeys = 1000;

	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr,
	        vstr,
	        k,
	        v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};

	// Copyright Joyent, Inc. and other Node contributors.

	var stringifyPrimitive = function (v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	var encode = function (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';

	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function (k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function (v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
	};

	var querystring = createCommonjsModule(function (module, exports) {

	  exports.decode = exports.parse = decode;
	  exports.encode = exports.stringify = encode;
	});
	var querystring_1 = querystring.decode;
	var querystring_2 = querystring.parse;
	var querystring_3 = querystring.encode;
	var querystring_4 = querystring.stringify;

	var formUrlencoded = createCommonjsModule(function (module) {
	  // Filename: formurlencoded.js
	  // Timestamp: 2016.01.18-15:36:37 (last modified)
	  // Author(s): Bumblehead (www.bumblehead.com), JBlashill (james@blashill.com)
	  //
	  // http://www.w3.org/TR/html5/forms.html#url-encoded-form-data
	  // input: {one:1,two:2} return: '[one]=1&[two]=2'
	  var formurlencoded = module.exports = function (data, opts) {
	    opts = typeof opts === 'object' ? opts : {};

	    function encode(value) {
	      return String(value).replace(/[^ !'()~\*]*/g, encodeURIComponent).replace(/ /g, '+').replace(/[!'()~\*]/g, function (ch) {
	        return '%' + ch.charCodeAt().toString(16).slice(-2).toUpperCase();
	      });
	    }

	    function keys(obj) {
	      var keys = Object.keys(obj);
	      return opts.sorted ? keys.sort() : keys;
	    }

	    function filterjoin(arr) {
	      return arr.filter(function (e) {
	        return e;
	      }).join('&');
	    }

	    function objnest(name, obj) {
	      return filterjoin(keys(obj).map(function (key) {
	        return nest(name + '[' + key + ']', obj[key]);
	      }));
	    }

	    function arrnest(name, arr) {
	      return filterjoin(arr.map(function (elem) {
	        return nest(name + '[]', elem);
	      }));
	    }

	    function nest(name, value) {
	      var type = typeof value,
	          f = null;

	      if (value === f) {
	        f = opts.ignorenull ? f : encode(name) + '=' + f;
	      } else if (/string|number|boolean/.test(type)) {
	        f = encode(name) + '=' + encode(value);
	      } else if (Array.isArray(value)) {
	        f = arrnest(name, value);
	      } else if (type === 'object') {
	        f = objnest(name, value);
	      }

	      return f;
	    }

	    return filterjoin(keys(data).map(function (key) {
	      return nest(key, data[key]);
	    }));
	  };
	});

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */

	var requiresPort = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;
	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	      return port !== 80;

	    case 'https':
	    case 'wss':
	      return port !== 443;

	    case 'ftp':
	      return port !== 21;

	    case 'gopher':
	      return port !== 70;

	    case 'file':
	      return false;
	  }

	  return port !== 0;
	};

	var has = Object.prototype.hasOwnProperty,
	    undef;
	/**
	 * Decode a URI encoded string.
	 *
	 * @param {String} input The URI encoded string.
	 * @returns {String|Null} The decoded string.
	 * @api private
	 */

	function decode$1(input) {
	  try {
	    return decodeURIComponent(input.replace(/\+/g, ' '));
	  } catch (e) {
	    return null;
	  }
	}
	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */


	function querystring$1(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g,
	      result = {},
	      part;

	  while (part = parser.exec(query)) {
	    var key = decode$1(part[1]),
	        value = decode$1(part[2]); //
	    // Prevent overriding of existing properties. This ensures that build-in
	    // methods like `toString` or __proto__ are not overriden by malicious
	    // querystrings.
	    //
	    // In the case if failed decoding, we want to omit the key/value pairs
	    // from the result.
	    //

	    if (key === null || value === null || key in result) continue;
	    result[key] = value;
	  }

	  return result;
	}
	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */


	function querystringify(obj, prefix) {
	  prefix = prefix || '';
	  var pairs = [],
	      value,
	      key; //
	  // Optionally prefix with a '?' if needed
	  //

	  if ('string' !== typeof prefix) prefix = '?';

	  for (key in obj) {
	    if (has.call(obj, key)) {
	      value = obj[key]; //
	      // Edge cases where we actually want to encode the value to an empty
	      // string instead of the stringified value.
	      //

	      if (!value && (value === null || value === undef || isNaN(value))) {
	        value = '';
	      }

	      key = encodeURIComponent(key);
	      value = encodeURIComponent(value); //
	      // If we failed to encode the strings, we should bail out as we don't
	      // want to add invalid strings to the query.
	      //

	      if (key === null || value === null) continue;
	      pairs.push(key + '=' + value);
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	} //
	// Expose the module.
	//


	var stringify = querystringify;
	var parse = querystring$1;
	var querystringify_1 = {
	  stringify: stringify,
	  parse: parse
	};

	var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
	    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */

	var rules = [['#', 'hash'], // Extract from the back.
	['?', 'query'], // Extract from the back.
	function sanitize(address) {
	  // Sanitize what is left of the address
	  return address.replace('\\', '/');
	}, ['/', 'pathname'], // Extract from the back.
	['@', 'auth', 1], // Extract from the front.
	[NaN, 'host', undefined, 1, 1], // Set left over value.
	[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
	[NaN, 'hostname', undefined, 1, 1] // Set left over.
	];
	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */

	var ignore = {
	  hash: 1,
	  query: 1
	};
	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @public
	 */

	function lolcation(loc) {
	  var globalVar;
	  if (typeof window !== 'undefined') globalVar = window;else if (typeof commonjsGlobal !== 'undefined') globalVar = commonjsGlobal;else if (typeof self !== 'undefined') globalVar = self;else globalVar = {};
	  var location = globalVar.location || {};
	  loc = loc || location;
	  var finaldestination = {},
	      type = typeof loc,
	      key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new Url(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new Url(loc, {});

	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	}
	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */

	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @return {ProtocolExtract} Extracted information.
	 * @private
	 */


	function extractProtocol(address) {
	  var match = protocolre.exec(address);
	  return {
	    protocol: match[1] ? match[1].toLowerCase() : '',
	    slashes: !!match[2],
	    rest: match[3]
	  };
	}
	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @private
	 */


	function resolve(relative, base) {
	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
	      i = path.length,
	      last = path[i - 1],
	      unshift = false,
	      up = 0;

	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }

	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');
	  return path.join('/');
	}
	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * It is worth noting that we should not use `URL` as class name to prevent
	 * clashes with the global URL instance that got introduced in browsers.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} [location] Location defaults for relative paths.
	 * @param {Boolean|Function} [parser] Parser for the query string.
	 * @private
	 */


	function Url(address, location, parser) {
	  if (!(this instanceof Url)) {
	    return new Url(address, location, parser);
	  }

	  var relative,
	      extracted,
	      parse,
	      instruction,
	      index,
	      key,
	      instructions = rules.slice(),
	      type = typeof location,
	      url = this,
	      i = 0; //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //

	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) parser = querystringify_1.parse;
	  location = lolcation(location); //
	  // Extract protocol information before running the instructions.
	  //

	  extracted = extractProtocol(address || '');
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest; //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //

	  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];

	    if (typeof instruction === 'function') {
	      address = instruction(address);
	      continue;
	    }

	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if (index = parse.exec(address)) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }

	    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : ''); //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //

	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  } //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //


	  if (parser) url.query = parser(url.query); //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //

	  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  } //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //


	  if (!requiresPort(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  } //
	  // Parse down the `auth` for the username and password.
	  //


	  url.username = url.password = '';

	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null'; //
	  // The href is just the compiled result.
	  //

	  url.href = url.toString();
	}
	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL} URL instance for chaining.
	 * @public
	 */


	function set(part, value, fn) {
	  var url = this;

	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || querystringify_1.parse)(value);
	      }

	      url[part] = value;
	      break;

	    case 'port':
	      url[part] = value;

	      if (!requiresPort(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname + ':' + value;
	      }

	      break;

	    case 'hostname':
	      url[part] = value;
	      if (url.port) value += ':' + url.port;
	      url.host = value;
	      break;

	    case 'host':
	      url[part] = value;

	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }

	      break;

	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;

	    case 'pathname':
	    case 'hash':
	      if (value) {
	        var char = part === 'pathname' ? '/' : '#';
	        url[part] = value.charAt(0) !== char ? char + value : value;
	      } else {
	        url[part] = value;
	      }

	      break;

	    default:
	      url[part] = value;
	  }

	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];
	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }

	  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';
	  url.href = url.toString();
	  return url;
	}
	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String} Compiled version of the URL.
	 * @public
	 */


	function toString(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = querystringify_1.stringify;
	  var query,
	      url = this,
	      protocol = url.protocol;
	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';
	  var result = protocol + (url.slashes ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':' + url.password;
	    result += '@';
	  }

	  result += url.host + url.pathname;
	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;
	  if (url.hash) result += url.hash;
	  return result;
	}

	Url.prototype = {
	  set: set,
	  toString: toString
	}; //
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//

	Url.extractProtocol = extractProtocol;
	Url.location = lolcation;
	Url.qs = querystringify_1;
	var urlParse = Url;

	var utils = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  exports.formUrlEncode = formUrlEncode;
	  exports.getUrlComponents = getUrlComponents;
	  exports.buildFetchOptions = buildFetchOptions;

	  var _formUrlencoded2 = _interopRequireDefault(formUrlencoded);

	  var _urlParse2 = _interopRequireDefault(urlParse);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function formUrlEncode(body) {
	    return (0, _formUrlencoded2.default)(body);
	  }

	  function getUrlComponents(uri) {
	    return (0, _urlParse2.default)(uri, {}, true);
	  }

	  function buildFetchOptions(options) {
	    var method = options.method,
	        query = options.query,
	        oauth = options.oauth,
	        body = options.body;
	    var url = oauth === true ? options.url : "" + this._apiUrl + options.url;

	    var headers = _extends({}, this._headers, options.headers, {
	      "Accept-Version": this._apiVersion,
	      "Authorization": this._bearerToken ? "Bearer " + this._bearerToken : "Client-ID " + this._accessKey
	    });

	    var timeout = this._timeout;

	    if (body) {
	      headers["Content-Type"] = "application/x-www-form-urlencoded";
	    }

	    if (query) {
	      url = decodeURIComponent(url + "?" + (0, querystring.stringify)(query));
	    }

	    return {
	      url: url,
	      options: {
	        method: method,
	        headers: headers,
	        timeout: timeout,
	        body: method !== "GET" && body ? formUrlEncode(body) : undefined
	      }
	    };
	  }
	});
	unwrapExports(utils);
	var utils_1 = utils.formUrlEncode;
	var utils_2 = utils.getUrlComponents;
	var utils_3 = utils.buildFetchOptions;

	var auth_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = auth;

	  var _querystring2 = _interopRequireDefault(querystring);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function auth() {
	    var _this = this;

	    return {
	      getAuthenticationUrl: function getAuthenticationUrl() {
	        var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["public"];

	        var querystrings = _querystring2.default.stringify({
	          client_id: _this._accessKey,
	          redirect_uri: _this._callbackUrl,
	          response_type: "code",
	          scope: scope.length > 1 ? scope.join("+") : scope.toString()
	        });

	        return decodeURIComponent(constants.OAUTH_AUTHORIZE_URL + "?" + querystrings);
	      },
	      userAuthentication: function userAuthentication(code) {
	        var url = constants.OAUTH_TOKEN_URL;
	        return _this.request({
	          url: url,
	          method: "POST",
	          body: {
	            client_id: _this._accessKey,
	            client_secret: _this._secret,
	            redirect_uri: _this._callbackUrl,
	            grant_type: "authorization_code",
	            code: code
	          },
	          oauth: true
	        });
	      },
	      setBearerToken: function setBearerToken(accessToken) {
	        if (accessToken) {
	          _this._bearerToken = accessToken;
	        }
	      }
	    };
	  }
	});
	unwrapExports(auth_1);

	var currentUser_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = currentUser;

	  function currentUser() {
	    var _this = this;

	    return {
	      profile: function profile() {
	        var url = "/me";
	        return _this.request({
	          url: url,
	          method: "GET"
	        });
	      },
	      updateProfile: function updateProfile(options) {
	        var endpointUrl = "/me";
	        var username = options.username,
	            firstName = options.firstName,
	            lastName = options.lastName,
	            email = options.email,
	            url = options.url,
	            location = options.location,
	            bio = options.bio,
	            instagramUsername = options.instagramUsername;
	        var body = {
	          username: username,
	          first_name: firstName,
	          last_name: lastName,
	          email: email,
	          url: url,
	          location: location,
	          bio: bio,
	          instagram_username: instagramUsername
	        };
	        Object.keys(body).forEach(function (key) {
	          if (!body[key]) {
	            delete body[key];
	          }
	        });
	        return _this.request({
	          url: endpointUrl,
	          method: "PUT",
	          body: body
	        });
	      }
	    };
	  }
	});
	unwrapExports(currentUser_1);

	var users_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = users;

	  function users() {
	    var _this = this;

	    return {
	      profile: function profile(username) {
	        var url = "/users/" + username;
	        return _this.request({
	          url: url,
	          method: "GET"
	        });
	      },
	      photos: function photos(username) {
	        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	        var orderBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "latest";
	        var stats = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	        var url = "/users/" + username + "/photos";
	        var query = {
	          page: page,
	          per_page: perPage,
	          order_by: orderBy,
	          stats: stats
	        };
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      },
	      likes: function likes(username) {
	        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	        var orderBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "latest";
	        var url = "/users/" + username + "/likes";
	        var query = {
	          page: page,
	          per_page: perPage,
	          order_by: orderBy
	        };
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      },
	      collections: function collections(username) {
	        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	        var orderBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "published";
	        var url = "/users/" + username + "/collections";
	        var query = {
	          page: page,
	          per_page: perPage,
	          order_by: orderBy
	        };
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      },
	      statistics: function statistics(username) {
	        var resolution = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "days";
	        var quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
	        var url = "/users/" + username + "/statistics";
	        var query = {
	          resolution: resolution,
	          quantity: quantity
	        };
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      }
	    };
	  }
	});
	unwrapExports(users_1);

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */

	var FUNC_ERROR_TEXT = 'Expected a function';
	/** Used to stand-in for `undefined` hash values. */

	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	/** Used as references for various `Number` constants. */

	var INFINITY = 1 / 0;
	/** `Object#toString` result references. */

	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	/** Used to match property names within property paths. */

	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/,
	    reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */

	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	/** Used to match backslashes in property paths. */

	var reEscapeChar = /\\(\\)?/g;
	/** Used to detect host constructors (Safari). */

	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	/** Detect free variable `global` from Node.js. */

	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root = freeGlobal || freeSelf || Function('return this')();
	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */

	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */


	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;

	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }

	  return result;
	}
	/** Used for built-in method references. */


	var arrayProto = Array.prototype,
	    funcProto = Function.prototype,
	    objectProto = Object.prototype;
	/** Used to detect overreaching core-js shims. */

	var coreJsData = root['__core-js_shared__'];
	/** Used to detect methods masquerading as native. */

	var maskSrcKey = function () {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? 'Symbol(src)_1.' + uid : '';
	}();
	/** Used to resolve the decompiled source of functions. */


	var funcToString = funcProto.toString;
	/** Used to check objects for own properties. */

	var hasOwnProperty$1 = objectProto.hasOwnProperty;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var objectToString = objectProto.toString;
	/** Used to detect if a method is native. */

	var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	/** Built-in value references. */

	var Symbol = root.Symbol,
	    splice = arrayProto.splice;
	/* Built-in method references that are verified to be native. */

	var Map = getNative(root, 'Map'),
	    nativeCreate = getNative(Object, 'create');
	/** Used to convert symbols to primitives and strings. */

	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */


	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */


	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */


	function hashGet(key) {
	  var data = this.__data__;

	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }

	  return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
	}
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */


	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty$1.call(data, key);
	}
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */


	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
	  return this;
	} // Add methods to `Hash`.


	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */


	function listCacheClear() {
	  this.__data__ = [];
	}
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */


	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }

	  var lastIndex = data.length - 1;

	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }

	  return true;
	}
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */


	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	  return index < 0 ? undefined : data[index][1];
	}
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */


	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */


	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }

	  return this;
	} // Add methods to `ListCache`.


	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */

	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	  this.clear();

	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */


	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash(),
	    'map': new (Map || ListCache)(),
	    'string': new Hash()
	  };
	}
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */


	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */


	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */


	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */


	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	} // Add methods to `MapCache`.


	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */

	function assocIndexOf(array, key) {
	  var length = array.length;

	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }

	  return -1;
	}
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */


	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }

	  return index && index == length ? object : undefined;
	}
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */


	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }

	  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */


	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }

	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */


	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */


	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
	}
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */


	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */


	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }

	  var type = typeof value;

	  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
	    return true;
	  }

	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
	}
	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */


	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
	}
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */


	function isMasked(func) {
	  return !!maskSrcKey && maskSrcKey in func;
	}
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */


	var stringToPath = memoize(function (string) {
	  string = toString$1(string);
	  var result = [];

	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }

	  string.replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	});
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */

	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }

	  var result = value + '';
	  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
	}
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */


	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}

	    try {
	      return func + '';
	    } catch (e) {}
	  }

	  return '';
	}
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */


	function memoize(func, resolver) {
	  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  var memoized = function () {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }

	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };

	  memoized.cache = new (memoize.Cache || MapCache)();
	  return memoized;
	} // Assign cache to `_.memoize`.


	memoize.Cache = MapCache;
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */

	function eq(value, other) {
	  return value === other || value !== value && other !== other;
	}
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */


	var isArray = Array.isArray;
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */

	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */


	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */


	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */


	function isSymbol(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */


	function toString$1(value) {
	  return value == null ? '' : baseToString(value);
	}
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */


	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	var lodash_get = get;

	var photos_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = photos;

	  var _lodash2 = _interopRequireDefault(lodash_get);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function photos() {
	    var _this = this;

	    return {
	      listPhotos: function listPhotos() {
	        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	        var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	        var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "latest";
	        var url = "/photos";
	        var query = {
	          page: page,
	          per_page: perPage,
	          order_by: orderBy
	        };
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      },
	      getPhoto: function getPhoto(id) {
	        var url = "/photos/" + id;
	        return _this.request({
	          url: url,
	          method: "GET"
	        });
	      },
	      getPhotoStats: function getPhotoStats(id) {
	        var url = "/photos/" + id + "/statistics";
	        return _this.request({
	          url: url,
	          method: "GET"
	        });
	      },
	      getRandomPhoto: function getRandomPhoto() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	        var url = "/photos/random";
	        var collections = options.collections || [];
	        var query = {
	          featured: options.featured,
	          username: options.username,
	          orientation: options.orientation,
	          collections: collections.join(),
	          query: options.query,
	          c: options.cacheBuster || new Date().getTime(),
	          // Avoid ajax response caching
	          count: options.count
	        };
	        Object.keys(query).forEach(function (key) {
	          if (!query[key]) {
	            delete query[key];
	          }
	        });
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      },
	      likePhoto: function likePhoto(id) {
	        if (!_this._bearerToken) {
	          throw new Error("Requires a bearerToken to be set.");
	        }

	        var url = "/photos/" + id + "/like";
	        return _this.request({
	          url: url,
	          method: "POST"
	        });
	      },
	      unlikePhoto: function unlikePhoto(id) {
	        if (!_this._bearerToken) {
	          throw new Error("Requires a bearerToken to be set.");
	        }

	        var url = "/photos/" + id + "/like";
	        return _this.request({
	          url: url,
	          method: "DELETE"
	        });
	      },
	      downloadPhoto: function downloadPhoto(photo) {
	        var downloadLocation = (0, _lodash2.default)(photo, "links.download_location", undefined);

	        if (downloadLocation === undefined) {
	          throw new Error("Object received is not a photo. " + photo);
	        }

	        var urlComponents = (0, utils.getUrlComponents)(downloadLocation);
	        return _this.request({
	          url: urlComponents.pathname,
	          method: "GET",
	          query: urlComponents.query
	        });
	      }
	    };
	  }
	});
	unwrapExports(photos_1);

	var collections_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = collections;

	  function collections() {
	    var _this = this;

	    return {
	      listCollections: function listCollections() {
	        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	        var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	        var url = "/collections";
	        var query = {
	          page: page,
	          per_page: perPage
	        };
	        return _this.request({
	          url: url,
	          method: "GET",
	          query: query
	        });
	      },
	      getCollection: collection.bind(this),
	      getCollectionPhotos: collectionPhotos.bind(this),
	      createCollection: createUpdateCollection.bind(this, null),
	      updateCollection: createUpdateCollection.bind(this),
	      deleteCollection: function deleteCollection(id) {
	        var url = "/collections/" + id;
	        return _this.request({
	          url: url,
	          method: "DELETE"
	        });
	      },
	      addPhotoToCollection: function addPhotoToCollection(collectionId, photoId) {
	        var url = "/collections/" + collectionId + "/add";
	        return _this.request({
	          url: url,
	          method: "POST",
	          body: {
	            photo_id: photoId
	          }
	        });
	      },
	      removePhotoFromCollection: function removePhotoFromCollection(collectionId, photoId) {
	        var url = "/collections/" + collectionId + "/remove?photo_id=" + photoId;
	        return _this.request({
	          url: url,
	          method: "DELETE"
	        });
	      },
	      listRelatedCollections: function listRelatedCollections(collectionId) {
	        var url = "/collections/" + collectionId + "/related";
	        return _this.request({
	          url: url,
	          method: "GET"
	        });
	      }
	    };
	  }

	  function collection(id) {
	    return this.request({
	      url: "/collections/" + id,
	      method: "GET"
	    });
	  }

	  function collectionPhotos(id) {
	    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	    var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	    var orderBy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "latest";
	    var query = {
	      page: page,
	      per_page: perPage,
	      order_by: orderBy
	    };
	    return this.request({
	      url: "/collections/" + id + "/photos",
	      method: "GET",
	      query: query
	    });
	  }

	  function createUpdateCollection(id, title, description, isPrivate) {
	    var url = id ? "/collections/" + id : "/collections";
	    var body = {
	      title: title,
	      description: description,
	      "private": isPrivate
	    };
	    return this.request({
	      url: url,
	      method: id ? "PUT" : "POST",
	      body: body
	    });
	  }
	});
	unwrapExports(collections_1);

	var search_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = search;

	  function search() {
	    var _this = this;

	    return {
	      photos: function photos() {
	        var keyword = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	        var filters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	        var collections = filters.collections || [];
	        var query = {
	          query: encodeURIComponent(keyword),
	          per_page: perPage,
	          orientation: filters.orientation,
	          collections: collections.join(),
	          page: page
	        };
	        Object.keys(query).forEach(function (key) {
	          if (!query[key] && key != "query") {
	            delete query[key];
	          }
	        });
	        return _this.request({
	          url: "/search/photos",
	          method: "GET",
	          query: query
	        });
	      },
	      users: function users() {
	        var keyword = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	        var query = {
	          query: encodeURIComponent(keyword),
	          per_page: perPage,
	          page: page
	        };
	        return _this.request({
	          url: "/search/users",
	          method: "GET",
	          query: query
	        });
	      },
	      collections: function collections() {
	        var keyword = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	        var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	        var perPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
	        var query = {
	          query: encodeURIComponent(keyword),
	          per_page: perPage,
	          page: page
	        };
	        return _this.request({
	          url: "/search/collections",
	          method: "GET",
	          query: query
	        });
	      }
	    };
	  }
	});
	unwrapExports(search_1);

	var stats_1 = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.default = stats;

	  function stats() {
	    var _this = this;

	    return {
	      total: function total() {
	        var url = "/stats/total";
	        return _this.request({
	          url: url,
	          method: "GET"
	        });
	      }
	    };
	  }
	});
	unwrapExports(stats_1);

	var unsplash = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	      }
	    }

	    return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);
	      if (staticProps) defineProperties(Constructor, staticProps);
	      return Constructor;
	    };
	  }();

	  exports.toJson = toJson;

	  var _auth2 = _interopRequireDefault(auth_1);

	  var _currentUser2 = _interopRequireDefault(currentUser_1);

	  var _users2 = _interopRequireDefault(users_1);

	  var _photos2 = _interopRequireDefault(photos_1);

	  var _collections2 = _interopRequireDefault(collections_1);

	  var _search2 = _interopRequireDefault(search_1);

	  var _stats2 = _interopRequireDefault(stats_1);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  var Unsplash = function () {
	    function Unsplash(options) {
	      _classCallCheck(this, Unsplash);

	      this._apiUrl = options.apiUrl || constants.API_URL;
	      this._apiVersion = options.apiVersion || constants.API_VERSION;
	      this._accessKey = options.accessKey;
	      this._secret = options.secret;
	      this._callbackUrl = options.callbackUrl;
	      this._bearerToken = options.bearerToken;
	      this._headers = options.headers || {};
	      this._timeout = options.timeout || 0; // 0 defaults to the OS timeout behaviour.

	      this.auth = _auth2.default.bind(this)();
	      this.currentUser = _currentUser2.default.bind(this)();
	      this.users = _users2.default.bind(this)();
	      this.photos = _photos2.default.bind(this)();
	      this.collections = _collections2.default.bind(this)();
	      this.search = _search2.default.bind(this)();
	      this.stats = _stats2.default.bind(this)();
	    }

	    _createClass(Unsplash, [{
	      key: "request",
	      value: function request(requestOptions) {
	        var _buildFetchOptions$bi = utils.buildFetchOptions.bind(this)(requestOptions),
	            url = _buildFetchOptions$bi.url,
	            options = _buildFetchOptions$bi.options;

	        return fetch(url, options);
	      }
	    }]);

	    return Unsplash;
	  }();

	  exports.default = Unsplash;

	  function toJson(res) {
	    return typeof res.json === "function" ? res.json() : res;
	  }
	});
	var Unsplash = unwrapExports(unsplash);
	var unsplash_1 = unsplash.toJson;

	let ll = document.querySelector('home-assistant');
	ll = ll && ll.shadowRoot;
	ll = ll && ll.querySelector('home-assistant-main');
	ll = ll && ll.shadowRoot;
	ll = ll && ll.querySelector('app-drawer-layout partial-panel-resolver');
	ll = ll && ll.shadowRoot || ll;
	ll = ll && ll.querySelector('ha-panel-lovelace');
	ll = ll && ll.shadowRoot;
	ll = ll && ll.querySelector('hui-root');
	const screensaverConfig = {
	  query: 'nature',
	  idle_time: 5,
	  orientation: 'portrait',
	  ...ll.lovelace.config.screensaver
	};
	const unsplash$1 = new Unsplash({
	  accessKey: screensaverConfig.unsplash_access_key
	});
	let idleTime = 0;
	let screenSaverRunning = false;
	let images = [];
	let currentImage = 0;
	const screenSaverContainer = document.createElement('div');
	screenSaverContainer.style.position = 'absolute';
	screenSaverContainer.style.top = 0;
	screenSaverContainer.style.left = 0;
	screenSaverContainer.style.width = '100vw';
	screenSaverContainer.style.height = '100vh';
	screenSaverContainer.style.background = '#000';
	const screenSaverImageOne = document.createElement('div');
	screenSaverImageOne.style.position = 'absolute';
	screenSaverImageOne.style.top = 0;
	screenSaverImageOne.style.left = 0;
	screenSaverImageOne.style.width = '100%';
	screenSaverImageOne.style.height = '100%';
	screenSaverImageOne.style.backgroundSize = 'cover';
	screenSaverImageOne.style.opacity = 0;
	screenSaverImageOne.style.transition = 'opacity 2s ease-in-out';
	const screenSaverImageTwo = screenSaverImageOne.cloneNode(true);
	screenSaverContainer.appendChild(screenSaverImageOne);
	screenSaverContainer.appendChild(screenSaverImageTwo);
	var screenSaverTime = document.createElement('div');
	screenSaverTime.style.position = 'absolute';
	screenSaverTime.style.top = '30%';
	screenSaverTime.style.left = '50%';
	screenSaverTime.style.transform = 'translate(-50%, -50%)';
	screenSaverTime.style.fontSize = '1600%';
	screenSaverTime.style.color = 'black';
	screenSaverContainer.appendChild(screenSaverTime);

	const changeImage = function () {
	  const today = new Date();
	  let h = today.getHours();
	  let m = today.getMinutes();

	  if (screenSaverRunning) {
	    currentImage++;

	    if (currentImage === images.length) {
	      currentImage = 0;
	    }

	    if (currentImage % 2) {
	      screenSaverImageOne.style.opacity = 0;
	      screenSaverImageTwo.style.backgroundImage = `url(${images[currentImage].urls.regular})`;
	      screenSaverImageTwo.style.opacity = 1;
	    } else {
	      screenSaverImageTwo.style.opacity = 0;
	      screenSaverImageOne.style.backgroundImage = `url(${images[currentImage].urls.regular})`;
	      screenSaverImageOne.style.opacity = 1;
	    }

	    screenSaverTime.textContent = String(h).padStart(2, '0') + ":" + String(m).padStart(2, '0');
	    setTimeout(changeImage, 60000); // 30000 = 30 sekunder
	  }
	};

	const startScreenSaver = function () {
	  screenSaverRunning = true;
	  unsplash$1.search.photos(screensaverConfig.query, 1, 21, {
	    orientation: screensaverConfig.orientation
	  }).then(unsplash_1).then(json => {
	    images = json.results;
	    document.body.appendChild(screenSaverContainer);
	    changeImage();
	  });
	};

	const stopScreenSaver = function () {
	  currentImage = 0;
	  screenSaverRunning = false;
	  screenSaverContainer.remove();
	};

	window.setInterval(() => {
	  if (!screenSaverRunning) {
	    idleTime++;

	    if (idleTime >= screensaverConfig.idle_time) {
	      startScreenSaver();
	    }
	  }
	}, 60000); // 60000 = 1 minute

	window.addEventListener('click', e => {
	  idleTime = 0;

	  if (screenSaverRunning) {
	    e.preventDefault();
	    stopScreenSaver();
	  }
	});
	window.addEventListener('touchstart', e => {
	  idleTime = 0;

	  if (screenSaverRunning) {
	    e.preventDefault();
	    stopScreenSaver();
	  }
	});

}());
