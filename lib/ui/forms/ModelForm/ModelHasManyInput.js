'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//= require backbone

Rev.registerComponent('ModelHasManyInput', (function (_React$Component) {
  _inherits(ModelHasManyInput, _React$Component);

  _createClass(ModelHasManyInput, null, [{
    key: 'mixins',
    get: function get() {
      return [Rev.Mixins.ModelInputMixin, Backbone.Events];
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        field: React.PropTypes.string.isRequired,
        model: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        rowComponentClass: React.PropTypes.func,
        controlComponentClass: React.PropTypes.func
      };
    }
  }]);

  function ModelHasManyInput(props) {
    _classCallCheck(this, ModelHasManyInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModelHasManyInput).call(this, props));

    _this.state = {
      items: new Backbone.Collection(_.clone(_this.value() || []), { model: Backbone.Model })
    };
    return _this;
  }

  _createClass(ModelHasManyInput, [{
    key: 'addOne',
    value: function addOne() {
      this.state.items.push(new Backbone.Model());
      this.forceUpdate();
    }
  }, {
    key: 'removerFor',
    value: function removerFor(item) {
      var _this2 = this;

      return function (e) {
        if (e) {
          e.preventDefault();
        }
        _this2.state.items.remove(item);
        _this2.forceUpdate();
      };
    }

    // HTML form input name prefix for fields in the "nested" model, following the
    // rails convention

  }, {
    key: 'subFormBaseName',
    value: function subFormBaseName(index) {
      return (this.props.baseName || this.klass()) + '[' + this.props.field + '_attributes][' + index + ']';
    }
  }, {
    key: 'itemsAsObjects',
    value: function itemsAsObjects() {
      return this.state.items.map(function (model) {
        return model.toJSON();
      });
    }

    // Format the hash of the nested models in the way Rails expects:
    // e.g. { 0: { ... }, 1: { ... }, }

  }, {
    key: 'itemsForRails',
    value: function itemsForRails() {
      return _.object(this.state.items.map(function (item, index) {
        return [index, item];
      }));
    }

    // The name of the has many attribute under the rails convention (e.g.
    // nested_models_attributes)

  }, {
    key: 'fieldNameForRails',
    value: function fieldNameForRails() {
      return this.props.field + '_attributes';
    }
  }, {
    key: 'bubbleUpNestedModelUpdates',
    value: function bubbleUpNestedModelUpdates() {
      // Standard backbone fields & events
      this.props.model.set(this.props.field, this.itemsAsObjects());
      this.props.model.trigger('change:' + this.props.field, this.itemsAsObjects());
      // Also address the rails convention (nested_models_attributes)
      this.props.model.set(this.fieldNameForRails(), this.itemsForRails());
      this.props.model.trigger('change:' + this.fieldNameForRails(), this.itemsForRails());
      // And the change any event
      this.props.model.trigger('change');
      // Redraw our grid
      this.forceUpdate();
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, index) {
      var inner = React.createElement(this.props.rowComponentClass, {
        index: index,
        baseName: this.subFormBaseName(index),
        model: item,
        field: this.props.field,
        parentModel: this.props.model,
        addItem: this.addOne.bind(this),
        removeItem: this.removerFor(item)
      });

      return React.createElement(
        'div',
        { key: item.cid },
        inner
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.items.map(this.renderItem.bind(this)),
        this.controlComponent
      );
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.bubbleUpNestedModelUpdates();
      this.listenTo(this.state.items, 'all', this.bubbleUpNestedModelUpdates.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopListening();
    }
  }, {
    key: 'controlComponent',
    get: function get() {
      if (!this.props.controlComponentClass) {
        return null;
      }
      return React.createElement(this.props.controlComponentClass, {
        items: this.state.items,
        model: this.props.model
      });
    }
  }]);

  return ModelHasManyInput;
})(React.Component));
//# sourceMappingURL=ModelHasManyInput.js.map