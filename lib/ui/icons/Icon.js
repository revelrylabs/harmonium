'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// <Icon type="Foundation" icon="cog" className="left" />
Rev.registerComponent('Icon', (function (_React$Component) {
  _inherits(Icon, _React$Component);

  _createClass(Icon, null, [{
    key: 'Adapters',
    get: function get() {
      return this._Adapters = this._Adapters || {
        FontAwesome: function FontAwesome(icon) {
          return 'fa fa-' + icon;
        },
        IconMoon: function IconMoon(icon) {
          console.warn('The IconMoon adapter is deprecated. Why? Because the name of the lib is *IcoMoon*. Use that.');
          return 'icon-' + icon;
        },
        IcoMoon: function IcoMoon(icon) {
          return 'icon-' + icon;
        },
        Foundation: function Foundation(icon) {
          return 'fi-' + icon;
        }
      };
    }
  }, {
    key: 'defaultType',
    get: function get() {
      return this._defaultType || 'IcoMoon';
    },
    set: function set(value) {
      this._defaultType = value;
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        icon: React.PropTypes.string.isRequired,
        type: React.PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        type: this.defaultType
      };
    }
  }]);

  function Icon(props) {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).call(this, props));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      return React.createElement('i', _extends({}, this.props, { className: this.className }));
    }
  }, {
    key: 'adapter',
    get: function get() {
      return this.constructor.Adapters[this.props.type];
    }
  }, {
    key: 'iconSpecificClassName',
    get: function get() {
      return this.adapter(this.props.icon);
    }
  }, {
    key: 'className',
    get: function get() {
      var classNameObject = {
        'RevIcon': true
      };
      classNameObject['RevIcon-' + this.props.icon] = true;
      classNameObject[this.iconSpecificClassName] = true;
      return this.classAdd(classNameObject);
    }
  }, {
    key: 'passThroughProps',
    get: function get() {
      return this.getPropsWithout(['icon', 'type']);
    }
  }]);

  return Icon;
})(React.Component));
//# sourceMappingURL=Icon.js.map