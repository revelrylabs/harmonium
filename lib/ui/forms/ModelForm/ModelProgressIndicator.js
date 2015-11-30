'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Rev.registerComponent('ModelProgressIndicator', (function (_React$Component) {
  _inherits(ModelProgressIndicator, _React$Component);

  _createClass(ModelProgressIndicator, null, [{
    key: 'Status',
    get: function get() {
      return this._Status = this._Status || {
        STARTED: 0,
        REQUESTED: 1,
        SYNCED: 2,
        ERRORED: 3
      };
    }
  }]);

  function ModelProgressIndicator(props) {
    _classCallCheck(this, ModelProgressIndicator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModelProgressIndicator).call(this, props));

    _this.state = {
      status: _this.constructor.Status.STARTED
    };

    _this.onRequest = _this.onRequest.bind(_this);
    _this.onSync = _this.onSync.bind(_this);
    _this.onError = _this.onError.bind(_this);
    return _this;
  }

  _createClass(ModelProgressIndicator, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'span',
        { className: this.progressClasses() },
        this.childForCurrentStatus()
      );
    }
  }, {
    key: 'childForCurrentStatus',
    value: function childForCurrentStatus() {
      var statusNames = ['started', 'requested', 'synced', 'errored'];

      for (var i = 0; i < statusNames.length; i++) {
        var currentStatus = this.childForStatus(statusNames[i]);

        if (currentStatus) {
          return currentStatus;
        }
      }
    }
  }, {
    key: 'childForStatus',
    value: function childForStatus(statusName) {
      if (this.props[statusName] && this.state.status === this.constructor.Status[statusName.toUpperCase()]) {
        return this.props[statusName];
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.model.on('request', this.onRequest);
      this.props.model.on('sync', this.onSync);
      this.props.model.on('error', this.onError);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.model.off('request', this.onRequest);
      this.props.model.off('sync', this.onSync);
      this.props.model.off('error', this.onError);
    }
  }, {
    key: 'onRequest',
    value: function onRequest() {
      this.setState({
        status: this.constructor.Status.REQUESTED
      });
    }
  }, {
    key: 'onSync',
    value: function onSync() {
      this.setState({
        status: this.constructor.Status.SYNCED
      });
    }
  }, {
    key: 'onError',
    value: function onError() {
      this.setState({
        status: this.constructor.Status.ERRORED
      });
    }
  }, {
    key: 'progressClasses',
    value: function progressClasses() {
      return this.suitSet('ModelProgressIndicator', {
        started: this.state.status === this.constructor.Status.STARTED,
        requested: this.state.status === this.constructor.Status.REQUESTED,
        synced: this.state.status === this.constructor.Status.SYNCED,
        errored: this.state.status === this.constructor.Status.ERRORED
      });
    }
  }]);

  return ModelProgressIndicator;
})(React.Component));
//# sourceMappingURL=ModelProgressIndicator.js.map