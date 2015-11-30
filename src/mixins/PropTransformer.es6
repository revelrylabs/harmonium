Rev.registerMixin('PropTransformer', {

  // propTransforms = {name: (x) => x.toUpperCase()}

  componentWillMount() {
    for(const name in this.propTransforms) {
      if(this.props[name] !== null && typeof this.props[name] !== 'undefined') {
        this.props[name] = this.propTransforms(this.propTransforms[name], name)
      }
    }
  }
})
