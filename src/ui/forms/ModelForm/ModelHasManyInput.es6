//= require backbone

Rev.registerComponent('ModelHasManyInput', class ModelHasManyInput extends React.Component {

  static get mixins() {
    return [Rev.Mixins.ModelInputMixin, Backbone.Events]
  }

  static get propTypes() {
    return {
      field: React.PropTypes.string.isRequired,
      model: React.PropTypes.instanceOf(Backbone.Model).isRequired,
      rowComponentClass: React.PropTypes.func,
      controlComponentClass: React.PropTypes.func,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      items: new Backbone.Collection(_.clone(this.value() || []), {model: Backbone.Model}),
    }
  }

  addOne() {
    this.state.items.push(new Backbone.Model())
    this.forceUpdate()
  }

  removerFor(item) {
    return (e) => {
      if(e) {
        e.preventDefault()
      }
      this.state.items.remove(item)
      this.forceUpdate()
    }
  }

  // HTML form input name prefix for fields in the "nested" model, following the
  // rails convention
  subFormBaseName(index) {
    return `${this.props.baseName || this.klass()}[${this.props.field}_attributes][${index}]`
  }

  itemsAsObjects() {
    return this.state.items.map((model) => model.toJSON())
  }

  // Format the hash of the nested models in the way Rails expects:
  // e.g. { 0: { ... }, 1: { ... }, }
  itemsForRails() {
    return _.object(this.state.items.map((item, index) => [index, item]))
  }

  // The name of the has many attribute under the rails convention (e.g.
  // nested_models_attributes)
  fieldNameForRails() {
    return `${this.props.field}_attributes`
  }

  bubbleUpNestedModelUpdates() {
    // Standard backbone fields & events
    this.props.model.set(this.props.field, this.itemsAsObjects())
    this.props.model.trigger(`change:${this.props.field}`, this.itemsAsObjects())
    // Also address the rails convention (nested_models_attributes)
    this.props.model.set(this.fieldNameForRails(), this.itemsForRails())
    this.props.model.trigger(`change:${this.fieldNameForRails()}`, this.itemsForRails())
    // And the change any event
    this.props.model.trigger('change')
    // Redraw our grid
    this.forceUpdate()
  }

  renderItem(item, index) {
    const inner = React.createElement(this.props.rowComponentClass, {
      index,
      baseName: this.subFormBaseName(index),
      model: item,
      field: this.props.field,
      parentModel: this.props.model,
      addItem: this.addOne.bind(this),
      removeItem: this.removerFor(item),
    })

    return <div key={item.cid}>{inner}</div>
  }

  get controlComponent() {
    if(!this.props.controlComponentClass) {
      return null
    }
    return React.createElement(this.props.controlComponentClass, {
      items: this.state.items,
      model: this.props.model,
    })
  }

  render() {
    return (
      <div>
        {this.state.items.map(this.renderItem.bind(this))}
        {this.controlComponent}
      </div>
    )
  }

  componentWillMount() {
    this.bubbleUpNestedModelUpdates()
    this.listenTo(this.state.items, 'all', this.bubbleUpNestedModelUpdates.bind(this))
  }

  componentWillUnmount() {
    this.stopListening()
  }
})
