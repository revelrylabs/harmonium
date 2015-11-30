'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Rev) {

  function mixinListForObject(object) {
    var mixinList = object.mixins || [];
    mixinList.push(Rev.Mixins.Core);
    return _underscore2.default.uniq(mixinList);
  }

  function forEachMixin(object, fn) {
    var mixin, i, l;
    var mixinList = mixinListForObject(object);
    l = mixinList.length;
    for (i = 0; i < l; i++) {
      mixin = mixinList[i];
      fn(mixin);
    }
  }

  function decorateComponentMethod(componentMethod) {
    return function (name, object) {
      var componentClass = componentMethod.bind(Rev)(name, object);
      if (typeof object === 'function') {
        // ES6 class
        forEachMixin(object, function (mixin) {
          (0, _mixSpecIntoComponent2.default)(componentClass, mixin);
        });
      }
    };
  }

  Rev.appComponent = decorateComponentMethod(Rev.appComponent);
  Rev.registerComponent = decorateComponentMethod(Rev.registerComponent);

  Rev.appExample = decorateComponentMethod(Rev.appExample);
  Rev.registerExample = decorateComponentMethod(Rev.registerExample);
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _mixSpecIntoComponent = require('./mixSpecIntoComponent');

var _mixSpecIntoComponent2 = _interopRequireDefault(_mixSpecIntoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=enableMixins.js.map