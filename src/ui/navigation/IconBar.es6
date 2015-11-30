const REV_ICON_BAR_SIZES = ['one', 'two', 'three', 'four', 'five', 'six']

Rev.registerComponent('IconBar', class IconBar extends React.Component {
  render() {
    const classes = {
      'icon-bar': true,
      'RevIconBar': true,
      'vertical': this.props.vertical,
    }

    for(let i = 0; i < REV_ICON_BAR_SIZES.length; i++) {
      const size = REV_ICON_BAR_SIZES[i]

      if(this.props[size]) {
        classes[`${size}-up`] = true
        break
      }
    }

    return <div className={this.classAdd(classes)}>{this.props.children}</div>
  }
})
