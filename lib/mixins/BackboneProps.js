'use strict';

Rev.registerMixin('BackboneProps', {
  // Component should contain a map of prop names to Backbone classes, like:
  //
  // backboneMap = {
  //   users: User.Collection,
  // }

  // Set up our Backbone instance objects.

  componentWillMount: function componentWillMount() {
    this.backbonify(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.backbonify(nextProps);
  },
  backbonify: function backbonify(props) {
    var _this = this;

    this.__bb = [];

    _.each(this.backboneMap, function (klass, name) {
      var data = props[name];

      if (data != null && !(data instanceof Backbone.Model || data instanceof Backbone.Collection)) {
        // Rewrite the prop as the correct Backbone model or collection.
        props[name] = new klass(data);
      }

      // Save a reference so we can wire up events.
      _this.__bb.push(props[name]);
    });
  },

  // Whenever there may be a change in the Backbone data, trigger a reconcile.
  componentDidMount: function componentDidMount() {
    var _this2 = this;

    _.each(this.__bb, function (model) {
      model.on('all', _this2.forceUpdate.bind(_this2, null), _this2);
    });
  },

  // Clean up any dangling references when the component is destroyed.
  componentWillUnmount: function componentWillUnmount() {
    var _this3 = this;

    _.each(this.__bb, function (model) {
      model.off(null, null, _this3);
    });
  }
});
//# sourceMappingURL=BackboneProps.js.map