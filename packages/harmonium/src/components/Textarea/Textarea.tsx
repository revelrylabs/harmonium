import * as React from 'react'
import {clsx} from 'clsx'
import {Field as BaseField} from '@base-ui/react/field'
import {useFieldControlProps} from '../Field/Field'
import styles from './Textarea.module.css'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

/**
 * A native `<textarea>`, wired to the surrounding `<Field>`.
 *
 * @category Forms
 * @example
 * <Field>
 *   <FieldLabel>Bio</FieldLabel>
 *   <FieldDescription>A sentence or two about you.</FieldDescription>
 *   <Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
 * </Field>
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, id, ...props}, ref) => {
    const fieldProps = useFieldControlProps(id)

    return (
      <BaseField.Control
        ref={ref as React.Ref<HTMLElement>}
        render={<textarea />}
        className={clsx(styles.root, className)}
        {...fieldProps}
        {...(props as BaseField.Control.Props)}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
