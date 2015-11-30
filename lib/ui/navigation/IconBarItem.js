'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// <IconBarItem type="FontAwesome" icon="cog" />
Rev.registerComponent('IconBarItem', (function (_React$Component) {
  _inherits(IconBarItem, _React$Component);

  function IconBarItem() {
    _classCallCheck(this, IconBarItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IconBarItem).apply(this, arguments));
  }

  _createClass(IconBarItem, [{
    key: 'render',
    value: function render() {
      var classes = {
        'item': true,
        'RevIconBarItem': true
      };

      return React.createElement(
        'a',
        _extends({}, this.props, { className: this.classAdd(classes) }),
        this.renderIcon(),
        React.createElement(
          'label',
          { className: 'RevIconBarItem-label' },
          this.props.children
        )
      );
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon() {
      var classNameObject = {
        'RevIconBarItem-icon': true
      };

      if (this.props.icon) {
        return React.createElement(Rev.Components.Icon, {
          type: this.props.type,
          icon: this.props.icon,
          className: this.classAdd(classNameObject)
        });
      }

      if (this.props.src) {
        return React.createElement('img', { src: this.props.src, className: this.classAdd(classNameObject) });
      }

      return null;
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        icon: React.PropTypes.string,
        type: React.PropTypes.string
      };
    }
  }]);

  return IconBarItem;
})(React.Component));
//# sourceMappingURL=IconBarItem.js.map