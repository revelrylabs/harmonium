'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_TAB = 9;
var KEY_ENTER = 13;
var KEY_ESC = 27;

Rev.registerComponent('Tokenizer', (function (_React$Component) {
  _inherits(Tokenizer, _React$Component);

  _createClass(Tokenizer, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        placeholder: React.PropTypes.string,
        remoteOptionsUrl: React.PropTypes.string,
        queryParam: React.PropTypes.string,
        selectedItems: React.PropTypes.array,
        inputClassName: React.PropTypes.string,
        optionListClassName: React.PropTypes.string,
        optionClassName: React.PropTypes.string,
        tokenListClassName: React.PropTypes.string,
        tokenClassName: React.PropTypes.string,
        removeButtonClassName: React.PropTypes.string,
        leaveOpen: React.PropTypes.bool,
        getItemValue: React.PropTypes.func,
        getOptionComponent: React.PropTypes.func,
        getTokenComponent: React.PropTypes.func,
        getInputName: React.PropTypes.func

      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        placeholder: '',
        remoteOptionsUrl: null,
        queryParam: 'q',
        selectedItems: [],
        inputClassName: 'RevTokenizer-input',
        optionListClassName: 'RevTokenizer-options',
        optionClassName: 'RevTokenizer-option',
        tokenListClassName: 'RevTokenizer-tokens',
        tokenClassName: 'RevTokenizer-token',
        removeButtonClassName: 'RevTokenizer-remove',
        leaveOpen: false
      };
    }
  }]);

  function Tokenizer(props) {
    _classCallCheck(this, Tokenizer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tokenizer).call(this, props));

    _this.state = {
      ignoreKeyUp: false,
      optionItems: [],
      selectedItems: _this.props.selectedItems
    };
    return _this;
  }

  // Default is item.id

  _createClass(Tokenizer, [{
    key: 'getItemValue',
    value: function getItemValue(item) {
      return (this.props.getItemValue || function (item) {
        return item.id;
      })(item);
    }
  }, {
    key: 'getSelectedValues',
    value: function getSelectedValues() {
      return this.state.selectedItems.map(this.getItemValue.bind(this));
    }

    // Defaults to whatever getTokenComponent returns

  }, {
    key: 'getOptionComponent',
    value: function getOptionComponent(item) {
      return (this.props.getOptionComponent || this.getTokenComponent)(item);
    }

    // Defaults to JSON

  }, {
    key: 'getTokenComponent',
    value: function getTokenComponent(item) {
      return (this.props.getTokenComponent || JSON.stringify)(item);
    }

    // Default for <Tokenizer name="store[widgets]" /> is <input name="store[widgets][]" />

  }, {
    key: 'getInputName',
    value: function getInputName(item) {
      var _this2 = this;

      return (this.props.getInputName || function () {
        return '' + _this2.props.name;
      })(item);
    }

    // List item that contains @getTokenComponent(item) and a remove button

  }, {
    key: 'renderToken',
    value: function renderToken(item) {
      var _this3 = this;

      return React.createElement(
        'li',
        { className: this.props.tokenClassName, key: 'token-' + this.getItemValue(item) },
        this.getTokenComponent(item),
        React.createElement('input', {
          type: 'hidden',
          name: this.getInputName(item),
          value: this.getItemValue(item),
          readOnly: true
        }),
        React.createElement(
          'a',
          {
            className: this.props.removeButtonClassName,
            href: '#',
            onClick: function onClick() {
              return _this3.onRemove(item);
            }
          },
          'Remove'
        )
      );
    }
  }, {
    key: 'getInput',
    value: function getInput() {
      return this.refs.input.getDOMNode();
    }

    // List item that contains @getOptionComponent(item)

  }, {
    key: 'renderOption',
    value: function renderOption(item) {
      var _this4 = this;

      return React.createElement(
        'li',
        {
          className: this.props.optionClassName,
          key: 'option-' + this.getItemValue(item),
          onClick: function onClick() {
            return _this4.onSelect(item);
          }
        },
        this.getOptionComponent(item)
      );
    }

    // Renders a list only if it has items

  }, {
    key: 'renderTokens',
    value: function renderTokens() {
      if (!this.state.selectedItems.length > 0) {
        return null;
      }
      return React.createElement(
        'ul',
        { className: this.props.tokenListClassName },
        this.state.selectedItems.map(this.renderToken.bind(this))
      );
    }

    // Renders a list only if it has items

  }, {
    key: 'renderOptions',
    value: function renderOptions() {
      if (!this.state.optionItems.length > 0) {
        return null;
      }
      return React.createElement(
        'ul',
        { className: this.props.optionListClassName },
        this.state.optionItems.map(this.renderOption.bind(this))
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.renderTokens(),
        React.createElement(
          'div',
          { className: this.props.className },
          React.createElement('input', {
            ref: 'input',
            type: this.props.type || 'text',
            className: this.props.inputClassName,
            placeholder: this.props.placeholder,
            defaultValue: this.props.defaultValue,
            onKeyDown: this.onKeyDown.bind(this),
            onKeyUp: this.onKeyUp.bind(this),
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this) }),
          this.props.children
        ),
        this.renderOptions()
      );
    }
  }, {
    key: 'isSelectKey',
    value: function isSelectKey(e) {
      return e.keyCode == KEY_TAB || e.keyCode == KEY_ENTER;
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      // prevent blur, form submit, etc.
      // unless there's no text in the box, in which case we don't worry about it
      return this.state.optionItems.length == 0 || !this.isSelectKey(e);
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      if (this.isSelectKey(e)) {
        // Select the first item on special keypresses
        if (this.state.optionItems.length > 0) {
          this.onSelect(this.state.optionItems[0]);
        }
      } else if (e.keyCode == KEY_ESC) {
        // Esc to make the option go away
        this.getInput().blur();
      } else {
        this.fetchOptions();
      }

      this.setState({
        ignoreKeyUp: false
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var _this5 = this;

      if (this.props.leaveOpen) {
        return;
      }
      // If you don't delay this a little you can't click any of the options
      clearOptions = function () {
        return _this5.setState({ optionItems: [] });
      };
      setTimeout(clearOptions, 200);
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.fetchOptions();
    }
  }, {
    key: 'clearOptions',
    value: function clearOptions() {
      if (this.xhr != null) {
        this.xhr.abort();
      }
      this.setState({ optionItems: [] });
    }
  }, {
    key: 'setOptions',
    value: function setOptions(items) {
      var _this6 = this;

      rejectItem = function (item) {
        return _.contains(_this6.getSelectedValues(), _this6.getItemValue(item));
      };
      this.setState({
        optionItems: _.reject(items, rejectItem)
      });
    }
  }, {
    key: 'fetchOptions',
    value: function fetchOptions() {
      if (this.getInput().value == '') {
        this.clearOptions();
      } else {
        var queryData = {};
        queryData[this.props.queryParam] = this.getInput().value;
        this.xhr = $.get(this.props.remoteOptionsUrl, queryData);
        this.xhr.done(this.setOptions.bind(this));
      }
    }
  }, {
    key: 'onSelect',
    value: function onSelect(item) {
      var items = this.state.selectedItems;
      items.push(item);
      items = _.uniq(items, null, this.getItemValue.bind(this));
      input = this.getInput();
      input.value = '';
      input.focus();
      this.clearOptions();
      this.setState({ selectedItems: items });
      return false;
    }
  }, {
    key: 'onRemove',
    value: function onRemove(item) {
      var _this7 = this;

      var items = _.reject(this.state.selectedItems, function (x) {
        return _this7.getItemValue(x) == _this7.getItemValue(item);
      });
      this.setState({ selectedItems: items });
      return false;
    }
  }]);

  return Tokenizer;
})(React.Component));
//# sourceMappingURL=Tokenizer.js.map