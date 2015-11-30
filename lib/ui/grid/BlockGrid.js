'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('BlockGrid', (function (_React$Component) {
  _inherits(BlockGrid, _React$Component);

  function BlockGrid() {
    _classCallCheck(this, BlockGrid);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BlockGrid).apply(this, arguments));
  }

  _createClass(BlockGrid, [{
    key: 'buildClassName',
    value: function buildClassName() {
      var _this2 = this;

      var classes = {
        'RevBlockGrid': true
      };

      var addNum = function addNum(propName) {
        var prop = _this2.props[propName];

        if (prop) {
          classes[propName + '-block-grid-' + prop] = true;
        }
      };

      addNum('small');
      addNum('medium');
      addNum('large');

      return this.classAdd(classes);
    }
  }, {
    key: 'render',
    value: function render() {
      console.warn('BlockGrid is deprecated.');
      return React.createElement(
        'ul',
        { className: this.buildClassName() },
        this.props.children
      );
    }
  }]);

  return BlockGrid;
})(React.Component));
//# sourceMappingURL=BlockGrid.js.map