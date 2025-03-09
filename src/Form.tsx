import React from 'react'
import AuthenticityToken from './AuthenticityToken'
import classNames from 'classnames'

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string
  children?: React.ReactNode
  enableMethodOverride?: boolean
  methodOverrideInputName?: string
  method?: string
}

/**
 * Form component with CSRF protection and method override support
 * @param props - Component props
 * @returns Form component
 */
const Form: React.FC<FormProps> = (props) => {
  const {
    className = '',
    children,
    enableMethodOverride = true,
    methodOverrideInputName = '_method',
    method = 'post',
    ...passthrough
  } = props

  const formClassName = classNames(className, 'rev-Form')

  // only override the method name if its enabled and the method is not post or get.
  const overrideMethod = 
    enableMethodOverride && !['get', 'post'].includes(method.toLowerCase())

  const actualMethod = overrideMethod ? 'post' : method

  return (
    <form {...passthrough} className={formClassName} method={actualMethod}>
      <AuthenticityToken />
      {overrideMethod && (
        <input type="hidden" name={methodOverrideInputName} value={method} />
      )}
      {children}
    </form>
  )
}

export default Form 