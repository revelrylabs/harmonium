'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _revelry = require('../revelry');

var _revelry2 = _interopRequireDefault(_revelry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _revelry2.default.registerMixin('PropTransformer', {

  // propTransforms = {name: (x) => x.toUpperCase()}

  componentWillMount: function componentWillMount() {
    for (var name in this.propTransforms) {
      if (this.props[name] !== null && typeof this.props[name] !== 'undefined') {
        this.props[name] = this.propTransforms(this.propTransforms[name], name);
      }
    }
  }
});
//# sourceMappingURL=PropTransformer.js.map