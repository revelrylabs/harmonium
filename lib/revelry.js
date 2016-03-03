'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _underscore3 = require('underscore.string');

var _underscore4 = _interopRequireDefault(_underscore3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _core = require('./mixins/core');

var _core2 = _interopRequireDefault(_core);

var _mixSpecIntoComponent = require('./mixSpecIntoComponent');

var _mixSpecIntoComponent2 = _interopRequireDefault(_mixSpecIntoComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_underscore2.default.str = _underscore4.default;

var ESCAPE_LOOKUP = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;'
};
var ESCAPE_REGEX = /[&><'']/g;

var App = {
  Mixins: {},
  Components: {},
  Examples: {}
};

var Revelry = (function () {
  function Revelry() {
    _classCallCheck(this, Revelry);
  }

  _createClass(Revelry, null, [{
    key: 'pathToObject',
    value: function pathToObject(container) {
      return function (path) {
        var parts = path.split('/');

        var object = container;

        for (var i = 0; i < parts.length; i++) {
          var key = parts[i];

          object = object[key];
          if (object === null || typeof object === 'undefined') {
            break;
          }
        }

        return object;
      };
    }
  }, {
    key: 'isServerContext',
    value: function isServerContext() {
      return typeof window === 'undefined';
    }
  }, {
    key: 'isClientContext',
    value: function isClientContext() {
      return !Revelry.isServerContext();
    }
  }, {
    key: 'appObject',
    value: function appObject(name, object) {
      return Revelry.registerObject('App.' + name, object);
    }
  }, {
    key: 'registerObject',
    value: function registerObject(name, object) {
      var parts = name.split('.');
      var container = Revelry;

      (0, _underscore2.default)(parts).each(function (part, i) {

        if (i === parts.length - 1) {
          if (container[part] !== null && typeof container[part] !== 'undefined' && name !== 'App.Components.Main') {
            console.warn('Object previously defined: ' + name);
          }
          container[part] = object;
        } else {
          container[part] = container[part] || {};
          container = container[part];
        }
      });

      return object;
    }
  }, {
    key: 'appComponent',
    value: function appComponent(name, object) {
      name = 'App.Components.' + name;
      return Revelry.registerObject(name, Revelry.createReactClass(name, object));
    }
  }, {
    key: 'registerComponent',
    value: function registerComponent(name, object) {
      name = 'Components.' + name;
      return Revelry.registerObject(name, Revelry.createReactClass('Revelry.' + name, object));
    }
  }, {
    key: 'createReactClass',
    value: function createReactClass(displayName, object) {
      object.displayName = displayName;

      // Initialize mixins to an empty array if it doesn't exist yet
      if (!object.mixins) {
        object.mixins = [];
      } else if (!(object.mixins instanceof Array)) {
        throw new Error(displayName + '\'s mixins property must be an array.');
      }

      // Check for inclusion of missing mixins
      object.mixins.forEach(function (mixin, index) {
        if (mixin === null || typeof mixin === 'undefined') {
          console.warn(displayName + ' attempted to include a missing mixin at index ' + index + '.');
        }
      });

      // Add Revelry Core mixin
      object.mixins.unshift(Revelry.Mixins.Core);

      if (typeof object === 'function') {
        object.mixins.forEach(function (mixin) {
          return (0, _mixSpecIntoComponent2.default)(object, mixin);
        });
      }

      if (typeof object === 'function') {
        // ES6 or Coffeescript class, OK as-is
        return object;
      }
      // Old style react class - pass to createClass
      return _react2.default.createClass(object);
    }
  }, {
    key: 'appMixin',
    value: function appMixin(name, object) {
      if (object === null || typeof object === 'undefined') {
        throw new Error('Missing mixin `' + name + '`');
      }
      return Revelry.registerObject('App.Mixins.' + name, object);
    }
  }, {
    key: 'registerMixin',
    value: function registerMixin(name, object) {
      if (object === null || typeof object === 'undefined') {
        throw new Error('Missing mixin `' + name + '`');
      }
      return Revelry.registerObject('Mixins.' + name, object);
    }
  }, {
    key: 'registerExample',
    value: function registerExample(name, object) {
      name = 'Examples.' + name;
      return Revelry.registerObject(name, Revelry.createReactClass('Revelry.' + name, object));
    }
  }, {
    key: 'appExample',
    value: function appExample(name, object) {
      name = 'App.Examples.' + name;
      return Revelry.registerObject(name, Revelry.createReactClass(name, object));
    }
  }, {
    key: 'registerModel',
    value: function registerModel(name, object) {
      return Revelry.registerObject('Models.' + name, object);
    }
  }, {
    key: 'appModel',
    value: function appModel(name, object) {
      return Revelry.registerObject('App.Models.' + name, object);
    }
  }, {
    key: 'pullInto',
    value: function pullInto(context) {
      console.warn('`Revelry.pullInto` is deprecated.');
      return function () {
        for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
          names[_key] = arguments[_key];
        }

        names.forEach(function (name) {
          return context[name] = Revelry.Components[name];
        });
      };
    }
  }, {
    key: '_escaper',
    value: function _escaper(match) {
      return ESCAPE_LOOKUP[match];
    }
  }, {
    key: 'escapeTextForBrowser',
    value: function escapeTextForBrowser(text) {
      return ('' + text).replace(ESCAPE_REGEX, Revelry._escaper);
    }
  }, {
    key: '_resetUniqueId',
    value: function _resetUniqueId() {
      var idCounter = 0;

      _underscore2.default.uniqueId = function (prefix) {
        var id = '' + ++idCounter;

        return prefix ? prefix + id : id;
      };
    }
  }, {
    key: 'hasView',
    value: function hasView(path) {
      console.log('hasView', path, Revelry.App.Components);
      return Revelry.Components.Main.hasView(path);
    }
  }, {
    key: 'viewToString',
    value: function viewToString(path, options) {
      console.log('viewToString', path, Revelry.App.Components);
      Revelry._resetUniqueId();

      var Main = Revelry.Components.Main;

      var props = {
        path: path,
        options: options
      };

      var json = Revelry.escapeTextForBrowser(JSON.stringify(props));

      var tag = function tag(inner) {
        return '<div data-react-class=\'App.Components.Main\' data-react-props=\'' + json + '\'>' + inner + '</div>';
      };

      var component = _react2.default.createElement(Main, props);

      // 2 checks: One is for standard Rails apps and one for jsonapi-resources.
      if (props.options.disable_prerender || props.options.meta && props.options.meta['disable-prerender']) {
        return tag;
      }

      try {
        return tag((0, _server.renderToString)(component));
      } catch (e) {
        return '<pre><code>' + path + '</code></pre>' + ('<pre><code>' + Revelry.escapeTextForBrowser(e.stack) + '</code></pre>') + tag('') + ('<pre><code>' + json + '</code></pre>');
      }
    }
  }, {
    key: 'initExecjsRails',
    value: function initExecjsRails() {
      global.execjs_rails_has_view = Revelry.hasView.bind(Revelry);
      global.execjs_rails_handler = Revelry.viewToString.bind(Revelry);
    }
  }]);

  return Revelry;
})();

Revelry.Mixins = {
  Core: _core2.default
};
Revelry.Components = {};
Revelry.Examples = {};
Revelry.App = App;

if (Revelry.isClientContext()) {
  window.global = window;
}

Revelry.registerComponent('Main', (function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
  }

  _createClass(Main, [{
    key: 'getChildComponentClassName',

    /* INSTANCE METHODS */

    value: function getChildComponentClassName() {
      return this.constructor.pathToComponentClassName(this.props.path);
    }
  }, {
    key: 'getChildComponentClass',
    value: function getChildComponentClass() {
      return this.constructor.pathToComponentClass(this.props.path);
    }

    // Some things are just easier when semi-global.
    // (Think CSRF token.)

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      Revelry.App.props = this.props.options;
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      Revelry.App.props = this.nextProps.options;
    }
  }, {
    key: 'render',
    value: function render() {
      var klass = this.getChildComponentClass();

      if (klass === null || typeof klass === 'undefined') {
        return _react2.default.createElement(
          'div',
          null,
          'Couldn\'t locate component `' + this.getChildComponentClassName() + '`'
        );
      }
      return this.constructor.createElement(klass, this.props.options);
    }
  }], [{
    key: 'pathToComponentClass',

    /* CLASS METHODS */

    value: function pathToComponentClass(path) {
      var parts = path.split('/');

      var klass = Revelry.App.Components;
      // console.log(Revelry.App.Components)

      for (var i = 0; i < parts.length; i++) {
        var key = parts[i];

        klass = klass[key];
        if (klass === null || typeof klass === 'undefined') {
          break;
        }
      }

      return klass;
    }
  }, {
    key: 'hasView',
    value: function hasView(path) {
      var klass = Main.pathToComponentClass(path);
      var found = klass !== null && typeof klass !== 'undefined';

      return found;
    }
  }, {
    key: 'createElement',
    value: function createElement(klass, props, children) {
      if (_react2.default.createElement !== null && typeof _react2.default.createElement !== 'undefined') {
        return _react2.default.createElement(klass, props, children);
      }
      return _react2.default.createElement(
        'klass',
        props,
        children
      );
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        path: _react2.default.PropTypes.string.isRequired,
        options: _react2.default.PropTypes.object
      };
    }
  }]);

  return Main;
})(_react2.default.Component));

// Application code can overwrite this to do whatever extra stuff you want.
Revelry.appComponent('Main', (function (_React$Component2) {
  _inherits(Main, _React$Component2);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
  }

  _createClass(Main, [{
    key: 'render',
    value: function render() {
      console.warn('Revelry application does not define a `Main` component. Falling back to default implementation.');
      return _react2.default.createElement(Revelry.Components.Main, this.props);
    }
  }]);

  return Main;
})(_react2.default.Component));

exports.default = Revelry;
//# sourceMappingURL=revelry.js.map