'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('StatelessTabs', (function (_React$Component) {
  _inherits(StatelessTabs, _React$Component);

  function StatelessTabs() {
    _classCallCheck(this, StatelessTabs);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StatelessTabs).apply(this, arguments));
  }

  _createClass(StatelessTabs, [{
    key: 'getActiveKey',
    // noop
    value: function getActiveKey() {
      if (this.props.activeKey) {
        return this.props.activeKey;
      }

      var children = this.props.children;

      if (children && children.length && children.length > 0) {
        return children[0].key;
      }

      return null;
    }
  }, {
    key: 'renderTab',
    value: function renderTab(child) {
      var className = this.classSet({
        active: child.key === this.getActiveKey(),
        'RevTabs-tab': true
      });

      return React.createElement(
        'dd',
        { key: child.key, className: className, onClick: this.handleTabClick(child) },
        child.props.tab
      );
    }
  }, {
    key: 'renderContent',
    value: function renderContent(child) {
      var newProps = { key: child.key };
      newProps.active = child.key === this.getActiveKey();
      return React.cloneElement(child, newProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var dlClassName = this.classSet({
        'RevTabs-tabs': true,
        tabs: true,
        vertical: this.props.vertical
      });

      return React.createElement(
        'div',
        { className: 'RevTabs' },
        React.createElement(
          'dl',
          { className: dlClassName },
          React.Children.map(this.props.children, this.renderTab.bind(this))
        ),
        React.createElement(
          Rev.Components.StatelessTabContent,
          _extends({}, this.props, { activeKey: this.getActiveKey() }),
          this.props.children
        )
      );
    }
  }, {
    key: 'handleTabClick',
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
    key: 'propTypes',
    get: function get() {
      return {
        children: React.PropTypes.node,
        activeKey: React.PropTypes.string,
        onChange: React.PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        activeKey: null,
        onChange: function onChange() {
          return null;
        } };
    }
  }]);

  return StatelessTabs;
})(React.Component));
//# sourceMappingURL=StatelessTabs.js.map