'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var REV_ICON_BAR_SIZES = ['one', 'two', 'three', 'four', 'five', 'six'];

Rev.registerComponent('IconBar', (function (_React$Component) {
  _inherits(IconBar, _React$Component);

  function IconBar() {
    _classCallCheck(this, IconBar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IconBar).apply(this, arguments));
  }

  _createClass(IconBar, [{
    key: 'render',
    value: function render() {
      var classes = {
        'icon-bar': true,
        'RevIconBar': true,
        'vertical': this.props.vertical
      };

      for (var i = 0; i < REV_ICON_BAR_SIZES.length; i++) {
        var size = REV_ICON_BAR_SIZES[i];

        if (this.props[size]) {
          classes[size + '-up'] = true;
          break;
        }
      }

      return React.createElement(
        'div',
        { className: this.classAdd(classes) },
        this.props.children
      );
    }
  }]);

  return IconBar;
})(React.Component));
//# sourceMappingURL=IconBar.js.map