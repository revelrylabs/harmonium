const KEY_TAB = 9
const KEY_ENTER = 13
const KEY_ESC = 27

import React from 'react'


export default class Tokenizer extends React.Component {

  static get propTypes() {
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
      getInputName: React.PropTypes.func,

    }
  }

  static get defaultProps() {
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
      leaveOpen: false,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      ignoreKeyUp: false,
      optionItems: [],
      selectedItems: this.props.selectedItems,
    }
  }

  // Default is item.id
  getItemValue(item) {
    return (this.props.getItemValue || ((item) => item.id))(item)
  }

  getSelectedValues() {
    return this.state.selectedItems.map(this.getItemValue.bind(this))
  }

  // Defaults to whatever getTokenComponent returns
  getOptionComponent(item) {
    return (this.props.getOptionComponent || this.getTokenComponent)(item)
  }

  // Defaults to JSON
  getTokenComponent(item) {
    return (this.props.getTokenComponent || JSON.stringify)(item)
  }

  // Default for <Tokenizer name="store[widgets]" /> is <input name="store[widgets][]" />
  getInputName(item) {
    return (this.props.getInputName || (() => `${this.props.name}`))(item)
  }

  // List item that contains @getTokenComponent(item) and a remove button
  renderToken(item) {
    return (
      <li className={this.props.tokenClassName} key={`token-${this.getItemValue(item)}`}>
        {this.getTokenComponent(item)}
        <input
          type="hidden"
          name={this.getInputName(item)}
          value={this.getItemValue(item)}
          readOnly
        />
        <a
          className={this.props.removeButtonClassName}
          href="#"
          onClick={() => this.onRemove(item)}
        >
          Remove
        </a>
      </li>
    )
  }

  getInput() {
    return this.refs.input.getDOMNode()
  }

  // List item that contains @getOptionComponent(item)
  renderOption(item) {
    return (
      <li
        className={this.props.optionClassName}
        key={`option-${this.getItemValue(item)}`}
        onClick={() => this.onSelect(item)}
      >
        {this.getOptionComponent(item)}
      </li>
    )
  }

  // Renders a list only if it has items
  renderTokens() {
    if(!this.state.selectedItems.length > 0) {
      return null
    }
    return (
      <ul className={this.props.tokenListClassName}>
        {this.state.selectedItems.map(this.renderToken.bind(this))}
      </ul>
    )
  }

  // Renders a list only if it has items
  renderOptions() {
    if(!this.state.optionItems.length > 0) {
      return null
    }
    return (
      <ul className={this.props.optionListClassName}>
        {this.state.optionItems.map(this.renderOption.bind(this))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.renderTokens()}
        <div className={this.props.className}>
          <input
            ref="input"
            type={this.props.type || 'text'}
            className={this.props.inputClassName}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            onKeyDown={this.onKeyDown.bind(this)}
            onKeyUp={this.onKeyUp.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)} />
          {this.props.children}
        </div>
        {this.renderOptions()}
      </div>
    )
  }

  isSelectKey(e) {
    return e.keyCode == KEY_TAB || e.keyCode == KEY_ENTER
  }

  onKeyDown(e) {
    // prevent blur, form submit, etc.
    // unless there's no text in the box, in which case we don't worry about it
    return this.state.optionItems.length == 0 || !this.isSelectKey(e)
  }

  onKeyUp(e) {
    if(this.isSelectKey(e)) {
      // Select the first item on special keypresses
      if(this.state.optionItems.length > 0) {
        this.onSelect(this.state.optionItems[0])
      }
    }
    else if(e.keyCode == KEY_ESC) {
      // Esc to make the option go away
      this.getInput().blur()
    }
    else {
      this.fetchOptions()
    }

    this.setState({
      ignoreKeyUp: false,
    })
  }

  onBlur() {
    if(this.props.leaveOpen) {
      return
    }
    // If you don't delay this a little you can't click any of the options
    clearOptions = () => this.setState({optionItems: []})
    setTimeout(clearOptions, 200)
  }

  onFocus() {
    this.fetchOptions()
  }

  clearOptions() {
    if(this.xhr != null) {
      this.xhr.abort()
    }
    this.setState({optionItems: []})
  }

  setOptions(items) {
    rejectItem = (item) => _.contains(this.getSelectedValues(), this.getItemValue(item))
    this.setState({
      optionItems: _.reject(items, rejectItem),
    })
  }

  fetchOptions() {
    if(this.getInput().value == '') {
      this.clearOptions()
    }
    else {
      let queryData = {}
      queryData[this.props.queryParam] = this.getInput().value
      this.xhr = $.get(this.props.remoteOptionsUrl, queryData)
      this.xhr.done(this.setOptions.bind(this))
    }
  }

  onSelect(item) {
    let items = this.state.selectedItems
    items.push(item)
    items = _.uniq(items, null, this.getItemValue.bind(this))
    input = this.getInput()
    input.value = ''
    input.focus()
    this.clearOptions()
    this.setState({selectedItems: items})
    return false
  }

  onRemove(item) {
    const items = _.reject(this.state.selectedItems, (x) => this.getItemValue(x) == this.getItemValue(item))
    this.setState({selectedItems: items})
    return false
  }
}
