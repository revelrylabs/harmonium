'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('StatelessTabContent', (function (_React$Component) {
  _inherits(StatelessTabContent, _React$Component);

  _createClass(StatelessTabContent, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        activeKey: React.PropTypes.string.isRequired
      };
    }
  }]);

  function StatelessTabContent(props) {
    _classCallCheck(this, StatelessTabContent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StatelessTabContent).call(this, props));

    _this.renderChild = _this.renderChild.bind(_this);
    return _this;
  }

  _createClass(StatelessTabContent, [{
    key: 'renderChild',
    value: function renderChild(child) {
      var newProps = {
        key: child.key,
        active: child.key === this.props.activeKey
      };
      return React.cloneElement(child, newProps);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: this.className },
        this.mapChildren(this.renderChild)
      );
    }
  }, {
    key: 'className',
    get: function get() {
      return this.classAdd({
        'RevTabs-content': true,
        'tabs-content': true
      });
    }
  }]);

  return StatelessTabContent;
})(React.Component));
//# sourceMappingURL=StatelessTabContent.js.map