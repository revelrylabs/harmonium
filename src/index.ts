// Component exports
export { default as Button } from './Button'
export type { ButtonProps } from './Button'

export { default as Icon } from './Icon'
export type { IconProps } from './Icon'

export { default as Row } from './Row'
export type { RowProps } from './Row'

export { default as Col } from './Col'
export type { ColProps } from './Col'

export { default as Input } from './Input'
export type { InputProps, InputStackProps } from './Input'

export { default as InputLabel } from './InputLabel'
export type { InputLabelProps } from './InputLabel'

export { default as InputHelpText } from './InputHelpText'
export type { InputHelpTextProps } from './InputHelpText'

export { default as InputErrors } from './InputErrors'
export type { InputErrorsProps } from './InputErrors'

export { default as HelpText } from './HelpText'
export type { HelpTextProps } from './HelpText'

export { default as Form } from './Form'
export type { FormProps } from './Form'

export { default as AuthenticityToken, AuthenticityTokenContext } from './AuthenticityToken'
export type { AuthenticityTokenProps } from './AuthenticityToken'

export { default as Callout } from './Callout'
export type { CalloutProps } from './Callout'

// TODO: Add additional component exports here as they are converted to TypeScript
// Example:
// export { default as Col } from './Col'
// export type { ColProps } from './Col'

// For backwards compatibility
import Button from './Button'
import Icon from './Icon'
import Row from './Row'
import Col from './Col'
import Input from './Input'
import InputLabel from './InputLabel'
import InputHelpText from './InputHelpText'
import InputErrors from './InputErrors'
import HelpText from './HelpText'
import Form from './Form'
import AuthenticityToken from './AuthenticityToken'
import Callout from './Callout'

// TODO: Add additional components here
const Harmonium = {
  Button,
  Icon,
  Row,
  Col,
  Input,
  InputLabel,
  InputHelpText,
  InputErrors,
  HelpText,
  Form,
  AuthenticityToken,
  Callout,
}

export default Harmonium 