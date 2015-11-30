const React = require('react')
const Revelry = require('../../lib/revelry').default

Revelry.appComponent('Home.Index', {

  onClick: function() {
    alert('it works')
  },

  render: function() {
    const props = {
      onClick: this.onClick.bind(this),
    }
    return React.createElement('button', props, 'HELLO THERE')
  },
})
