/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 173);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16).Buffer))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(172)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["b"] = toReadableDay;
/* harmony export (immutable) */ __webpack_exports__["l"] = toReadableTime;
/* harmony export (immutable) */ __webpack_exports__["d"] = toReadableGameTime;
/* harmony export (immutable) */ __webpack_exports__["e"] = toReadableTeam;
/* harmony export (immutable) */ __webpack_exports__["f"] = toReadableDollar;
/* harmony export (immutable) */ __webpack_exports__["a"] = toReadableTeamList;
/* harmony export (immutable) */ __webpack_exports__["i"] = toReadableTeamListWithStaff;
/* harmony export (immutable) */ __webpack_exports__["h"] = readableJobList;
/* harmony export (immutable) */ __webpack_exports__["g"] = readableStaffJobList;
/* harmony export (immutable) */ __webpack_exports__["c"] = toReadableJob;
/* unused harmony export toReadablePosition */
/* harmony export (immutable) */ __webpack_exports__["k"] = toReadableStorageList;
/* unused harmony export toReadableProduct */
/* harmony export (immutable) */ __webpack_exports__["n"] = toReadableDeliverList;
/* harmony export (immutable) */ __webpack_exports__["j"] = readableProductList;
/* harmony export (immutable) */ __webpack_exports__["m"] = toReadableOrderList;


function toReadableDay(day) {
  if (day <= 0) {
    return '已結束';
  }
  return '第' + day + '天';
}

function toReadableTime(time) {
  var isWorking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var showWorking = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!isWorking || time === __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */]) {
    return __WEBPACK_IMPORTED_MODULE_0__constant__["d" /* READABLE_GAME_WORK */].OFF_WORK;
  }
  var t = parseInt(time / 1000);
  var s = t % 60;
  var m = (t - s) / 60;
  return (showWorking ? __WEBPACK_IMPORTED_MODULE_0__constant__["d" /* READABLE_GAME_WORK */].WORKING + ' ' : '') + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function toReadableGameTime(dayTime) {
  var showWorking = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  switch (dayTime.stage) {
    case __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].UNKNOWN:
    case __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].PREPARE:
    case __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].READY:
      return '尚未開始';
      break;
    case __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].FINAL:
      return '結算中';
      break;
    case __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].END:
      return '已結束';
      break;
    default:
    case __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].START:
      return toReadableDay(dayTime.day) + ' ' + toReadableTime(dayTime.time, dayTime.isWorking, showWorking);
      break;
  }
}

function toReadableTeam(team) {
  if (team === __WEBPACK_IMPORTED_MODULE_0__constant__["f" /* TEAMS */].STAFF) {
    return __WEBPACK_IMPORTED_MODULE_0__constant__["g" /* READABLE_TEAMS */].STAFF;
  }
  return '第' + team + '組';
}

function toReadableDollar(dollar) {
  return '$' + dollar;
}

function toReadableTeamList(teamNumber) {
  var list = [];
  for (var i = 1; i <= teamNumber; i++) {
    list.push({
      index: i,
      text: toReadableTeam(i)
    });
  }
  return list;
}

function toReadableTeamListWithStaff(teamNumber) {
  var list = toReadableTeamList(teamNumber);
  list.push({
    index: __WEBPACK_IMPORTED_MODULE_0__constant__["f" /* TEAMS */].STAFF,
    text: '工作人員'
  });
  return list;
}

function readableJobList() {
  var list = [];
  for (var idx in __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */]) {
    if (idx === 'UNKNOWN') {
      continue;
    }
    list.push({
      index: idx,
      text: toReadableJob(idx)
    });
  }
  return list;
}

function readableStaffJobList() {
  var list = [];
  for (var idx in __WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */]) {
    if (idx === 'UNKNOWN_STAFF') {
      continue;
    }
    list.push({
      index: idx,
      text: toReadableJob(idx)
    });
  }
  return list;
}

function toReadableJob(job) {
  return __WEBPACK_IMPORTED_MODULE_0__constant__["i" /* READABLE_JOBS */][job];
}

function toReadablePosition(position) {
  return toReadableTeam(position.team) + ' ' + toReadableJob(position.job);
}

// list as StorageList
function toReadableStorageList(list) {
  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      result.push({
        readableProduct: toReadableProduct(item.product),
        amount: item.amount
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

function toReadableProduct(product) {
  return __WEBPACK_IMPORTED_MODULE_0__constant__["j" /* READABLE_PRODUCTS */][product];
}

function toReadableDeliverList(list) {
  var result = [];
  var realAmount = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var item = _step2.value;

      realAmount = parseInt(item.amount) - realAmount;
      result.push({
        readableGameTime: toReadableGameTime(item),
        amount: realAmount
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
}

function readableProductList() {
  var list = [];
  for (var key in __WEBPACK_IMPORTED_MODULE_0__constant__["b" /* PRODUCTS */]) {
    if (key === 'UNKNOWN') {
      continue;
    } else if (key === 'WAREHOUSE') {
      break;
    }
    list.push({
      index: key,
      text: __WEBPACK_IMPORTED_MODULE_0__constant__["j" /* READABLE_PRODUCTS */][key]
    });
  }
  return list;
}

function toReadableOrderList(list) {
  var result = [];
  var realAmount = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var item = _step3.value;

      realAmount = parseInt(item.amount) - realAmount;
      result.push({
        readableGameTime: toReadableGameTime(item, false),
        amount: realAmount,
        delivered: 0
      });
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return result;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__account__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deliver__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__news__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data__ = __webpack_require__(20);
/* unused harmony export isStaffTeam */
/* unused harmony export isStaffJob */
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nowUser; });


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }










function _isStaffTeam(team) {
  return team === 0;
}

function isStaffJob(job) {
  return Object.keys(__WEBPACK_IMPORTED_MODULE_0__constant__["h" /* STAFF_JOBS */]).indexOf(job) !== -1;
}

var User = function () {
  function User() {
    _classCallCheck(this, User);

    // these are made for auto-updating time
    this.state = {
      gameId: __WEBPACK_IMPORTED_MODULE_0__constant__["k" /* GAMES */].UNKNOWN,
      teamIndex: __WEBPACK_IMPORTED_MODULE_0__constant__["f" /* TEAMS */].UNKNOWN,
      job: __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].UNKNOWN,
      gameConfig: {},
      stage: __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].UNKNOWN,
      day: __WEBPACK_IMPORTED_MODULE_0__constant__["l" /* ZERO_DAYTIME */].DAY,
      time: __WEBPACK_IMPORTED_MODULE_0__constant__["l" /* ZERO_DAYTIME */].TIME,
      isWorking: false,
      dayStartTime: __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */],
      balance: 0,
      storage: [],
      receivedOrder: [],
      orderHistory: [],
      deliverHistory: [],
      news: []
    };

    this.timer = setInterval(this._update.bind(this), 1000);

    return this;
  }

  _createClass(User, [{
    key: 'resetState',
    value: function resetState() {
      this.state = Object.assign(this.getState(), {
        gameId: __WEBPACK_IMPORTED_MODULE_0__constant__["k" /* GAMES */].UNKNOWN,
        teamIndex: __WEBPACK_IMPORTED_MODULE_0__constant__["f" /* TEAMS */].UNKNOWN,
        job: __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].UNKNOWN,
        gameConfig: {},
        stage: __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].UNKNOWN,
        day: __WEBPACK_IMPORTED_MODULE_0__constant__["l" /* ZERO_DAYTIME */].DAY,
        time: __WEBPACK_IMPORTED_MODULE_0__constant__["l" /* ZERO_DAYTIME */].TIME,
        isWorking: false,
        dayStartTime: __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */],
        balance: 0,
        storage: [],
        receivedOrder: [],
        orderHistory: [],
        deliverHistory: [],
        news: []
      });
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: 'getAccount',
    value: function getAccount() {
      return this.getState();
    }
  }, {
    key: 'getDayTime',
    value: function getDayTime() {
      return this.getState();
    }
  }, {
    key: '_update',
    value: function _update() {
      if (this.getGameId() === __WEBPACK_IMPORTED_MODULE_0__constant__["k" /* GAMES */].UNKNOWN || this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].END) {
        return;
      }

      if (this.getTeam() === __WEBPACK_IMPORTED_MODULE_0__constant__["f" /* TEAMS */].UNKNOWN || this.getJob() === __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].UNKNOWN || this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].PREPARE || this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].READY) {
        __WEBPACK_IMPORTED_MODULE_1__game__["a" /* getGameStage */](this.getGameId()).then(function (res) {
          var data = res.data;
          if (this.getGameStage() !== data.stage) {
            this.getState().stage = data.stage;
            console.log('Game Stage has been set to', data.stage);
          }
        }.bind(this)).catch(function (err) {
          console.error(err);
        });
        return;
      }

      __WEBPACK_IMPORTED_MODULE_7__data__["a" /* getUpdate */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        var _this = this;

        var data = res.data;

        // update stage
        if (this.getGameStage() !== data.stage) {
          this.getState().stage = data.stage;
          console.log('Game Stage has been set to', data.stage);
        }

        // update time
        if (this.getDay() !== data.day) {
          this.getState().day = parseInt(data.day);
          this.getState().dayStartTime = parseInt(data.dayStartTime);
          console.log('Game Day has been set to', data.day);
        }
        if (this.getTime() >= this.getGameConfig().dayLong * 1000) {
          this.dayStartTime = __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */];
          if (this.day === this.getGameConfig().days) {}
        }
        this.getState().time = this.getTime();
        this.getState().isWorking = this.isWorking();

        // update state
        if (this.getJob() !== __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].UNKNOWN && !this.isStaffTeam()) {
          // update account
          if (this.getState().balance !== data.balance) {
            this.getState().balance = data.balance;
            console.log('Balance has been set to', data.balance);
          }

          // update storage
          this.getState().storage.splice(0, this.getState().storage.length);
          for (var key in data.storage) {
            this.getState().storage.push(data.storage[key]);
          }

          var updateDeliverHistoryFromRes = function updateDeliverHistoryFromRes(deliverHistory) {
            if (_this.getState().deliverHistory.length !== deliverHistory.length) {
              _this.getState().deliverHistory.splice(0, _this.getState().deliverHistory.length);
              for (var _key in deliverHistory) {
                _this.getState().deliverHistory.push(deliverHistory[_key]);
              }
              console.log('Deliver History has been set to', deliverHistory);
            }
          };

          var updateReceivedOrderFromRes = function updateReceivedOrderFromRes(receivedOrder) {
            if (_this.getState().receivedOrder.length !== receivedOrder.length) {
              _this.getState().receivedOrder.splice(0, _this.getState().receivedOrder.length);
              for (var _key2 in receivedOrder) {
                _this.getState().receivedOrder.push(receivedOrder[_key2]);
              }
              console.log('Received Order has been set to', receivedOrder);
            }
          };

          var updateOrderHistoryFromRes = function updateOrderHistoryFromRes(orderHistory) {
            if (_this.getState().orderHistory.length !== orderHistory.length) {
              _this.getState().orderHistory.splice(0, _this.getState().orderHistory.length);
              for (var _key3 in orderHistory) {
                _this.getState().orderHistory.push(orderHistory[_key3]);
              }
              console.log('Received Order has been set to', orderHistory);
            }
          };

          var updateNewsFromRes = function updateNewsFromRes(news) {
            if (_this.getState().news.length !== news.length) {
              _this.getState().news.splice(0, _this.getState().news.length);
              for (var _key4 in news) {
                _this.getState().news.unshift(news[_key4]);
              }
              console.log('News has been set to', news);
            }
          };

          switch (this.getJob()) {
            case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].FACTORY:
              // update deliver history
              updateDeliverHistoryFromRes(data.deliverHistory);
              updateReceivedOrderFromRes(data.receivedOrder);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].WHOLESALER:
              updateDeliverHistoryFromRes(data.deliverHistory);
              updateReceivedOrderFromRes(data.receivedOrder);
              updateOrderHistoryFromRes(data.orderHistory);
              break;

            case __WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].RETAILER:
              updateDeliverHistoryFromRes(data.deliverHistory);
              updateReceivedOrderFromRes(data.receivedOrder);
              updateOrderHistoryFromRes(data.orderHistory);
              updateNewsFromRes(data.news);
              break;
          }
        }
      }.bind(this)).catch(function (err) {
        console.error(err);
      }.bind(this));
    }
  }, {
    key: 'setGameId',
    value: function setGameId(gameId) {
      this.getState().gameId = gameId;
      return this;
    }
  }, {
    key: 'setGameConfig',
    value: function setGameConfig(config) {
      this.getState().gameConfig = Object.assign(this.getGameConfig(), config);
    }
  }, {
    key: 'setTeam',
    value: function setTeam(team) {
      this.getState().teamIndex = team;
      return this;
    }
  }, {
    key: 'setJob',
    value: function setJob(job) {
      this.getState().job = job;
      return this;
    }
  }, {
    key: 'getGameId',
    value: function getGameId() {
      return this.getState().gameId;
    }
  }, {
    key: 'getGameConfig',
    value: function getGameConfig() {
      return this.getState().gameConfig;
    }
  }, {
    key: 'getTeamNumber',
    value: function getTeamNumber() {
      return this.getGameConfig().teamNumber;
    }
  }, {
    key: 'getTeam',
    value: function getTeam() {
      return this.getState().teamIndex;
    }
  }, {
    key: 'getJob',
    value: function getJob() {
      return this.getState().job;
    }
  }, {
    key: 'isStaffTeam',
    value: function isStaffTeam() {
      return _isStaffTeam(this.getTeam());
    }
  }, {
    key: 'getGameStage',
    value: function getGameStage() {
      return this.getState().stage;
    }
  }, {
    key: 'getDayStartTime',
    value: function getDayStartTime() {
      return this.getState().dayStartTime;
    }
  }, {
    key: 'isWorking',
    value: function isWorking() {
      return this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].START && this.getDayStartTime() !== __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */];
    }
  }, {
    key: 'isOffWork',
    value: function isOffWork() {
      return this.getGameStage() === __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].START && !this.isWorking();
    }
  }, {
    key: 'getDay',
    value: function getDay() {
      return this.getState().day;
    }
  }, {
    key: 'getTime',
    value: function getTime() {
      if (this.getGameStage() !== __WEBPACK_IMPORTED_MODULE_0__constant__["e" /* GAME_STAGE */].START) {
        return __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */];
      } else if (this.getDayStartTime() === __WEBPACK_IMPORTED_MODULE_0__constant__["c" /* UNKNOWN_TIME */]) {
        return this.getGameConfig().dayLong * 1000;
      } else {
        return Date.now() - this.getDayStartTime();
      }
    }
  }, {
    key: 'updateTime',
    value: function updateTime() {
      __WEBPACK_IMPORTED_MODULE_1__game__["b" /* getGameIdTime */](this.getGameId()).then(function (res) {
        var data = res.data;
        this.getState().day = parseInt(data.day);
        this.getState().dayStartTime = parseInt(data.dayStartTime);
      }.bind(this));
    }
  }, {
    key: 'updateAccount',
    value: function updateAccount() {
      __WEBPACK_IMPORTED_MODULE_2__account__["b" /* getBalance */](this.getGameId(), this.getTeam()).then(function (res) {
        var data = res.data;
        this.getAccount().balance = data.balance;
      }.bind(this));
    }
  }, {
    key: 'updateStorage',
    value: function updateStorage() {
      __WEBPACK_IMPORTED_MODULE_5__storage__["b" /* getStorage */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().storage.splice(0, this.getState().storage.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().storage.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateReceivedOrder',
    value: function updateReceivedOrder() {
      __WEBPACK_IMPORTED_MODULE_4__order__["a" /* getReceived */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().receivedOrder.splice(0, this.getState().receivedOrder.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().receivedOrder.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateOrderHistory',
    value: function updateOrderHistory() {
      __WEBPACK_IMPORTED_MODULE_4__order__["b" /* getHistory */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().orderHistory.splice(0, this.getState().orderHistory.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().orderHistory.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateDeliverHistory',
    value: function updateDeliverHistory() {
      __WEBPACK_IMPORTED_MODULE_3__deliver__["a" /* getHistory */](this.getGameId(), this.getTeam(), this.getJob()).then(function (res) {
        this.getState().deliverHistory.splice(0, this.getState().deliverHistory.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().deliverHistory.push(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'updateNews',
    value: function updateNews() {
      __WEBPACK_IMPORTED_MODULE_6__news__["a" /* getNews */](this.getGameId()).then(function (res) {
        this.getState().news.splice(0, this.getState().news.length);
        var list = res.data.list;
        for (var key in list) {
          this.getState().news.unshift(list[key]);
        }
      }.bind(this));
    }
  }, {
    key: 'test',
    value: function test() {
      this.setTeam(1);
      this.setJob(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* JOBS */].RETAILER);
      var interval = 10;
      var times = 1000;
      var t = 0;
      var a = setInterval(function () {
        console.log('test', t);
        this._update();
        if (t++ === times) {
          console.log('done');
          clearInterval(a);
        }
      }.bind(this), interval);
    }
  }]);

  return User;
}();

var nowUser = new User();

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UNKNOWN_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return ZERO_DAYTIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return GAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GAME_STAGE; });
/* unused harmony export GAME_WORK */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return READABLE_GAME_WORK; });
/* unused harmony export READABLE_GAMES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TEAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return READABLE_TEAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return READABLE_PRODUCTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JOBS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return STAFF_JOBS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return READABLE_JOBS; });
var UNKNOWN_TIME = -1;

var ZERO_DAYTIME = {
  DAY: -1,
  TIME: -1
};

var GAMES = {
  UNKNOWN: 'UNKNOWN'
};

var GAME_STAGE = {
  UNKNOWN: 'UNKNOWN',
  // PREPARE STAGE: 開放登記進入遊戲
  PREPARE: 'PREPARE',
  // READY STAGE: 人員不可再變動
  READY: 'READY',
  // START STAGE: 遊戲進行中
  START: 'START',
  // FINAL STAGE: 進行結算
  FINAL: 'FINAL',
  // END STAGE: 遊戲封存，不可再更動，但可以讀取資料
  END: 'END'
};

var GAME_WORK = {
  UNKNOWN: 'UNKNOWN',
  WORKING: 'WORKING',
  OFF_WORK: 'OFF_WORK'
};

var READABLE_GAME_WORK = {
  UNKNOWN: '未知階段',
  WORKING: '上班',
  OFF_WORK: '下班'
};

var READABLE_GAMES = {
  UNKNOWN: '未知遊戲'
};

var TEAMS = {
  UNKNOWN: 'UNKNOWN',
  STAFF: 0
};

var READABLE_TEAMS = {
  UNKNOWN: '未知組別',
  STAFF: '工作人員'
};

var PRODUCTS = {
  UNKNOWN: 'UNKNOWN',
  CAR: 'CAR',
  WHEEL: 'WHEEL',
  BODY: 'BODY',
  ENGINE: 'ENGINE',
  WAREHOUSE: 'WAREHOUSE',
  WAGE: 'WAGE',
  TRANSPORT: 'TRANSPORT'
};

var READABLE_PRODUCTS = {
  UNKNOWN: '未知產品',
  CAR: '車子',
  WHEEL: '輪胎',
  BODY: '車身',
  ENGINE: '引擎',
  WAREHOUSE: '倉庫',
  WAGE: '工人薪水',
  TRANSPORT: '貨車'
};

var JOBS = {
  UNKNOWN: 'UNKNOWN',
  FACTORY: 'FACTORY',
  WHOLESALER: 'WHOLESALER',
  RETAILER: 'RETAILER'
};

var STAFF_JOBS = {
  UNKNOWN_STAFF: 'UNKNOWN_STAFF',
  GUERRILLA: 'GUERRILLA',
  KEEPER: 'KEEPER',
  EXCHANGER: 'EXCHANGER',
  TRANSPORTER: 'TRANSPORTER',
  MARKET: 'MARKET',
  CONFIRMER: 'CONFIRMER',
  CONSOLER: 'CONSOLER'
};

var READABLE_JOBS = {
  UNKNOWN: '未知',
  FACTORY: '工廠',
  WHOLESALER: '批發商',
  RETAILER: '零售商',
  UNKNOWN_STAFF: '未知工作人員',
  KEEPER: '關主',
  EXCHANGER: '交換處',
  TRANSPORTER: '運輸者',
  MARKET: '市場代表者',
  GUERRILLA: '游擊者、工人',
  CONFIRMER: '資料確認者',
  CONSOLER: '後臺控制者'
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__page_home_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_regist_new_index_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_regist_new_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__page_regist_new_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_regist_old_index_vue__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_regist_old_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__page_regist_old_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_regist_player_index_vue__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_regist_player_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__page_regist_player_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_choose_game_index_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_choose_game_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__page_choose_game_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_choose_team_index_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_choose_team_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__page_choose_team_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_choose_job_index_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_choose_job_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__page_choose_job_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_choose_ready_index_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_choose_ready_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__page_choose_ready_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_round_factory_index_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_round_factory_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__page_round_factory_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_round_retailer_index_vue__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__page_round_retailer_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__page_round_retailer_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_round_wholesaler_index_vue__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_round_wholesaler_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__page_round_wholesaler_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_round_guerrilla_index_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__page_round_guerrilla_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__page_round_guerrilla_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_round_exchanger_index_vue__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_round_exchanger_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__page_round_exchanger_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_round_transporter_index_vue__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__page_round_transporter_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__page_round_transporter_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_round_market_index_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__page_round_market_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__page_round_market_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_round_consoler_index_vue__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__page_round_consoler_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__page_round_consoler_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__page_end_index_vue__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__page_end_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__page_end_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__page_admin_construct_index_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__page_admin_construct_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__page_admin_construct_index_vue__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return router; });


















//import gameend from '../page/gameend'

var routes = [{ path: '/', component: __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default.a }, { path: '/home', component: __WEBPACK_IMPORTED_MODULE_0__page_home_index_vue___default.a }, { path: '/admin', component: __WEBPACK_IMPORTED_MODULE_17__page_admin_construct_index_vue___default.a }, { path: '/admin/construct', component: __WEBPACK_IMPORTED_MODULE_17__page_admin_construct_index_vue___default.a }, { path: '/regist', component: __WEBPACK_IMPORTED_MODULE_1__page_regist_new_index_vue___default.a }, { path: '/regist/new', component: __WEBPACK_IMPORTED_MODULE_1__page_regist_new_index_vue___default.a }, { path: '/regist/old', component: __WEBPACK_IMPORTED_MODULE_2__page_regist_old_index_vue___default.a }, { path: '/regist/player', component: __WEBPACK_IMPORTED_MODULE_3__page_regist_player_index_vue___default.a }, { path: '/choose', component: __WEBPACK_IMPORTED_MODULE_4__page_choose_game_index_vue___default.a }, { path: '/choose/game', component: __WEBPACK_IMPORTED_MODULE_4__page_choose_game_index_vue___default.a }, { path: '/choose/team', component: __WEBPACK_IMPORTED_MODULE_5__page_choose_team_index_vue___default.a }, { path: '/choose/job', component: __WEBPACK_IMPORTED_MODULE_6__page_choose_job_index_vue___default.a }, { path: '/choose/ready', component: __WEBPACK_IMPORTED_MODULE_7__page_choose_ready_index_vue___default.a }, { path: '/round/factory', component: __WEBPACK_IMPORTED_MODULE_8__page_round_factory_index_vue___default.a }, { path: '/round/retailer', component: __WEBPACK_IMPORTED_MODULE_9__page_round_retailer_index_vue___default.a }, { path: '/round/wholesaler', component: __WEBPACK_IMPORTED_MODULE_10__page_round_wholesaler_index_vue___default.a }, { path: '/round/guerrilla', component: __WEBPACK_IMPORTED_MODULE_11__page_round_guerrilla_index_vue___default.a }, { path: '/round/keeper', component: __WEBPACK_IMPORTED_MODULE_11__page_round_guerrilla_index_vue___default.a }, { path: '/round/exchanger', component: __WEBPACK_IMPORTED_MODULE_12__page_round_exchanger_index_vue___default.a }, { path: '/round/transporter', component: __WEBPACK_IMPORTED_MODULE_13__page_round_transporter_index_vue___default.a }, { path: '/round/market', component: __WEBPACK_IMPORTED_MODULE_14__page_round_market_index_vue___default.a }, { path: '/round/consoler', component: __WEBPACK_IMPORTED_MODULE_15__page_round_consoler_index_vue___default.a }, { path: '/end', component: __WEBPACK_IMPORTED_MODULE_16__page_end_index_vue___default.a } /*,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               { path: '/gameend', component: gameend },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               { path: '/round/exchange', component: roundExchange },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               { path: '/round/market', component: roundMarket },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               { path: '/round/teamleader', component: roundTeamleader }*/
];

var router = new VueRouter({
  routes: routes
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = nextGameStage;
/* harmony export (immutable) */ __webpack_exports__["a"] = getGameStage;
/* harmony export (immutable) */ __webpack_exports__["b"] = getGameIdTime;
/* harmony export (immutable) */ __webpack_exports__["d"] = nextDay;
function nextGameStage(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/next_game_stage', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getGameStage(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/get_game_stage', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getGameIdTime(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/get_game_time', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function nextDay(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/game/set_game_next_day', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = setStorage;
/* harmony export (immutable) */ __webpack_exports__["b"] = getStorage;
/* harmony export (immutable) */ __webpack_exports__["a"] = getHistory;
function setStorage(gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/set_storage', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getStorage(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/get_storage', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getHistory(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/storage/get_history', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getBalance;
/* harmony export (immutable) */ __webpack_exports__["a"] = getHistory;
/* harmony export (immutable) */ __webpack_exports__["d"] = give;
/* harmony export (immutable) */ __webpack_exports__["c"] = take;
function getBalance(gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_balance', {
      gameId: gameId,
      teamIndex: teamIndex
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getHistory(gameId, teamIndex) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/get_history', {
      gameId: gameId,
      teamIndex: teamIndex
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function give(gameId, teamIndex, balance) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/give', {
      gameId: gameId,
      teamIndex: teamIndex,
      balance: balance
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function take(gameId, teamIndex, balance) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/account/take', {
      gameId: gameId,
      teamIndex: teamIndex,
      balance: balance
    }).then(function (res) {
      res.data.err ? reject(res) : resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGameIdList;
/* harmony export (immutable) */ __webpack_exports__["b"] = newGame;
function getGameIdList() {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/get_game_list').then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function newGame(gameConfig) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/enter/new_game', {
      gameConfig: gameConfig
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHistory;
/* harmony export (immutable) */ __webpack_exports__["b"] = setDeliver;
function getHistory(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/deliver/get_history', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function setDeliver(gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/deliver/set_deliver', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    }).then(function (res) {
      if (res.data.error) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getHistory;
/* harmony export (immutable) */ __webpack_exports__["a"] = getReceived;
/* harmony export (immutable) */ __webpack_exports__["c"] = setOrder;
function getHistory(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/order/get_history', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function getReceived(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/order/get_received', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

function setOrder(gameId, teamIndex, job, product, amount) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/order/set_order', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job,
      product: product,
      amount: amount
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components__);



var mainFrame = new Vue({
  el: '#main-frame',
  router: __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */]
});

__WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/');

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(15)
var ieee754 = __webpack_require__(17)
var isArray = __webpack_require__(18)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('deliver-history', __webpack_require__(84));
Vue.component('storage-list', __webpack_require__(91));
Vue.component('order-history', __webpack_require__(90));
Vue.component('news-list', __webpack_require__(87));
Vue.component('order-dialog', __webpack_require__(89));
Vue.component('game-clock', __webpack_require__(85));
Vue.component('team-storage-list', __webpack_require__(93));
Vue.component('storage-register-dialog', __webpack_require__(92));
Vue.component('deliver-dialog', __webpack_require__(83));
// Vue.component('news-publisher-dialog', require('./news-publisher-dialog.vue'))
Vue.component('online-status', __webpack_require__(88));
Vue.component('info-panel', __webpack_require__(86));
Vue.component('account-dialog', __webpack_require__(82));

// Discarded:
// Vue.component('received-order', require('./received-order.vue'))
// Vue.component('line-chart', require('./line-chart.vue'))

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUpdate;
function getUpdate(gameId, teamIndex, job) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/data/get_update', {
      gameId: gameId,
      teamIndex: teamIndex,
      job: job
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getNews;
function getNews(gameId) {
  return new Promise(function (resolve, reject) {
    axios.post('/api/news/get_news', {
      gameId: gameId
    }).then(function (res) {
      if (res.data.err) {
        reject(res);
      }
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_account__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function
  },
  data: function data() {
    return {
      accountDialog: false,
      selectedAction: null,
      selectedTeam: null,
      amount: null,
      balance: null,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState()
    };
  },
  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    actionList: function actionList() {
      return [{
        index: 'TAKE',
        text: '扣款'
      }, {
        index: 'GIVE',
        text: '給予'
      }];
    }
  },
  methods: {
    act: function act() {
      this.accountDialog = false;
      switch (this.selectedAction) {
        case 'TAKE':
          __WEBPACK_IMPORTED_MODULE_3__lib_api_account__["c" /* take */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.balance).then(function (res) {
            var data = res.data;
            this.announce('\u6210\u529F\u62FF\u53D6' + data.teamIndex + '\u7D44' + data.balance + '\u5143');
          }.bind(this)).catch(function (err) {
            console.log(err);
            this.announce(err.data && (err.data.readableMsg || err.data.msg));
          }.bind(this));
          break;
        case 'GIVE':
          __WEBPACK_IMPORTED_MODULE_3__lib_api_account__["d" /* give */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.balance).then(function (res) {
            var data = res.data;
            this.announce('\u6210\u529F\u7D66\u4E88' + data.teamIndex + '\u7D44' + data.balance + '\u5143');
          }.bind(this)).catch(function (err) {
            console.log(err);
            this.announce(err.data && (err.data.readableMsg || err.data.msg));
          }.bind(this));
          break;
      }
    }
  }
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_deliver__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      deliverDialog: false,
      jobList: __WEBPACK_IMPORTED_MODULE_0__lib_readable__["h" /* readableJobList */](),
      selectedJob: null,
      selectedTeam: null,
      amount: null,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState()
    };
  },
  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    productList: function productList() {
      return [{
        index: 'CAR',
        text: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["j" /* READABLE_PRODUCTS */].CAR
      }];
    },
    btnClass: function btnClass() {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom';
    }
  },
  methods: {
    deliver: function deliver() {
      this.deliverDialog = false;
      __WEBPACK_IMPORTED_MODULE_3__lib_api_deliver__["b" /* setDeliver */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.selectedJob, 'CAR', this.amount).then(function (res) {
        var data = res.data;
        this.announce('\u6210\u529F\u904B\u8F38\u7B2C' + data.teamIndex + '\u7D44' + data.job + '\u7684' + data.amount + '\u81FA\u8ECA');
      }.bind(this)).catch(function (err) {
        console.log(err);
        var data = err.data;
        this.announce(data.readableMsg || data.msg);
      }.bind(this));
    }
  }
});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  data: function data() {
    return {
      header: [{ text: '時間', align: 'left', value: 'readableGameTime' }, { text: '數量', value: 'amount' }]
    };
  },
  computed: {
    readableDeliverList: function readableDeliverList() {
      if (this.list) {
        return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["n" /* toReadableDeliverList */](this.list);
      } else {
        return [];
      }
    }
  }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      state: __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].getDayTime()
    };
  },

  computed: {
    readableTime: function readableTime() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["l" /* toReadableTime */](this.state.time);
    },
    readableDay: function readableDay() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["b" /* toReadableDay */](this.state.day);
    }
  }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'game-config': Object
  }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  computed: {
    newsList: function newsList() {
      if (this.list) {
        return this.list;
      } else {
        return [];
      }
    }
  }
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  data: function data() {
    return {
      teamNumber: 4
    };
  },

  computed: {
    jobList: function jobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["h" /* readableJobList */]();
    },
    staffJobList: function staffJobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["g" /* readableStaffJobList */]();
    },
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["a" /* toReadableTeamList */](this.teamNumber);
    }
  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api_order__ = __webpack_require__(12);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      amount: null,
      orderDialog: false
    };
  },

  computed: {
    btnClass: function btnClass() {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom';
    }
  },
  methods: {
    order: function order() {
      this.orderDialog = false;
      var user = __WEBPACK_IMPORTED_MODULE_1__lib_api__["a" /* nowUser */];
      __WEBPACK_IMPORTED_MODULE_2__lib_api_order__["c" /* setOrder */](user.getGameId(), user.getTeam(), user.getJob(), 'CAR', this.amount).then(function (res) {
        var data = res.data;
        this.announce('\u6210\u529F\u8A02\u8CFC' + data.amount + '\u81FA\u8ECA');
      }.bind(this)).catch(function (err) {
        var data = err.data;
        this.announce(data.readableMsg || data.msg);
      }.bind(this));
    }
  }
});

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  data: function data() {
    return {
      header: [{ text: '時間', align: 'left', value: 'readableGameTime' }, { text: '數量', value: 'amount' }, { text: '已送達', value: 'delivered' }]
    };
  },
  computed: {
    readableOrderList: function readableOrderList() {
      if (this.list) {
        return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["m" /* toReadableOrderList */](this.list);
      } else {
        return [{ readableGameTime: 'A', amount: 123 }, { readableGameTime: 'B', amount: 456 }];
      }
    }
  }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  data: function data() {
    return {
      header: [{ text: '產品', align: 'left', value: 'readableProduct' }, { text: '數量', value: 'amount' }]
    };
  },
  computed: {
    readableStorageList: function readableStorageList() {
      if (this.list) {
        return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["k" /* toReadableStorageList */](this.list);
      } else {
        return [{ readableProduct: 'A', amount: 123 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }, { readableProduct: 'B', amount: 456 }];
      }
    }
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    'announce': Function,
    'secondary': {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },
  data: function data() {
    return {
      storageRegisterDialog: false,
      jobList: __WEBPACK_IMPORTED_MODULE_0__lib_readable__["h" /* readableJobList */](),
      selectedJob: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* JOBS */].FACTORY,
      selectedTeam: null,
      amount: {
        'CAR': 0,
        'WHEEL': 0,
        'BODY': 0,
        'ENGINE': 0
      }
    };
  },

  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_0__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getTeamNumber());
    },
    productList: function productList() {
      if (!this.selectedJob) {
        return [];
      }

      var list = [];
      if (this.selectedJob === 'FACTORY') {
        list = __WEBPACK_IMPORTED_MODULE_0__lib_readable__["j" /* readableProductList */]();
      } else {
        list = [{
          index: 'CAR',
          text: __WEBPACK_IMPORTED_MODULE_1__lib_constant__["j" /* READABLE_PRODUCTS */].CAR
        }];
      }
      return list;
    },
    btnClass: function btnClass() {
      return this.secondary ? 'floating-right-bottom-secondary' : 'floating-right-bottom';
    }
  },
  methods: {
    register: function register() {
      this.storageRegisterDialog = false;
      var user = __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */];

      console.log(this.amountCar);
      console.log(this.amount);
      for (var key in this.amount) {
        console.log(this.amount[key]);
        if (!this.amount[key]) {
          continue;
        }
        __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__["c" /* setStorage */](user.getGameId(), this.selectedTeam, this.selectedJob, key, this.amount[key]).then(function (res) {
          var data = res.data;
          this.announce('\u6210\u529F\u767B\u8A18\u7B2C' + data.teamIndex + '\u7D44' + data.job + '\u7684' + data.product + '\u5EAB\u5B58');
        }.bind(this)).catch(function (err) {
          var data = err.data;
          this.announce(data.readableMsg || data.msg);
        }.bind(this));
        this.amount[key] = 0;
      }
    }
  }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__ = __webpack_require__(8);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      selectedTeam: 1,
      selectedJob: __WEBPACK_IMPORTED_MODULE_0__lib_constant__["a" /* JOBS */].FACTORY,
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState(),
      storageList: []
    };
  },
  computed: {
    teamList: function teamList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameConfig().teamNumber);
    },
    jobList: function jobList() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["h" /* readableJobList */]();
    },
    getStorageList: function getStorageList() {
      __WEBPACK_IMPORTED_MODULE_3__lib_api_storage__["a" /* getHistory */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, this.selectedJob).then(function (res) {
        console.log(res.data);
        console.log(__WEBPACK_IMPORTED_MODULE_1__lib_readable__["k" /* toReadableStorageList */](res.data.list));
        this.storageList = __WEBPACK_IMPORTED_MODULE_1__lib_readable__["k" /* toReadableStorageList */](res.data.list);
      }.bind(this)).catch(function (err) {
        console.error(err);
      }.bind(this));
      return '';
    }
  }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_enter__ = __webpack_require__(10);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: 'ADMIN',
      snackbar: false,
      snackbarText: '',
      configText: ''
    };
  },

  methods: {
    newGame: function newGame() {
      __WEBPACK_IMPORTED_MODULE_4__lib_api_enter__["b" /* newGame */](JSON.parse(this.configText)).then(function (res) {
        var data = res.data;
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setGameId(data.gameId);
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setGameConfig(data.gameConfig);
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setTeam(__WEBPACK_IMPORTED_MODULE_1__lib_constant__["f" /* TEAMS */].STAFF);
        __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setJob(__WEBPACK_IMPORTED_MODULE_1__lib_constant__["h" /* STAFF_JOBS */].CONSOLER);
        __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/round/consoler');
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  },
  mounted: function mounted() {
    var _constant$JOBS$FACTOR, _storage;

    this.configText = JSON.stringify({
      title: '試玩場 REDRO',
      describe: '2017 工工營 產銷遊戲',
      teamNumber: 4,
      teammembers: [12, 12, 13, 14],
      days: 3,
      dayLong: 300,
      defaultBalance: 19400,
      cost: {
        storage: (_storage = {}, _defineProperty(_storage, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* JOBS */].FACTORY, (_constant$JOBS$FACTOR = {}, _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR, 3000), _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].WHEEL, 200), _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].BODY, 200), _defineProperty(_constant$JOBS$FACTOR, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].ENGINE, 200), _constant$JOBS$FACTOR)), _defineProperty(_storage, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* JOBS */].WHOLESALER, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR, 6000)), _defineProperty(_storage, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* JOBS */].RETAILER, _defineProperty({}, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR, 9000)), _defineProperty(_storage, 'patchSize', 10), _defineProperty(_storage, 'permanent', true), _storage),
        transport: {
          cost: 200,
          patchSize: 4
        },
        wage: 100
      },
      updateInterval: 1000,
      news: [{
        day: 1,
        time: 0,
        title: '高田廠牌所製造的安全氣囊有瑕疵',
        content: '近幾個月各大車廠紛紛主動召回部分型號的車輛，主因是高田廠牌所製造的安全氣囊有瑕疵，當氣囊爆開，可能造成碎片、零件噴出，導致車內人員傷害。此一負面新聞發布後，使部分消費者打消買車的念頭，車市狀況慘淡。',
        picture: 'image/news/day1_rehearsal.jpg',
        demanded: 20,
        price: 3500
      }, {
        day: 2,
        time: 0,
        title: '高田廠牌所製造的安全氣囊有瑕疵',
        content: '豐田汽車進一步表示，新的電池技術很有可能會讓旗下所有電動汽車性能都得到改進。電池技術研究人員指出，對於電動汽車來說，鋰離子電池是一項關鍵技術， 預估能讓每次充電行駛里程提高 10% 到 15% 的效能。全球汽車產業分析師評估這次的車用電池再進化會帶來50%的需求成長。',
        picture: 'image/news/day2_rehearsal.jpg',
        demanded: 30,
        price: 3500
      }, {
        day: 3,
        time: 0,
        title: '高田廠牌所製造的安全氣囊有瑕疵',
        content: '3月11日發生在日本東北部的強烈地震及隨之引起的海嘯，重創日本各地並造成嚴重的人員傷亡和財物損失。而日本多家車廠亦在此次天災中受到影響。包含Toyota、Mitsubishi、Nissan等多家日本車廠皆已宣佈暫時停止生產，導致自用小客車的價格提高，民眾降低購買意願。',
        picture: 'image/news/day3_rehearsal.jpg',
        demanded: 20,
        price: 3500
      }]
    }, null, '  ');
  }
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api_enter__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '選擇遊戲',
      gameList: []
    };
  },

  methods: {
    intoGame: function intoGame(gameId, gameConfig) {
      console.log('User Game:', gameId);
      __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].setGameId(gameId);
      __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].setGameConfig(gameConfig);
      __WEBPACK_IMPORTED_MODULE_2__router__["a" /* router */].push('/choose/team');
    }
  },
  created: function created() {
    // load gameList and use promise to change the gameList
    __WEBPACK_IMPORTED_MODULE_0__lib_api__["a" /* nowUser */].resetState();
    __WEBPACK_IMPORTED_MODULE_1__lib_api_enter__["a" /* getGameIdList */]().then(function (res) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = res.data.gameList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var game = _step.value;

          this.gameList.unshift({
            index: game.gameId,
            text: game.gameConfig.title,
            describe: game.gameConfig.describe,
            gameConfig: game.gameConfig
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }.bind(this)).catch(function (err) {
      console.error(err);
    });
  }
});

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      dialog: false,
      job: '',
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    showSubTitle: function showSubTitle() {
      return !__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].isStaffTeam();
    },
    itemJob: function itemJob() {
      if (__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam() === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["f" /* TEAMS */].STAFF) {
        return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["g" /* readableStaffJobList */]();
      } else {
        return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["h" /* readableJobList */]();
      }
    },
    readableTeam: function readableTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam());
    },
    readableJob: function readableJob() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](this.job);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    previewJob: function previewJob(job) {
      this.job = job;
      this.dialog = true;
    },
    intoJob: function intoJob(job) {
      console.log('User Job:', job, __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](job));
      __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setJob(job);

      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/ready');
    }
  }
});

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_game__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      timer: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    readableTeam: function readableTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam());
    },
    readableJob: function readableJob() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob());
    },
    intoBelong: function intoBelong() {
      if (__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob() === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["h" /* STAFF_JOBS */].CONSOLER) {
        __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/round/' + __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob().toLowerCase());
      }
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].START:
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].FINAL:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/round/' + __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob().toLowerCase());
          break;
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  }
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      stepCount: 0,
      teamNumber: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeamNumber(),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState()
    };
  },

  computed: {
    itemTeam: function itemTeam() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["i" /* toReadableTeamListWithStaff */](this.teamNumber);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    intoTeam: function intoTeam(team) {
      console.log('User Team:', team);
      __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].setTeam(team);
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/job');
    }
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_account__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_api_storage__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_api_game__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      teamNumber: 4,
      title: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().title + ' 結果',
      dayTime: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getDayTime(),
      tabs: [{ index: 0, id: 'charts', title: '圖表' }, { index: 1, id: 'game-info', title: '遊戲資訊' }],
      activeTab: null,
      selectedTeam: 1,
      charts: [{
        id: 'chart-profit',
        title: '淨利與毛利'
      }, {
        id: 'chart-productivity',
        title: '產量'
      }, {
        id: 'chart-storage',
        title: '倉儲'
      }],
      gameConfig: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig()
    };
  },

  computed: {
    itemTeam: function itemTeam() {
      var list = [{
        index: 0,
        text: '全部'
      }];
      return list.concat(__WEBPACK_IMPORTED_MODULE_2__lib_readable__["a" /* toReadableTeamList */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeamNumber()));
    },
    loadChart: function loadChart() {
      if (this.selectedTeam === 0) {
        return;
      }

      var days = __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().days;
      var dayLong = __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig().dayLong;
      var interval = 10;

      __WEBPACK_IMPORTED_MODULE_4__lib_api_account__["a" /* getHistory */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam).then(function (res) {
        var history = res.data.list;

        var calculate = function calculate(day, time) {
          var n = 0;
          var g = 0;
          for (var key in history) {
            var item = history[key];
            if (item.day < day || item.day === day && item.time <= time * 1000) {
              if (item.balance > n) {
                n += item.balance - n;
              }
              g = item.balance;
            } else {
              break;
            }
          }
          return [g, n];
        };

        var dataTable = [['時間', '毛利', '淨利']];
        for (var d = 1; d <= days; d++) {
          for (var i = 0; i <= parseInt(dayLong / interval); i++) {
            var result = calculate(d, i * interval);
            dataTable.push([i === 0 ? d + '' : '', result[0], result[1]]);
          }
        }
        console.log(dataTable);
        var data = google.visualization.arrayToDataTable(dataTable);

        var options = {
          chartArea: { left: '15%', width: '85%', height: '70%' },
          legend: { position: 'bottom' },
          height: 300
        };

        // material design charts
        // remember to add 'line' package to 'google.charts.load' before using this
        // let chart = new google.charts.Line(document.getElementById('chart-profit'))
        // chart.draw(data, google.charts.Line.convertOptions(options))

        var chart = new google.visualization.LineChart(document.getElementById('chart-profit'));
        chart.draw(data, options);
      }.bind(this)).catch(function (err) {
        console.error(err);
      }.bind(this));

      __WEBPACK_IMPORTED_MODULE_5__lib_api_storage__["a" /* getHistory */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId(), this.selectedTeam, __WEBPACK_IMPORTED_MODULE_1__lib_constant__["a" /* JOBS */].FACTORY).then(function (res) {
        var history = res.data.list;

        // chart-productivity
        var calculate = function calculate(day) {
          var n = 0; // accumulate
          for (var key in history) {
            var item = history[key];
            if (item.day <= day) {
              if (item.product === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR && item.amount > n) {
                n += item.amount - n;
              }
            } else {
              break;
            }
          }
          return n;
        };

        var dataTable = [['日子', '累積產量', '單日產量']];
        var k = 0;
        for (var d = 1; d <= days; d++) {
          var result = calculate(d);
          k = result - k;
          dataTable.push([__WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableDay */](d), result, k]);
        }
        var data = google.visualization.arrayToDataTable(dataTable);

        var options = {
          chartArea: { left: '15%', width: '85%', height: '70%' },
          legend: { position: 'bottom' },
          height: 300
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'));
        chart.draw(data, options);
      }.bind(this)).catch(function (err) {
        console.error(err);
      }.bind(this));

      return '';
    }
  },
  methods: {
    backToHome: function backToHome() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/');
    },
    drawStorageChart: function drawStorageChart(history) {
      var calculate = function calculate(day) {
        var n = 0; // accumulate
        for (var key in history) {
          var item = history[key];
          if (item.day <= day) {
            if (item.product === __WEBPACK_IMPORTED_MODULE_1__lib_constant__["b" /* PRODUCTS */].CAR && item.amount > n) {
              n += item.amount - n;
            }
          } else {
            break;
          }
        }
        return n;
      };

      var dataTable = [['日子', '累積產量', '單日產量']];
      var k = 0;
      for (var d = 1; d <= days; d++) {
        var result = calculate(d);
        k = result - k;
        dataTable.push([__WEBPACK_IMPORTED_MODULE_2__lib_readable__["b" /* toReadableDay */](d), result, k]);
      }
      var data = google.visualization.arrayToDataTable(dataTable);

      var options = {
        chartArea: { left: '15%', width: '85%', height: '70%' },
        legend: { position: 'bottom' },
        height: 300
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'));
      chart.draw(data, options);
    }
  },
  mounted: function mounted() {
    // this.loadChart()
    // google.charts.setOnLoadCallback(this.loadChart)
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_api_enter__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    intoRegist: function intoRegist() {
      __WEBPACK_IMPORTED_MODULE_2__router__["a" /* router */].push('/regist');
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '認證碼',
      code: '1234'
    };
  },

  methods: {
    intoRegistOld: function intoRegistOld() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/old');
    },
    intoRegistPlayer: function intoRegistPlayer() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/player');
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '輸入認證碼',
      code: null,
      btnDisabled: true,
      errorDialog: false,
      errorDialogMsg: ''
    };
  },

  watch: {
    code: function code() {
      this.btnDisabled = !this.code;
    }
  },
  methods: {
    backToRegistNew: function backToRegistNew() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/new');
    },
    setCode: function setCode() {
      var code = parseInt(this.code);
      if (code < 0 || code > 9999) {
        this.errorDialogMsg = '你的認證碼不正確，應該是由四位數字組成。';
        this.errorDialog = true;
      } else {
        this.intoChoose();
      }
    },
    intoChoose: function intoChoose() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose');
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: '暱稱',
      code: '1234',
      nickname: '',
      errorDialog: false,
      errorDialogMsg: ''
    };
  },

  methods: {
    backToRegistNew: function backToRegistNew() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/new');
    },
    setName: function setName() {
      if (this.nickname.length > 10) {
        this.errorDialogMsg = '暱稱字數不可超過10字。';
        this.errorDialog = true;
      } else if (this.nickname.length < 1) {
        this.errorDialogMsg = '你的暱稱太短了。';
        this.errorDialog = true;
      } else {
        this.intoChooseGame();
      }
    },
    intoChooseGame: function intoChooseGame() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/choose/game');
    },
    intoRegistStaff: function intoRegistStaff() {
      __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/regist/staff');
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_api_game__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      tabs: [{ index: 0, id: 'online-status', title: '連線狀況' }, { index: 1, id: 'dynamic-log', title: '即時動態' }, { index: 2, id: 'game-info', title: '遊戲資訊' }],
      activeTab: null,
      snackbar: false,
      snackbarText: '',
      gameConfig: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameConfig()
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state);
    }
  },
  methods: {
    nextGameStage: function nextGameStage() {
      __WEBPACK_IMPORTED_MODULE_4__lib_api_game__["c" /* nextGameStage */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId()).then(function (res) {
        var data = res.data;
        var gameId = data.gameId;
        var stage = data.stage;
        this.announce('GameId=\'' + gameId + '\' Stage has been set to ' + stage);
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    nextDay: function nextDay() {
      __WEBPACK_IMPORTED_MODULE_4__lib_api_game__["d" /* nextDay */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getGameId()).then(function (res) {
        var data = res.data;
        var gameId = data.gameId;
        var day = data.day;
        this.announce('GameId=\'' + gameId + '\' Stage has been set to day ' + day);
      }.bind(this)).catch(function (err) {
        console.error(err);
      });
    },
    test: function test() {
      __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].test();
    },
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      secondary: true,
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam()) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      tabs: [{ index: 0, id: 'storage', title: '庫存' }, { index: 1, id: 'received-order', title: '收到的訂單', content: 'something2...' }, { index: 2, id: 'deliver-history', title: '運送紀錄', content: 'something3...' }],
      activeTab: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableDollar */](this.state.balance);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      secondary: true,
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam()) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      tabs: [{ index: 0, id: 'storage', title: '庫存' }, { index: 1, id: 'news-list', title: '市場新聞' }, { index: 2, id: 'order-history', title: '寄出的訂單' }, { index: 3, id: 'deliver-history', title: '運送紀錄' }],
      activeTab: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableDollar */](this.state.balance);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_constant__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      secondary: true,
      title: __WEBPACK_IMPORTED_MODULE_1__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getJob()),
      state: __WEBPACK_IMPORTED_MODULE_2__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_1__lib_readable__["d" /* toReadableGameTime */](this.state);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_3__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_constant__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_readable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: __WEBPACK_IMPORTED_MODULE_2__lib_readable__["e" /* toReadableTeam */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getTeam()) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["c" /* toReadableJob */](__WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getJob()),
      tabs: [{ index: 0, id: 'storage', title: '庫存' }, { index: 1, id: 'received-order', title: '收到的訂單' }, { index: 2, id: 'order-history', title: '寄出的訂單' }, { index: 3, id: 'deliver-history', title: '運送紀錄' }],
      activeTab: null,
      state: __WEBPACK_IMPORTED_MODULE_3__lib_api__["a" /* nowUser */].getState(),
      snackbar: false,
      snackbarText: ''
    };
  },

  computed: {
    toolbarInfo: function toolbarInfo() {
      return __WEBPACK_IMPORTED_MODULE_2__lib_readable__["d" /* toReadableGameTime */](this.state) + ' ' + __WEBPACK_IMPORTED_MODULE_2__lib_readable__["f" /* toReadableDollar */](this.state.balance);
    },
    intoBelong: function intoBelong() {
      switch (this.state.stage) {
        case __WEBPACK_IMPORTED_MODULE_1__lib_constant__["e" /* GAME_STAGE */].END:
          __WEBPACK_IMPORTED_MODULE_0__router__["a" /* router */].push('/end');
          break;
      }
      return '';
    }
  },
  methods: {
    announce: function announce(msg) {
      this.snackbarText = msg;
      this.snackbar = true;
    }
  }
});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.end .chart-title {\r\n  margin-bottom: 0;\r\n  margin-top: 20px;\n}\n.end .divider {\r\n  margin-top: 20px;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/end/index.vue?3f29e972"],"names":[],"mappings":";AAoQA;EACA,iBAAA;EACA,iBAAA;CACA;AAEA;EACA,iBAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div class=\"end\">\r\n    <main>\r\n      <v-tabs\r\n        v-model=\"activeTab\"\r\n        dark fixed centered\r\n      >\r\n        <v-toolbar dark class=\"cyan elevation-0\">\r\n          <v-btn icon v-on:click.native=\"backToHome\">\r\n            <v-icon>arrow_back</v-icon>\r\n          </v-btn>\r\n          <v-toolbar-title>{{ title }}</v-toolbar-title>\r\n        </v-toolbar>\r\n        <v-tabs-bar\r\n          slot=\"activators\"\r\n          class=\"cyan\"\r\n        >\r\n          <v-tabs-item\r\n            v-for=\"tab in tabs\"\r\n            :key=\"tab.index\"\r\n            :href=\"'#' + tab.id\"\r\n          >\r\n            {{ tab.title }}\r\n          </v-tabs-item>\r\n          <v-tabs-slider class=\"yellow\"></v-tabs-slider>\r\n        </v-tabs-bar>\r\n        <v-tabs-content\r\n          :key=\"0\"\r\n          id=\"charts\"\r\n        >\r\n          <v-card>\r\n            <v-card-text>\r\n              <v-select\r\n                v-bind:items=\"itemTeam\"\r\n                v-model=\"selectedTeam\"\r\n                label=\"選擇小隊\"\r\n                single-line\r\n                item-value=\"index\"\r\n                bottom\r\n              ></v-select>\r\n              \r\n              <div\r\n                v-for=\"(chart, key) in charts\"\r\n                :key=\"key\"\r\n              >\r\n                <h5 class=\"chart-title\">{{ chart.title }}</h5>\r\n                <div :id=\"chart.id\"></div>\r\n                <v-divider v-if=\"key + 1 < charts.length\"></v-divider>\r\n              </div>\r\n            </v-card-text>\r\n          </v-card>\r\n        </v-tabs-content>\r\n        <v-tabs-content\r\n          :key=\"1\"\r\n          id=\"game-info\"\r\n        >\r\n          <info-panel :game-config=\"gameConfig\"></info-panel>\r\n        </v-tabs-content>\r\n      </v-tabs>\r\n    </main>\r\n    {{ loadChart }}\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport {router} from '../../router'\r\nimport * as constant from '../../lib/constant'\r\nimport * as readable from '../../lib/readable'\r\nimport * as api from '../../lib/api'\r\nimport * as accountApi from '../../lib/api/account'\r\nimport * as storageApi from '../../lib/api/storage'\r\nimport * as gameApi from '../../lib/api/game'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      teamNumber: 4,\r\n      title: api.nowUser.getGameConfig().title + ' 結果',\r\n      dayTime: api.nowUser.getDayTime(),\r\n      tabs: [\r\n        { index: 0, id: 'charts', title: '圖表' },\r\n        { index: 1, id: 'game-info', title: '遊戲資訊' }\r\n      ],\r\n      activeTab: null,\r\n      selectedTeam: 1,\r\n      charts: [\r\n        {\r\n          id: 'chart-profit',\r\n          title: '淨利與毛利'\r\n        },\r\n        {\r\n          id: 'chart-productivity',\r\n          title: '產量'\r\n        },\r\n        {\r\n          id: 'chart-storage',\r\n          title: '倉儲'\r\n        }\r\n      ],\r\n      gameConfig: api.nowUser.getGameConfig()\r\n    }\r\n  },\r\n  computed: {\r\n    itemTeam () {\r\n      let list = [{\r\n        index: 0,\r\n        text: '全部'\r\n      }]\r\n      return list.concat(readable.toReadableTeamList(api.nowUser.getTeamNumber()))\r\n    },\r\n    loadChart () {\r\n      if (this.selectedTeam === 0) {\r\n        return\r\n      }\r\n\r\n      let days = api.nowUser.getGameConfig().days\r\n      let dayLong = api.nowUser.getGameConfig().dayLong\r\n      let interval = 10\r\n\r\n      accountApi.getHistory(api.nowUser.getGameId(), this.selectedTeam)\r\n        .then((function (res) {\r\n          let history = res.data.list\r\n\r\n          let calculate = (day, time) => {\r\n            let n = 0\r\n            let g = 0\r\n            for (let key in history) {\r\n              let item = history[key]\r\n              if (item.day < day || (item.day === day && item.time <= time * 1000)) {\r\n                if (item.balance > n) {\r\n                  n += item.balance - n\r\n                }\r\n                g = item.balance\r\n              } else {\r\n                break\r\n              }\r\n            }\r\n            return [g, n]\r\n          }\r\n\r\n          let dataTable = [['時間', '毛利', '淨利']]\r\n          for (let d = 1; d <= days; d++) {\r\n            for (let i = 0; i <= parseInt(dayLong / interval); i++) {\r\n              let result = calculate(d, i * interval)\r\n              dataTable.push([i === 0 ? d + '' : '', result[0], result[1]])\r\n            }\r\n          }\r\n          console.log(dataTable)\r\n          let data = google.visualization.arrayToDataTable(dataTable)\r\n\r\n          let options = {\r\n            chartArea: {left: '15%', width: '85%', height: '70%'},\r\n            legend: { position: 'bottom' },\r\n            height: 300\r\n          }\r\n\r\n          // material design charts\r\n          // remember to add 'line' package to 'google.charts.load' before using this\r\n          // let chart = new google.charts.Line(document.getElementById('chart-profit'))\r\n          // chart.draw(data, google.charts.Line.convertOptions(options))\r\n\r\n          let chart = new google.visualization.LineChart(document.getElementById('chart-profit'))\r\n          chart.draw(data, options)\r\n        }).bind(this))\r\n        .catch((function (err) {\r\n          console.error(err)\r\n        }).bind(this))\r\n      \r\n      storageApi.getHistory(api.nowUser.getGameId(), this.selectedTeam, constant.JOBS.FACTORY)\r\n        .then((function (res) {\r\n          let history = res.data.list\r\n\r\n          // chart-productivity\r\n          let calculate = (day) => {\r\n            let n = 0 // accumulate\r\n            for (let key in history) {\r\n              let item = history[key]\r\n              if (item.day <= day) {\r\n                if (item.product === constant.PRODUCTS.CAR && item.amount > n) {\r\n                  n += item.amount - n\r\n                }\r\n              } else {\r\n                break\r\n              }\r\n            }\r\n            return n\r\n          }\r\n\r\n          let dataTable = [['日子', '累積產量', '單日產量']]\r\n          let k = 0\r\n          for (let d = 1; d <= days; d++) {\r\n            let result = calculate(d)\r\n            k = result - k\r\n            dataTable.push([readable.toReadableDay(d), result, k])\r\n          }\r\n          let data = google.visualization.arrayToDataTable(dataTable)\r\n\r\n          let options = {\r\n            chartArea: {left: '15%', width: '85%', height: '70%'},\r\n            legend: { position: 'bottom' },\r\n            height: 300\r\n          }\r\n\r\n          let chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'))\r\n          chart.draw(data, options)\r\n        }).bind(this))\r\n        .catch((function (err) {\r\n          console.error(err)\r\n        }).bind(this))\r\n\r\n      return ''\r\n    }\r\n  },\r\n  methods: {\r\n    backToHome () {\r\n      router.push('/')\r\n    },\r\n    drawStorageChart (history) {\r\n      let calculate = (day) => {\r\n        let n = 0 // accumulate\r\n        for (let key in history) {\r\n          let item = history[key]\r\n          if (item.day <= day) {\r\n            if (item.product === constant.PRODUCTS.CAR && item.amount > n) {\r\n              n += item.amount - n\r\n            }\r\n          } else {\r\n            break\r\n          }\r\n        }\r\n        return n\r\n      }\r\n\r\n      let dataTable = [['日子', '累積產量', '單日產量']]\r\n      let k = 0\r\n      for (let d = 1; d <= days; d++) {\r\n        let result = calculate(d)\r\n        k = result - k\r\n        dataTable.push([readable.toReadableDay(d), result, k])\r\n      }\r\n      let data = google.visualization.arrayToDataTable(dataTable)\r\n\r\n      let options = {\r\n        chartArea: {left: '15%', width: '85%', height: '70%'},\r\n        legend: { position: 'bottom' },\r\n        height: 300\r\n      }\r\n\r\n      let chart = new google.visualization.ColumnChart(document.getElementById('chart-productivity'))\r\n      chart.draw(data, options)\r\n    }\r\n  },\r\n  mounted () {\r\n    // this.loadChart()\r\n    // google.charts.setOnLoadCallback(this.loadChart)\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.end .chart-title {\r\n  margin-bottom: 0;\r\n  margin-top: 20px;\r\n}\r\n\r\n.end .divider {\r\n  margin-top: 20px;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"storage-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.game-clock .more-info {\r\n  font-size: 20px;\n}\n.game-clock .time {\r\n  font-size: 50px;\r\n  line-height: 50px;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/components/game-clock.vue?19ee63b2"],"names":[],"mappings":";AAiCA;EACA,gBAAA;CACA;AAEA;EACA,gBAAA;EACA,kBAAA;CACA","file":"game-clock.vue","sourcesContent":["<template>\r\n  <div class=\"game-clock\">\r\n    <v-card>\r\n      <v-card-text>\r\n        <span class=\"more-info\">{{ readableDay }}</span><br>\r\n        <span class=\"time\">{{ readableTime }}</span>\r\n      </v-card-text>\r\n    </v-card>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport * as api from '../lib/api'\r\nimport * as readable from '../lib/readable'\r\n\r\nexport default {\r\n  data () {\r\n    return {\r\n      state: api.nowUser.getDayTime()\r\n    }\r\n  },\r\n  computed: {\r\n    readableTime: function () {\r\n      return readable.toReadableTime(this.state.time)\r\n    },\r\n    readableDay: function () {\r\n      return readable.toReadableDay(this.state.day)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.game-clock .more-info {\r\n  font-size: 20px;\r\n}\r\n\r\n.game-clock .time {\r\n  font-size: 50px;\r\n  line-height: 50px;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"team-storage-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"deliver-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"storage-register-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"news-list.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.regist .code-text {\n  width: 100%;\n  margin-top: 10px;\n  font-size: 50px;\n  line-height: 80px;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.02);\n  border: 1px solid #ddd;\n}\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/regist/new/index.vue?a4720bca"],"names":[],"mappings":";AAqDA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sCAAA;EACA,uBAAA;CACA","file":"index.vue","sourcesContent":["<template>\n  <div class=\"regist\">\n    <v-toolbar class=\"green\">\n      <v-toolbar-title class=\"white--text\">{{ title }}</v-toolbar-title>\n    </v-toolbar>\n    <main>\n      <v-card>\n        <v-card-text>\n          <p>這個認證碼代表著你的身分，如果之後想要重新進入遊戲的話，你必須輸入這個認證碼。</p>\n          <p><b>請將認證碼記錄下來</b>，以備等一下所需。</p>\n          <input class=\"code-text\" :value=\"code\"></input>\n        </v-card-text>\n        <v-card-actions>\n          <v-btn class=\"blue--text darken-1\" flat @click.native=\"intoRegistOld\">我已經有認證碼</v-btn>\n          <v-spacer></v-spacer>\n          <v-btn primary @click.native=\"intoRegistPlayer\">知道了</v-btn>\n        </v-card-actions>\n      </v-card>\n      <v-layout row>\n      </v-layout>\n    </main>\n  </div>\n</template>\n\n<script>\nimport {router} from '../../../router'\nimport * as constant from '../../../lib/constant'\nimport * as readable from '../../../lib/readable'\nimport * as api from '../../../lib/api'\n\nexport default {\n  data () {\n    return {\n      title: '認證碼',\n      code: '1234'\n    }\n  },\n  methods: {\n    intoRegistOld () {\n      router.push('/regist/old')\n    },\n    intoRegistPlayer () {\n      router.push('/regist/player')\n    },\n    announce (msg) {\n      this.snackbarText = msg\n      this.snackbar = true\n    }\n  }\n}\n</script>\n\n<style>\n.regist .code-text {\n  width: 100%;\n  margin-top: 10px;\n  font-size: 50px;\n  line-height: 80px;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.02);\n  border: 1px solid #ddd;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"order-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.regist .code-text {\n  width: 100%;\n  margin-top: 10px;\n  font-size: 50px;\n  line-height: 80px;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.02);\n  border: 1px solid #ddd;\n}\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/regist/old/index.vue?23617644"],"names":[],"mappings":";AAiFA;EACA,YAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;EACA,mBAAA;EACA,sCAAA;EACA,uBAAA;CACA","file":"index.vue","sourcesContent":["<template>\n  <div class=\"regist\">\n    <v-toolbar class=\"green\">\n      <v-btn icon v-on:click.native=\"backToRegistNew\">\n        <v-icon>arrow_back</v-icon>\n      </v-btn>\n      <v-toolbar-title class=\"white--text\">{{ title }}</v-toolbar-title>\n    </v-toolbar>\n    <main>\n      <v-card>\n        <v-card-text>\n          <p>請輸入你的認證碼。</p>\n          <input class=\"code-text\" v-model=\"code\"></input>\n        </v-card-text>\n        <v-card-actions>\n          <v-spacer></v-spacer>\n          <v-btn primary @click.native.stop=\"setCode\" :disabled=\"btnDisabled\">確定</v-btn>\n        </v-card-actions>\n      </v-card>\n      <v-layout row>\n      </v-layout>\n    </main>\n    <v-dialog v-model=\"errorDialog\">\n      <v-card>\n        <v-card-title class=\"headline\">錯誤</v-card-title>\n        <v-card-text>{{ errorDialogMsg }}</v-card-text>\n        <v-card-actions>\n          <v-spacer></v-spacer>\n          <v-btn class=\"green--text darken-1\" flat=\"flat\" @click.native=\"errorDialog = false\">知道了</v-btn>\n        </v-card-actions>\n      </v-card>\n    </v-dialog>\n  </div>\n</template>\n\n<script>\nimport {router} from '../../../router'\nimport * as constant from '../../../lib/constant'\nimport * as readable from '../../../lib/readable'\nimport * as api from '../../../lib/api'\n\nexport default {\n  data () {\n    return {\n      title: '輸入認證碼',\n      code: null,\n      btnDisabled: true,\n      errorDialog: false,\n      errorDialogMsg: ''\n    }\n  },\n  watch: {\n    code () {\n      this.btnDisabled = !this.code\n    }\n  },\n  methods: {\n    backToRegistNew () {\n      router.push('/regist/new')\n    },\n    setCode () {\n      let code = parseInt(this.code)\n      if (code < 0 || code > 9999) {\n        this.errorDialogMsg = '你的認證碼不正確，應該是由四位數字組成。'\n        this.errorDialog = true\n      } else {\n        this.intoChoose()\n      }\n    },\n    intoChoose () {\n      router.push('/choose')\n    },\n    announce (msg) {\n      this.snackbarText = msg\n      this.snackbar = true\n    }\n  }\n}\n</script>\n\n<style>\n.regist .code-text {\n  width: 100%;\n  margin-top: 10px;\n  font-size: 50px;\n  line-height: 80px;\n  text-align: center;\n  background-color: rgba(0, 0, 0, 0.02);\n  border: 1px solid #ddd;\n}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.home {\r\n  min-height: 100%;\n}\n.home .head {\r\n  padding-top: 60px;\r\n  padding-bottom: 60px;\n}\n.home .layout {\r\n  padding-left: 14px;\r\n  padding-right: 14px;\n}\n.home .card {\r\n  height: 100% !important;\n}\n.home .card__text {\r\n  padding-right: 0;\r\n  padding-left: 0;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/page/home/index.vue?d61e0936"],"names":[],"mappings":";AA4BA;EACA,iBAAA;CACA;AAEA;EACA,kBAAA;EACA,qBAAA;CACA;AAEA;EACA,mBAAA;EACA,oBAAA;CACA;AAEA;EACA,wBAAA;CACA;AAEA;EACA,iBAAA;EACA,gBAAA;CACA","file":"index.vue","sourcesContent":["<template>\r\n  <div id=\"home\" class=\"home\">\r\n    <v-card>\r\n      <v-card-text class=\"text-xs-center head\">\r\n        <div class=\"logo\"></div>\r\n        <!--<h3>REDRO產銷遊戲</h3>-->\r\n        <h5>2017 工工營 BETA</h5>\r\n        <v-btn primary v-on:click.native=\"intoRegist\">進入遊戲</v-btn>\r\n      </v-card-text>\r\n    </v-card>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport * as api from '../../lib/api'\r\nimport * as enterApi from '../../lib/api/enter'\r\nimport {router} from '../../router'\r\n\r\nexport default {\r\n  methods: {\r\n    intoRegist () {\r\n      router.push('/regist')\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.home {\r\n  min-height: 100%;\r\n}\r\n\r\n.home .head {\r\n  padding-top: 60px;\r\n  padding-bottom: 60px;\r\n}\r\n\r\n.home .layout {\r\n  padding-left: 14px;\r\n  padding-right: 14px;\r\n}\r\n\r\n.home .card {\r\n  height: 100% !important;\r\n}\r\n\r\n.home .card__text {\r\n  padding-right: 0;\r\n  padding-left: 0;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"deliver-history.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"order-history.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"account-dialog.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.online-status .status-card {\r\n  color: #fff;\r\n  text-align: center;\r\n  font-size: 24px;\r\n  padding: 0 14px;\n}\n.online-status .status-card .flex {\r\n  padding-bottom: 16px;\n}\r\n", "", {"version":3,"sources":["d:/Coding/ieemgameview/src/components/online-status.vue?1a4daff2"],"names":[],"mappings":";AAgEA;EACA,YAAA;EACA,mBAAA;EACA,gBAAA;EACA,gBAAA;CACA;AAEA;EACA,qBAAA;CACA","file":"online-status.vue","sourcesContent":["<template>\r\n  <div class=\"online-status\">\r\n    <v-expansion-panel expand>\r\n      <v-expansion-panel-content>\r\n        <div slot=\"header\">小隊員</div>\r\n        <v-card class=\"status-card\">\r\n          <v-layout row wrap v-for=\"team in teamList\" :key=\"team.index\">\r\n            <v-flex xs3>\r\n              <v-card dark class=\"secondary\">\r\n                <v-card-text>{{ team.text }}</v-card-text>\r\n              </v-card>\r\n            </v-flex>\r\n            <v-flex xs3 v-for=\"job in jobList\" :key=\"job.index\">\r\n              <v-card dark class=\"secondary\">\r\n                <v-card-text>{{ job.text }}</v-card-text>\r\n              </v-card>\r\n            </v-flex>\r\n          </v-layout>\r\n        </v-card>\r\n      </v-expansion-panel-content>\r\n      <v-expansion-panel-content>\r\n        <div slot=\"header\">工作人員</div>\r\n        <v-card class=\"status-card\">\r\n          <v-layout row wrap>\r\n            <v-flex xs3 v-for=\"job in staffJobList\" :key=\"job.index\">\r\n              <v-card dark class=\"secondary\">\r\n                <v-card-text>{{ job.text }}</v-card-text>\r\n              </v-card>\r\n            </v-flex>\r\n          </v-layout>\r\n        </v-card>\r\n      </v-expansion-panel-content>\r\n    </v-expansion-panel>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport * as api from '../lib/api'\r\nimport * as readable from '../lib/readable'\r\n\r\nexport default {\r\n  props: [\r\n    'list'\r\n  ],\r\n  data () {\r\n    return {\r\n      teamNumber: 4\r\n    }\r\n  },\r\n  computed: {\r\n    jobList () {\r\n      return readable.readableJobList()\r\n    },\r\n    staffJobList () {\r\n      return readable.readableStaffJobList()\r\n    },\r\n    teamList () {\r\n      return readable.toReadableTeamList(this.teamNumber)\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style>\r\n.online-status .status-card {\r\n  color: #fff;\r\n  text-align: center;\r\n  font-size: 24px;\r\n  padding: 0 14px;\r\n}\r\n\r\n.online-status .status-card .flex {\r\n  padding-bottom: 16px;\r\n}\r\n</style>\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"info-panel.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"index.vue","sourceRoot":""}]);

// exports


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(138),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\account-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] account-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ab65ee20", Component.options)
  } else {
    hotAPI.reload("data-v-ab65ee20", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(148)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(118),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\deliver-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] deliver-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-479c0210", Component.options)
  } else {
    hotAPI.reload("data-v-479c0210", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(163)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(133),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\deliver-history.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] deliver-history.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f8145d8", Component.options)
  } else {
    hotAPI.reload("data-v-7f8145d8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(146)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(116),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\game-clock.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] game-clock.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c0700fb", Component.options)
  } else {
    hotAPI.reload("data-v-3c0700fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(170)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(140),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\info-panel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] info-panel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d248bca6", Component.options)
  } else {
    hotAPI.reload("data-v-d248bca6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(153)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(123),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\news-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] news-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5acaab00", Component.options)
  } else {
    hotAPI.reload("data-v-5acaab00", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(169)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(139),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\online-status.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] online-status.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6a15458", Component.options)
  } else {
    hotAPI.reload("data-v-b6a15458", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(158)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(128),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\order-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-690e4da2", Component.options)
  } else {
    hotAPI.reload("data-v-690e4da2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(135),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\order-history.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order-history.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c586c86", Component.options)
  } else {
    hotAPI.reload("data-v-8c586c86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(144)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(114),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\storage-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] storage-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-236ee4b8", Component.options)
  } else {
    hotAPI.reload("data-v-236ee4b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(149)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(119),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\storage-register-dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] storage-register-dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49d2e0f0", Component.options)
  } else {
    hotAPI.reload("data-v-49d2e0f0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(147)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(117),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\components\\team-storage-list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] team-storage-list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e8da948", Component.options)
  } else {
    hotAPI.reload("data-v-3e8da948", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(132),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\admin\\construct\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e28f8fb", Component.options)
  } else {
    hotAPI.reload("data-v-7e28f8fb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(156)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(126),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\game\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f9afce4", Component.options)
  } else {
    hotAPI.reload("data-v-5f9afce4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(152)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(122),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\job\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54cb8177", Component.options)
  } else {
    hotAPI.reload("data-v-54cb8177", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(115),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\ready\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-248c47c6", Component.options)
  } else {
    hotAPI.reload("data-v-248c47c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(150)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(120),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\choose\\team\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d53ae39", Component.options)
  } else {
    hotAPI.reload("data-v-4d53ae39", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(143)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(113),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\end\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1edf4d3f", Component.options)
  } else {
    hotAPI.reload("data-v-1edf4d3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(161)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(131),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\home\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e14ff51", Component.options)
  } else {
    hotAPI.reload("data-v-7e14ff51", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(155)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(125),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\regist\\new\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d772eb9", Component.options)
  } else {
    hotAPI.reload("data-v-5d772eb9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(159)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(129),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\regist\\old\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74dc7680", Component.options)
  } else {
    hotAPI.reload("data-v-74dc7680", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(157)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(127),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\regist\\player\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60d94dfe", Component.options)
  } else {
    hotAPI.reload("data-v-60d94dfe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(166)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(136),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\consoler\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9e3d9264", Component.options)
  } else {
    hotAPI.reload("data-v-9e3d9264", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(171)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(141),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\exchanger\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dd9992dc", Component.options)
  } else {
    hotAPI.reload("data-v-dd9992dc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(167)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(137),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\factory\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a5b505a6", Component.options)
  } else {
    hotAPI.reload("data-v-a5b505a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(151)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(121),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\guerrilla\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d5ec01c", Component.options)
  } else {
    hotAPI.reload("data-v-4d5ec01c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(154)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(124),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\market\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c493462", Component.options)
  } else {
    hotAPI.reload("data-v-5c493462", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(164)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(134),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\retailer\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-88d468fa", Component.options)
  } else {
    hotAPI.reload("data-v-88d468fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(130),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\transporter\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7946e6b9", Component.options)
  } else {
    hotAPI.reload("data-v-7946e6b9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(142)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(112),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "d:\\Coding\\ieemgameview\\src\\page\\round\\wholesaler\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12a6c147", Component.options)
  } else {
    hotAPI.reload("data-v-12a6c147", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('v-layout', {
    staticClass: "bg-box",
    attrs: {
      "row": ""
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-tabs', {
    attrs: {
      "id": "mobile-tabs-1",
      "grow": "",
      "scroll-bars": "",
      "light": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-tabs-bar', {
    staticClass: "tabs",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id,
        "ripple": ""
      }
    }, [_vm._v("\n            " + _vm._s(tab.title) + "\n          ")])
  }), _vm._v(" "), _c('v-tabs-slider')], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": 'storage'
    }
  }, [_c('storage-list', {
    attrs: {
      "list": _vm.state.storage
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": 'received-order'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.receivedOrder
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": 'order-history'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.orderHistory
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 3,
    attrs: {
      "id": 'deliver-history'
    }
  }, [_c('deliver-history', {
    attrs: {
      "list": _vm.state.deliverHistory
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('order-dialog', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state.isWorking),
      expression: "state.isWorking"
    }],
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-12a6c147", module.exports)
  }
}

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "end"
  }, [_c('main', [_c('v-tabs', {
    attrs: {
      "dark": "",
      "fixed": "",
      "centered": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-toolbar', {
    staticClass: "cyan elevation-0",
    attrs: {
      "dark": ""
    }
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToHome($event)
      }
    }
  }, [_c('v-icon', [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('v-tabs-bar', {
    staticClass: "cyan",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id
      }
    }, [_vm._v("\n          " + _vm._s(tab.title) + "\n        ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    staticClass: "yellow"
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": "charts"
    }
  }, [_c('v-card', [_c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.itemTeam,
      "label": "選擇小隊",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _vm._l((_vm.charts), function(chart, key) {
    return _c('div', {
      key: key
    }, [_c('h5', {
      staticClass: "chart-title"
    }, [_vm._v(_vm._s(chart.title))]), _vm._v(" "), _c('div', {
      attrs: {
        "id": chart.id
      }
    }), _vm._v(" "), (key + 1 < _vm.charts.length) ? _c('v-divider') : _vm._e()], 1)
  })], 2)], 1)], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": "game-info"
    }
  }, [_c('info-panel', {
    attrs: {
      "game-config": _vm.gameConfig
    }
  })], 1)], 1)], 1), _vm._v("\n  " + _vm._s(_vm.loadChart) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1edf4d3f", module.exports)
  }
}

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableStorageList,
      "hide-actions": ""
    },
    scopedSlots: _vm._u([
      ["items", function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableProduct))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.amount))])]
      }]
    ])
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-236ee4b8", module.exports)
  }
}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home choose"
  }, [_c('v-toolbar', {
    staticClass: "orange elevation-5"
  }, [_c('v-toolbar-title', [_vm._v("首頁")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', {
    staticClass: "white--text"
  }), _vm._v(" "), _c('v-progress-circular', {
    staticClass: "white--text",
    attrs: {
      "indeterminate": "",
      "size": 25
    }
  })], 1), _vm._v(" "), _c('main', [_c('div', {
    staticClass: "head text-xs-center"
  }, [_c('div', {
    staticClass: "logo"
  }), _vm._v(" "), _c('h5', {
    staticClass: "headline"
  }, [_vm._v("請稍後，遊戲即將開始")]), _vm._v("\n      如果剛剛的講解有任何不清楚的地方，你現在可以向旁邊的隊輔們提出疑問，他們會為你解答。"), _c('br'), _c('br'), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "gray--text"
  }, [_vm._v(_vm._s(_vm.readableTeam) + " " + _vm._s(_vm.readableJob))])])]), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-248c47c6", module.exports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "game-clock"
  }, [_c('v-card', [_c('v-card-text', [_c('span', {
    staticClass: "more-info"
  }, [_vm._v(_vm._s(_vm.readableDay))]), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm.readableTime))])])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c0700fb", module.exports)
  }
}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "team-storage-list"
  }, [_c('v-card', {
    staticClass: "elevation-0"
  }, [_c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "item-value": "index",
      "label": "選擇組別",
      "single-line": "",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-select', {
    attrs: {
      "items": _vm.jobList,
      "item-value": "index",
      "label": "選擇工作",
      "single-line": "",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedJob),
      callback: function($$v) {
        _vm.selectedJob = $$v
      },
      expression: "selectedJob"
    }
  }), _vm._v(" "), _c('storage-list', {
    attrs: {
      "list": "storageList"
    }
  })], 1)], 1), _vm._v("\n  " + _vm._s(_vm.getStorageList) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e8da948", module.exports)
  }
}

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    staticClass: "dialog",
    attrs: {
      "persistent": ""
    },
    model: {
      value: (_vm.deliverDialog),
      callback: function($$v) {
        _vm.deliverDialog = $$v
      },
      expression: "deliverDialog"
    }
  }, [_c('v-btn', {
    class: _vm.btnClass,
    attrs: {
      "primary": "",
      "fab": "",
      "small": _vm.secondary
    },
    slot: "activator"
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("local_shipping")])], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("運輸貨物")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "label": "選擇組別",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-select', {
    attrs: {
      "items": _vm.jobList,
      "label": "從什麼工作",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedJob),
      callback: function($$v) {
        _vm.selectedJob = $$v
      },
      expression: "selectedJob"
    }
  }), _vm._v(" "), _c('v-text-field', {
    key: "car",
    attrs: {
      "name": "car",
      "label": "車子",
      "type": "number",
      "suffix": "臺"
    },
    model: {
      value: (_vm.amount),
      callback: function($$v) {
        _vm.amount = $$v
      },
      expression: "amount"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.deliverDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.deliver($event)
      }
    }
  }, [_vm._v("運貨")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-479c0210", module.exports)
  }
}

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    staticClass: "dialog",
    attrs: {
      "persistent": "",
      "fullscreen": ""
    },
    model: {
      value: (_vm.storageRegisterDialog),
      callback: function($$v) {
        _vm.storageRegisterDialog = $$v
      },
      expression: "storageRegisterDialog"
    }
  }, [_c('v-btn', {
    class: _vm.btnClass,
    attrs: {
      "primary": "",
      "fab": "",
      "small": _vm.secondary === true
    },
    slot: "activator"
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("widgets")])], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("登記囤貨")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "label": "選擇組別",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _vm._l((_vm.productList), function(product) {
    return _c('div', [_c('v-text-field', {
      key: product.index,
      attrs: {
        "label": product.text,
        "type": "number",
        "suffix": "個"
      },
      model: {
        value: (_vm.amount[product.index]),
        callback: function($$v) {
          var $$exp = _vm.amount,
            $$idx = product.index;
          if (!Array.isArray($$exp)) {
            _vm.amount[product.index] = _vm._n($$v)
          } else {
            $$exp.splice($$idx, 1, _vm._n($$v))
          }
        },
        expression: "amount[product.index]"
      }
    })], 1)
  })], 2), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.storageRegisterDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.register($event)
      }
    }
  }, [_vm._v("登記")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-49d2e0f0", module.exports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choose"
  }, [_c('v-toolbar', {
    staticClass: "orange"
  }, [_c('v-toolbar-title', [_vm._v("首頁")])], 1), _vm._v(" "), _c('main', [_c('h5', [_vm._v("請選擇你的小隊")]), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-list', {
    staticClass: "list"
  }, [_vm._l((_vm.itemTeam), function(item, index) {
    return [_c('v-list-tile', {
      key: index,
      nativeOn: {
        "click": function($event) {
          _vm.intoTeam(item.index)
        }
      }
    }, [_c('v-list-tile-content', [_c('v-list-tile-title', {
      domProps: {
        "textContent": _vm._s(item.text)
      }
    })], 1)], 1), _vm._v(" "), (index + 1 < _vm.itemTeam.length) ? _c('v-divider') : _vm._e()]
  })], 2)], 1)], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d53ae39", module.exports)
  }
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main'), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d5ec01c", module.exports)
  }
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choose"
  }, [_c('v-toolbar', {
    staticClass: "orange"
  }, [_c('v-toolbar-title', [_vm._v("首頁")])], 1), _vm._v(" "), _c('main', [_c('h5', [_vm._v("請選擇你的工作")]), _vm._v(" "), _c('v-subheader', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showSubTitle),
      expression: "showSubTitle"
    }]
  }, [_vm._v("隊輔請協助小組分配工作")]), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-divider'), _vm._v(" "), _c('v-list', {
    staticClass: "list"
  }, [_vm._l((_vm.itemJob), function(item, index) {
    return [_c('v-list-tile', {
      key: index,
      nativeOn: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.previewJob(item.index)
        }
      }
    }, [_c('v-list-tile-content', [_c('v-list-tile-title', {
      domProps: {
        "textContent": _vm._s(item.text)
      }
    })], 1)], 1), _vm._v(" "), (index + 1 < _vm.itemJob.length) ? _c('v-divider') : _vm._e()]
  })], 2)], 1), _vm._v(" "), _c('v-dialog', {
    staticClass: "dialog",
    model: {
      value: (_vm.dialog),
      callback: function($$v) {
        _vm.dialog = $$v
      },
      expression: "dialog"
    }
  }, [_c('v-card', [_c('v-card-title', [_vm._v("工作確認")]), _vm._v(" "), _c('v-card-text', [_vm._v("\n          請確定你是" + _vm._s(_vm.readableTeam) + "的" + _vm._s(_vm.readableJob) + "。\n        ")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.dialog = false
      }
    }
  }, [_vm._v("重新選擇")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoJob(_vm.job)
      }
    }
  }, [_vm._v("確定")])], 1)], 1)], 1)], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-54cb8177", module.exports)
  }
}

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', _vm._l((_vm.newsList), function(news) {
    return _c('v-card', {
      key: news.id
    }, [_c('v-card-media', {
      staticClass: "white--text",
      attrs: {
        "height": "200px",
        "src": news.picture
      }
    }, [_c('v-container', {
      attrs: {
        "fill-height": "",
        "fluid": ""
      }
    }, [_c('v-layout', {
      attrs: {
        "fill-height": ""
      }
    }, [_c('v-flex', {
      attrs: {
        "xs12": "",
        "align-end": "",
        "flexbox": ""
      }
    }, [_c('span', {
      staticClass: "headline"
    }, [_vm._v(_vm._s(news.title))])])], 1)], 1)], 1), _vm._v(" "), _c('v-card-title', [_c('div', [_c('span', {
      staticClass: "grey--text"
    }, [_vm._v("發布時間：第" + _vm._s(news.day) + "天")]), _c('br'), _vm._v(" "), _c('span', {
      staticClass: "grey--text"
    }, [_vm._v("需求數量：" + _vm._s(news.demanded) + "臺車")]), _c('br'), _vm._v(" "), _c('span', [_vm._v(_vm._s(news.content))])])])], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5acaab00", module.exports)
  }
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('deliver-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5c493462", module.exports)
  }
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regist"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('p', [_vm._v("這個認證碼代表著你的身分，如果之後想要重新進入遊戲的話，你必須輸入這個認證碼。")]), _vm._v(" "), _c('p', [_c('b', [_vm._v("請將認證碼記錄下來")]), _vm._v("，以備等一下所需。")]), _vm._v(" "), _c('input', {
    staticClass: "code-text",
    domProps: {
      "value": _vm.code
    }
  })]), _vm._v(" "), _c('v-card-actions', [_c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegistOld($event)
      }
    }
  }, [_vm._v("我已經有認證碼")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegistPlayer($event)
      }
    }
  }, [_vm._v("知道了")])], 1)], 1), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5d772eb9", module.exports)
  }
}

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choose"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-container', {
    staticStyle: {
      "min-height": "0"
    },
    attrs: {
      "fluid": "",
      "grid-list-lg": ""
    }
  }, [_c('v-layout', {
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, _vm._l((_vm.gameList), function(item, index) {
    return _c('v-flex', {
      key: index,
      attrs: {
        "xs12": ""
      }
    }, [_c('v-card', {
      staticClass: "cyan darken-2 white--text"
    }, [_c('v-card-title', {
      attrs: {
        "primary-title": ""
      }
    }, [_c('div', {
      staticClass: "headline"
    }, [_vm._v(_vm._s(item.text))]), _c('br'), _vm._v(" "), _c('div', [_vm._v(_vm._s(item.describe))])]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
      attrs: {
        "flat": "",
        "dark": ""
      },
      nativeOn: {
        "click": function($event) {
          _vm.intoGame(item.index, item.gameConfig)
        }
      }
    }, [_vm._v("進入遊戲")])], 1)], 1)], 1)
  }))], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f9afce4", module.exports)
  }
}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regist"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToRegistNew($event)
      }
    }
  }, [_c('v-icon', [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('p', [_vm._v("請輸入你的暱稱。")]), _vm._v(" "), _c('p', [_vm._v("你的暱稱可以是你的名字、你的綽號，或任何你想的到的字詞。")]), _vm._v(" "), _c('v-text-field', {
    staticStyle: {
      "margin-top": "70px"
    },
    attrs: {
      "label": "暱稱"
    },
    model: {
      value: (_vm.nickname),
      callback: function($$v) {
        _vm.nickname = $$v
      },
      expression: "nickname"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegistStaff($event)
      }
    }
  }, [_vm._v("我是工作人員")]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.setName($event)
      }
    }
  }, [_vm._v("確定")])], 1)], 1), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  })], 1), _vm._v(" "), _c('v-dialog', {
    model: {
      value: (_vm.errorDialog),
      callback: function($$v) {
        _vm.errorDialog = $$v
      },
      expression: "errorDialog"
    }
  }, [_c('v-card', [_c('v-card-title', {
    staticClass: "headline"
  }, [_vm._v("你的暱稱不適用")]), _vm._v(" "), _c('v-card-text', [_vm._v(_vm._s(_vm.errorDialogMsg))]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "green--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.errorDialog = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60d94dfe", module.exports)
  }
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    staticClass: "dialog",
    model: {
      value: (_vm.orderDialog),
      callback: function($$v) {
        _vm.orderDialog = $$v
      },
      expression: "orderDialog"
    }
  }, [_c('v-btn', {
    class: _vm.btnClass,
    attrs: {
      "primary": "",
      "fab": "",
      "small": _vm.secondary
    },
    slot: "activator"
  }, [_c('v-icon', {
    staticClass: "white--text"
  }, [_vm._v("add_shopping_cart")])], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("你想要訂購多少呢？")]), _vm._v(" "), _c('v-card-text', [_c('v-text-field', {
    attrs: {
      "name": "order-number",
      "label": "訂購數量",
      "id": "order-number",
      "type": "number"
    },
    model: {
      value: (_vm.amount),
      callback: function($$v) {
        _vm.amount = $$v
      },
      expression: "amount"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.orderDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.order($event)
      }
    }
  }, [_vm._v("訂購")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-690e4da2", module.exports)
  }
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regist"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-btn', {
    attrs: {
      "icon": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.backToRegistNew($event)
      }
    }
  }, [_c('v-icon', [_vm._v("arrow_back")])], 1), _vm._v(" "), _c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-text', [_c('p', [_vm._v("請輸入你的認證碼。")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.code),
      expression: "code"
    }],
    staticClass: "code-text",
    domProps: {
      "value": (_vm.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.code = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": "",
      "disabled": _vm.btnDisabled
    },
    nativeOn: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.setCode($event)
      }
    }
  }, [_vm._v("確定")])], 1)], 1), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  })], 1), _vm._v(" "), _c('v-dialog', {
    model: {
      value: (_vm.errorDialog),
      callback: function($$v) {
        _vm.errorDialog = $$v
      },
      expression: "errorDialog"
    }
  }, [_c('v-card', [_c('v-card-title', {
    staticClass: "headline"
  }, [_vm._v("錯誤")]), _vm._v(" "), _c('v-card-text', [_vm._v(_vm._s(_vm.errorDialogMsg))]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "green--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.errorDialog = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74dc7680", module.exports)
  }
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('team-storage-list'), _vm._v(" "), _c('deliver-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7946e6b9", module.exports)
  }
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home",
    attrs: {
      "id": "home"
    }
  }, [_c('v-card', [_c('v-card-text', {
    staticClass: "text-xs-center head"
  }, [_c('div', {
    staticClass: "logo"
  }), _vm._v(" "), _c('h5', [_vm._v("2017 工工營 BETA")]), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.intoRegist($event)
      }
    }
  }, [_vm._v("進入遊戲")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e14ff51", module.exports)
  }
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('v-toolbar', {
    staticClass: "cyan",
    attrs: {
      "dark": ""
    }
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))])], 1), _vm._v(" "), _c('main', [_c('v-card', [_c('v-card-title', {
    attrs: {
      "primary-title": ""
    }
  }, [_vm._v("Create a Game")]), _vm._v(" "), _c('v-card-text', [_c('v-text-field', {
    attrs: {
      "label": "Config",
      "single-line": "",
      "multi-line": ""
    },
    model: {
      value: (_vm.configText),
      callback: function($$v) {
        _vm.configText = $$v
      },
      expression: "configText"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "orange--text",
    attrs: {
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.newGame($event)
      }
    }
  }, [_vm._v("CREATE")])], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7e28f8fb", module.exports)
  }
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableDeliverList,
      "hide-actions": ""
    },
    scopedSlots: _vm._u([
      ["items", function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableGameTime))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.amount))])]
      }]
    ])
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7f8145d8", module.exports)
  }
}

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('v-layout', {
    staticClass: "bg-box",
    attrs: {
      "row": ""
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-tabs', {
    attrs: {
      "id": "mobile-tabs-1",
      "grow": "",
      "scroll-bars": "",
      "light": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-tabs-bar', {
    staticClass: "tabs",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id,
        "ripple": ""
      }
    }, [_vm._v("\n            " + _vm._s(tab.title) + "\n          ")])
  }), _vm._v(" "), _c('v-tabs-slider')], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": 'storage'
    }
  }, [_c('storage-list', {
    attrs: {
      "list": _vm.state.storage
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": 'news-list'
    }
  }, [_c('news-list', {
    attrs: {
      "list": _vm.state.news
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": 'order-history'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.orderHistory
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 3,
    attrs: {
      "id": 'deliver-history'
    }
  }, [_c('deliver-history', {
    attrs: {
      "list": _vm.state.deliverHistory
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('order-dialog', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.state.isWorking),
      expression: "state.isWorking"
    }],
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-88d468fa", module.exports)
  }
}

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-data-table', {
    attrs: {
      "headers": _vm.header,
      "items": _vm.readableOrderList,
      "hide-actions": ""
    },
    scopedSlots: _vm._u([
      ["items", function(props) {
        return [_c('td', [_vm._v(_vm._s(props.item.readableGameTime))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.amount))]), _vm._v(" "), _c('td', {
          staticClass: "text-xs-right"
        }, [_vm._v(_vm._s(props.item.delivered))])]
      }]
    ])
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8c586c86", module.exports)
  }
}

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('main', [_c('v-tabs', {
    attrs: {
      "dark": "",
      "fixed": "",
      "centered": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-toolbar', {
    staticClass: "cyan elevation-0",
    attrs: {
      "dark": ""
    }
  }, [_c('v-toolbar-title', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('v-tabs-bar', {
    staticClass: "cyan",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id
      }
    }, [_vm._v("\n          " + _vm._s(tab.title) + "\n        ")])
  }), _vm._v(" "), _c('v-tabs-slider', {
    staticClass: "yellow"
  })], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": "online-status"
    }
  }, [_c('online-status')], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": "dynamic-log"
    }
  }, [_c('v-card', [_c('v-card-title', [_vm._v("階段管理")]), _vm._v(" "), _c('v-card-text', [_c('ul', [_c('li', [_vm._v("確定list")])])]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.nextGameStage($event)
      }
    }
  }, [_vm._v("下一階段")])], 1)], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("下一天")]), _vm._v(" "), _c('v-card-text', [_c('ul', [_c('li', [_vm._v("確定list")])])]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.nextDay($event)
      }
    }
  }, [_vm._v("下一天")])], 1)], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("特別功能")]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('account-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1)], 1), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("處理速度測試")]), _vm._v(" "), _c('v-card-text', [_c('ul', [_c('li', [_vm._v("確定list")])])]), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    attrs: {
      "primary": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.test($event)
      }
    }
  }, [_vm._v("測試")])], 1)], 1)], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": "game-info"
    }
  }, [_c('info-panel', {
    attrs: {
      "game-config": _vm.gameConfig
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9e3d9264", module.exports)
  }
}

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('v-layout', {
    staticClass: "bg-box",
    attrs: {
      "row": ""
    }
  }), _vm._v(" "), _c('v-layout', {
    attrs: {
      "row": ""
    }
  }, [_c('v-tabs', {
    attrs: {
      "id": "mobile-tabs-1",
      "grow": "",
      "scroll-bars": "",
      "light": ""
    },
    model: {
      value: (_vm.activeTab),
      callback: function($$v) {
        _vm.activeTab = $$v
      },
      expression: "activeTab"
    }
  }, [_c('v-tabs-bar', {
    staticClass: "tabs",
    slot: "activators"
  }, [_vm._l((_vm.tabs), function(tab) {
    return _c('v-tabs-item', {
      key: tab.index,
      attrs: {
        "href": '#' + tab.id,
        "ripple": ""
      }
    }, [_vm._v("\n            " + _vm._s(tab.title) + "\n          ")])
  }), _vm._v(" "), _c('v-tabs-slider')], 2), _vm._v(" "), _c('v-tabs-content', {
    key: 0,
    attrs: {
      "id": 'storage'
    }
  }, [_c('storage-list', {
    attrs: {
      "list": _vm.state.storage
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 1,
    attrs: {
      "id": 'received-order'
    }
  }, [_c('order-history', {
    attrs: {
      "list": _vm.state.receivedOrder
    }
  })], 1), _vm._v(" "), _c('v-tabs-content', {
    key: 2,
    attrs: {
      "id": 'deliver-history'
    }
  }, [_c('deliver-history', {
    attrs: {
      "list": _vm.state.deliverHistory
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a5b505a6", module.exports)
  }
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-dialog', {
    staticClass: "inline-dialog",
    attrs: {
      "persistent": ""
    },
    model: {
      value: (_vm.accountDialog),
      callback: function($$v) {
        _vm.accountDialog = $$v
      },
      expression: "accountDialog"
    }
  }, [_c('v-btn', {
    staticClass: "activator",
    attrs: {
      "primary": ""
    },
    slot: "activator"
  }, [_vm._v("\n    變更組別金額\n  ")]), _vm._v(" "), _c('v-card', [_c('v-card-title', [_vm._v("變更組別金額")]), _vm._v(" "), _c('v-card-text', [_c('v-select', {
    attrs: {
      "items": _vm.teamList,
      "label": "選擇組別",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedTeam),
      callback: function($$v) {
        _vm.selectedTeam = $$v
      },
      expression: "selectedTeam"
    }
  }), _vm._v(" "), _c('v-select', {
    attrs: {
      "items": _vm.actionList,
      "label": "給予或拿取",
      "single-line": "",
      "item-value": "index",
      "bottom": ""
    },
    model: {
      value: (_vm.selectedAction),
      callback: function($$v) {
        _vm.selectedAction = $$v
      },
      expression: "selectedAction"
    }
  }), _vm._v(" "), _c('v-text-field', {
    attrs: {
      "label": "金額",
      "type": "number",
      "suffix": "元"
    },
    model: {
      value: (_vm.balance),
      callback: function($$v) {
        _vm.balance = $$v
      },
      expression: "balance"
    }
  })], 1), _vm._v(" "), _c('v-card-actions', [_c('v-spacer'), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.accountDialog = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('v-btn', {
    staticClass: "blue--text darken-1",
    attrs: {
      "flat": "flat"
    },
    nativeOn: {
      "click": function($event) {
        _vm.act($event)
      }
    }
  }, [_vm._v("登記")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ab65ee20", module.exports)
  }
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "online-status"
  }, [_c('v-expansion-panel', {
    attrs: {
      "expand": ""
    }
  }, [_c('v-expansion-panel-content', [_c('div', {
    slot: "header"
  }, [_vm._v("小隊員")]), _vm._v(" "), _c('v-card', {
    staticClass: "status-card"
  }, _vm._l((_vm.teamList), function(team) {
    return _c('v-layout', {
      key: team.index,
      attrs: {
        "row": "",
        "wrap": ""
      }
    }, [_c('v-flex', {
      attrs: {
        "xs3": ""
      }
    }, [_c('v-card', {
      staticClass: "secondary",
      attrs: {
        "dark": ""
      }
    }, [_c('v-card-text', [_vm._v(_vm._s(team.text))])], 1)], 1), _vm._v(" "), _vm._l((_vm.jobList), function(job) {
      return _c('v-flex', {
        key: job.index,
        attrs: {
          "xs3": ""
        }
      }, [_c('v-card', {
        staticClass: "secondary",
        attrs: {
          "dark": ""
        }
      }, [_c('v-card-text', [_vm._v(_vm._s(job.text))])], 1)], 1)
    })], 2)
  }))], 1), _vm._v(" "), _c('v-expansion-panel-content', [_c('div', {
    slot: "header"
  }, [_vm._v("工作人員")]), _vm._v(" "), _c('v-card', {
    staticClass: "status-card"
  }, [_c('v-layout', {
    attrs: {
      "row": "",
      "wrap": ""
    }
  }, _vm._l((_vm.staffJobList), function(job) {
    return _c('v-flex', {
      key: job.index,
      attrs: {
        "xs3": ""
      }
    }, [_c('v-card', {
      staticClass: "secondary",
      attrs: {
        "dark": ""
      }
    }, [_c('v-card-text', [_vm._v(_vm._s(job.text))])], 1)], 1)
  }))], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b6a15458", module.exports)
  }
}

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "info-panel"
  }, [_c('v-card', [_c('v-card-title', {
    attrs: {
      "primary-title": ""
    }
  }, [_vm._v(_vm._s(_vm.gameConfig.title) + " 資訊")]), _vm._v(" "), _c('v-card-text', [_c('ul', [_c('li', [_vm._v("組別數：" + _vm._s(_vm.gameConfig.teamNumber) + "組")]), _vm._v(" "), _c('li', [_vm._v("各組人數：" + _vm._s(JSON.stringify(_vm.gameConfig.teammembers)) + "人")]), _vm._v(" "), _c('li', [_vm._v("天數：" + _vm._s(_vm.gameConfig.days) + "天")]), _vm._v(" "), _c('li', [_vm._v("每天長度：" + _vm._s(_vm.gameConfig.dayLong) + "秒")]), _vm._v(" "), _c('li', [_vm._v("預設帳戶餘額：" + _vm._s(_vm.gameConfig.defaultBalance) + "元")]), _vm._v(" "), _c('li', [_vm._v("工人薪資：" + _vm._s(_vm.gameConfig.cost.wage) + "元／日")])])])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d248bca6", module.exports)
  }
}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "round"
  }, [_c('v-toolbar', {
    staticClass: "green"
  }, [_c('v-toolbar-title', {
    staticClass: "white--text"
  }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('v-spacer'), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.toolbarInfo))])], 1), _vm._v(" "), _c('main', [_c('team-storage-list'), _vm._v(" "), _c('storage-register-dialog', {
    attrs: {
      "announce": _vm.announce
    }
  })], 1), _vm._v(" "), _c('v-snackbar', {
    attrs: {
      "timeout": 6000,
      "secondary": ""
    },
    model: {
      value: (_vm.snackbar),
      callback: function($$v) {
        _vm.snackbar = $$v
      },
      expression: "snackbar"
    }
  }, [_vm._v("\n    " + _vm._s(_vm.snackbarText) + "\n    "), _c('v-btn', {
    attrs: {
      "dark": "",
      "flat": ""
    },
    nativeOn: {
      "click": function($event) {
        _vm.snackbar = false
      }
    }
  }, [_vm._v("知道了")])], 1), _vm._v("\n  " + _vm._s(_vm.intoBelong) + "\n")], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-dd9992dc", module.exports)
  }
}

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4dbb9981", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-12a6c147\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-12a6c147\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("e2fd68e4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1edf4d3f\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1edf4d3f\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7ca81723", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-236ee4b8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-236ee4b8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(55);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3cbd76dd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-248c47c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-248c47c6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f2d8ebbc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c0700fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./game-clock.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3c0700fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./game-clock.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("802de774", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e8da948\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./team-storage-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e8da948\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./team-storage-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("b605f36c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-479c0210\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-479c0210\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(59);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("545445d8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49d2e0f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-register-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-49d2e0f0\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./storage-register-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("26dacadc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d53ae39\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d53ae39\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("55475a39", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d5ec01c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4d5ec01c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6ae9515e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54cb8177\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-54cb8177\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0ec84042", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5acaab00\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news-list.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5acaab00\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./news-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("bdd2842c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c493462\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5c493462\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ce323b9a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d772eb9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5d772eb9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4cef483f", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f9afce4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f9afce4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1182d6b8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60d94dfe\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-60d94dfe\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8ac6a030", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-690e4da2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-690e4da2\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("98246aa6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74dc7680\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-74dc7680\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4139b2e6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7946e6b9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7946e6b9\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("f02d92cc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e14ff51\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e14ff51\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d553e848", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e28f8fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7e28f8fb\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("07367f5d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f8145d8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-history.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f8145d8\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./deliver-history.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("551e1147", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-88d468fa\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-88d468fa\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(75);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7b969970", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8c586c86\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-history.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8c586c86\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order-history.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ad6f5ca4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e3d9264\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e3d9264\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("39a0a83b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a5b505a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a5b505a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(78);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3f010a02", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ab65ee20\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./account-dialog.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ab65ee20\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./account-dialog.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(79);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9ad1f1f4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b6a15458\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./online-status.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b6a15458\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./online-status.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("dcdb434a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d248bca6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./info-panel.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d248bca6\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./info-panel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(81);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1a5cb3b2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dd9992dc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-dd9992dc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map