import React, {Component, RefObject} from 'react'
import {reject, uniqBy, includes} from 'lodash'

// Key codes for keyboard interaction
const KEY_TAB = 9
const KEY_ENTER = 13
const KEY_ESC = 27

// Define global jQuery for TypeScript
declare global {
  interface Window {
    $: JQueryStatic
  }
}

interface JQueryStatic {
  get(url: string, data?: any): JQueryXHR
}

interface JQueryXHR {
  done(callback: (data: any) => void): JQueryXHR
  abort(): void
}

// Item type for tokens
export interface TokenizerItem {
  id?: string | number
  [key: string]: any
}

// Props for the Tokenizer component
export interface TokenizerProps {
  placeholder?: string
  remoteOptionsUrl?: string
  queryParam?: string
  selectedItems?: TokenizerItem[]
  inputClassName?: string
  optionListClassName?: string
  optionClassName?: string
  tokenListClassName?: string
  tokenClassName?: string
  removeButtonClassName?: string
  leaveOpen?: boolean
  getItemValue?: (item: TokenizerItem) => string | number
  getOptionComponent?: (item: TokenizerItem) => React.ReactNode
  getTokenComponent?: (item: TokenizerItem) => React.ReactNode
  getInputName?: (item: TokenizerItem) => string
  name?: string
  defaultValue?: any
  type?: string
  className?: string
  children?: React.ReactNode
}

// State for the Tokenizer component
interface TokenizerState {
  ignoreKeyUp: boolean
  optionItems: TokenizerItem[]
  selectedItems: TokenizerItem[]
}

/**
 * Tokenizer component - creates a tokenized input field
 * Allows selection of multiple items from a dropdown list
 */
export default class Tokenizer extends Component<TokenizerProps, TokenizerState> {
  static defaultProps = {
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

  // Reference to the input element
  private input: HTMLInputElement | null = null
  // XHR request for fetching options
  private xhr: JQueryXHR | null = null

  constructor(props: TokenizerProps) {
    super(props)

    this.state = {
      ignoreKeyUp: false,
      optionItems: [],
      selectedItems: this.props.selectedItems || [],
    }
  }

  // Get the value of an item (defaults to item.id)
  getItemValue(item: TokenizerItem): string | number {
    return (this.props.getItemValue || ((itemArg: TokenizerItem) => itemArg.id || ''))(item)
  }

  // Get all selected values as an array
  getSelectedValues(): Array<string | number> {
    return this.state.selectedItems.map(this.getItemValue.bind(this))
  }

  // Get component to display for an option (defaults to getTokenComponent)
  getOptionComponent(item: TokenizerItem): React.ReactNode {
    return (this.props.getOptionComponent || this.getTokenComponent.bind(this))(item)
  }

  // Get component to display for a token (defaults to JSON string)
  getTokenComponent(item: TokenizerItem): React.ReactNode {
    return (this.props.getTokenComponent || JSON.stringify)(item)
  }

  // Get input name (defaults to props.name)
  getInputName(item: TokenizerItem): string {
    return (this.props.getInputName || (() => `${this.props.name}`))(item)
  }

  // Render a token (selected item)
  renderToken(item: TokenizerItem): React.ReactNode {
    return (
      <li
        className={this.props.tokenClassName}
        key={`token-${this.getItemValue(item)}`}
      >
        {this.getTokenComponent(item)}
        <input
          type="hidden"
          name={this.getInputName(item)}
          value={String(this.getItemValue(item))}
          readOnly
        />
        <button
          className={this.props.removeButtonClassName}
          onClick={() => this.onRemove(item)}
          type="button"
        >
          Remove
        </button>
      </li>
    )
  }

  // Get the input element
  getInput(): HTMLInputElement | null {
    return this.input
  }

  // Render an option for selection
  renderOption(item: TokenizerItem): React.ReactNode {
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    return (
      <li
        className={this.props.optionClassName}
        key={`option-${this.getItemValue(item)}`}
        onClick={() => this.onSelect(item)}
      >
        {this.getOptionComponent(item)}
      </li>
    )
    /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
  }

  // Render the list of selected tokens
  renderTokens(): React.ReactNode {
    if (!this.state.selectedItems.length) {
      return null
    }
    return (
      <ul className={this.props.tokenListClassName}>
        {this.state.selectedItems.map((item) => this.renderToken(item))}
      </ul>
    )
  }

  // Render the list of available options
  renderOptions(): React.ReactNode {
    if (!this.state.optionItems.length) {
      return null
    }
    return (
      <ul className={this.props.optionListClassName}>
        {this.state.optionItems.map((item) => this.renderOption(item))}
      </ul>
    )
  }

  // Check if a key is one of the selection keys (tab or enter)
  isSelectKey(e: React.KeyboardEvent): boolean {
    return e.keyCode === KEY_TAB || e.keyCode === KEY_ENTER
  }

  // Handle key down event
  onKeyDown = (e: React.KeyboardEvent): boolean => {
    // prevent blur, form submit, etc.
    // unless there's no text in the box, in which case we don't worry about it
    return this.state.optionItems.length === 0 || !this.isSelectKey(e)
  }

  // Handle key up event
  onKeyUp = (e: React.KeyboardEvent): void => {
    if (this.isSelectKey(e)) {
      // Select the first item on special keypresses
      if (this.state.optionItems.length > 0) {
        this.onSelect(this.state.optionItems[0])
      }
    } else if (e.keyCode === KEY_ESC) {
      // Esc to make the option go away
      const input = this.getInput()
      if (input) {
        input.blur()
      }
    } else {
      this.fetchOptions()
    }

    this.setState({
      ignoreKeyUp: false,
    })
  }

  // Handle blur event
  onBlur = (): void => {
    const clearOptions = () => this.setState({optionItems: []})

    if (this.props.leaveOpen) {
      return
    }
    // If you don't delay this a little you can't click any of the options
    setTimeout(clearOptions, 200)
  }

  // Handle focus event
  onFocus = (): void => {
    this.fetchOptions()
  }

  // Clear options
  clearOptions(): void {
    if (this.xhr) {
      this.xhr.abort()
    }
    this.setState({optionItems: []})
  }

  // Set options
  setOptions(items: TokenizerItem[]): void {
    const rejectItem = (item: TokenizerItem) =>
      includes(this.getSelectedValues(), this.getItemValue(item))

    this.setState({
      optionItems: reject(items, rejectItem),
    })
  }

  // Fetch options from remote URL
  fetchOptions(): void {
    const input = this.getInput()
    if (!input || input.value === '') {
      this.clearOptions()
    } else if (this.props.remoteOptionsUrl) {
      const queryData: Record<string, string> = {}

      queryData[this.props.queryParam || 'q'] = input.value
      this.xhr = window.$.get(this.props.remoteOptionsUrl, queryData)
      this.xhr.done(this.setOptions.bind(this))
    }
  }

  // Handle selection of an item
  onSelect(item: TokenizerItem): boolean {
    let items = [...this.state.selectedItems, item]
    const input = this.getInput()
    
    // Use lodash's uniqBy to create a unique list based on the item value
    items = uniqBy(items, (i) => this.getItemValue(i))
    
    if (input) {
      input.value = ''
      input.focus()
    }
    
    this.clearOptions()
    this.setState({selectedItems: items})
    return false
  }

  // Handle removal of an item
  onRemove(item: TokenizerItem): boolean {
    const items = reject(
      this.state.selectedItems,
      (arg) => this.getItemValue(arg) === this.getItemValue(item)
    )

    this.setState({selectedItems: items})
    return false
  }

  render() {
    return (
      <div>
        {this.renderTokens()}
        <div className={this.props.className}>
          <input
            ref={(ref) => { this.input = ref }}
            type={this.props.type}
            className={this.props.inputClassName}
            placeholder={this.props.placeholder}
            defaultValue={this.props.defaultValue}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {this.renderOptions()}
        </div>
      </div>
    )
  }
} 