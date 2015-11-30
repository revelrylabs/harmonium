'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactDocumentMeta = require('react-document-meta');

var _reactDocumentMeta2 = _interopRequireDefault(_reactDocumentMeta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Html = (function (_Component) {
  _inherits(Html, _Component);

  function Html() {
    _classCallCheck(this, Html);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Html).apply(this, arguments));
  }

  _createClass(Html, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var assets = _props.assets;
      var component = _props.component;
      var store = _props.store;

      var content = component ? _server2.default.renderToString(component) : '';

      return _react2.default.createElement(
        'html',
        { lang: 'en-us' },
        _react2.default.createElement(
          'head',
          null,
          _reactDocumentMeta2.default.renderAsReact(),
          _react2.default.createElement('link', { rel: 'shortcut icon', href: '/favicon.ico' }),
          _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
          this.stylesheets,
          Object.keys(assets.styles).length === 0 ? _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style } }) : null
        ),
        _react2.default.createElement(
          'body',
          null,
          _react2.default.createElement('div', { id: 'content', dangerouslySetInnerHTML: { __html: content } }),
          _react2.default.createElement('script', {
            dangerouslySetInnerHTML: { __html: 'window.__data=' + serialize(store.getState()) + ';' },
            charSet: 'UTF-8'
          }),
          _react2.default.createElement('script', { src: assets.javascript.main, charSet: 'UTF-8' })
        )
      );
    }
  }, {
    key: 'stylesheets',
    get: function get() {
      var styles = this.props.assets.styles;

      return Object.keys(styles).map(function (key) {
        return _react2.default.createElement('link', {
          href: styles[key],
          key: key,
          media: 'screen, projection',
          rel: 'stylesheet',
          type: 'text/css',
          charSet: 'UTF-8'
        });
      });
    }
  }]);

  return Html;
})(_react.Component);

Html.propTypes = {
  assets: _react.PropTypes.object,
  component: _react.PropTypes.node,
  store: _react.PropTypes.object
};
exports.default = Html;
//# sourceMappingURL=Html.js.map