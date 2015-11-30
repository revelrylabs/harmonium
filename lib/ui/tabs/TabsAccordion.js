"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('StatelessTabsAccordion', (function (_React$Component) {
  _inherits(StatelessTabsAccordion, _React$Component);

  function StatelessTabsAccordion() {
    _classCallCheck(this, StatelessTabsAccordion);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StatelessTabsAccordion).apply(this, arguments));
  }

  _createClass(StatelessTabsAccordion, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "RevAccordion accordion" },
        this.getNormalizedChildren().map(this.renderChild.bind(this))
      );
    }
  }, {
    key: "renderChild",
    value: function renderChild(child) {
      var active = child.key === this.props.activeKey;

      var className = this.classSet({
        "RevTabsAccordion": true,
        "RevTabsAccordion is-active": true,
        "accordion-navigation": true,
        "active": active
      });

      var tab = React.cloneElement(child.props.tab, {
        onClick: this.handleTabClick(child)
      });

      var content = React.cloneElement(child, {
        active: active
      });

      return React.createElement(
        "li",
        { key: child.key, className: className },
        tab,
        content
      );
    }
  }, {
    key: "handleTabClick",
    value: function handleTabClick(activeTab) {
      var _this2 = this;

      return function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.activeTab = activeTab;
        _this2.props.onChange(e);
      };
    }
  }], [{
    key: "defaultProps",
    get: function get() {
      return {
        onChange: function onChange() {}, // noop
        activeKey: null
      };
    }
  }]);

  return StatelessTabsAccordion;
})(React.Component));

Rev.registerComponent('TabsAccordion', (function (_React$Component2) {
  _inherits(TabsAccordion, _React$Component2);

  _createClass(TabsAccordion, null, [{
    key: "defaultProps",
    get: function get() {
      return {
        onChange: function onChange() {} };
    }
  }]);

  // noop

  function TabsAccordion(props) {
    _classCallCheck(this, TabsAccordion);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TabsAccordion).call(this, props));

    _this3.state = {
      activeKey: null
    };
    return _this3;
  }

  _createClass(TabsAccordion, [{
    key: "render",
    value: function render() {
      return React.createElement(Rev.Components.StatelessTabsAccordion, _extends({}, this.props, {
        activeKey: this.state.activeKey,
        onChange: this.handleChange.bind(this)
      }));
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (e.activeTab.key === this.state.activeKey) {
        e.activeTab = null;
      }

      this.setState({
        activeKey: e.activeTab && e.activeTab.key
      });

      return this.props.onChange(e);
    }
  }]);

  return TabsAccordion;
})(React.Component));
//# sourceMappingURL=TabsAccordion.js.map