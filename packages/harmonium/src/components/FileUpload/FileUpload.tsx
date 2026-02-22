import * as React from 'react'
import {clsx} from 'clsx'
import styles from './FileUpload.module.css'

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accepted file types (e.g., "image/*,.pdf") */
  accept?: string
  /** Whether multiple files can be selected */
  multiple?: boolean
  /** Whether the upload is disabled */
  disabled?: boolean
  /** Callback when files are selected */
  onChange?: (files: File[]) => void
  /** Maximum file size in bytes */
  maxSize?: number
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({accept, multiple, disabled, onChange, maxSize, className, children, ...props}, ref) => {
    const [dragActive, setDragActive] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleFiles = (fileList: FileList | null) => {
      if (!fileList || disabled) return
      let files = Array.from(fileList)
      if (maxSize) {
        files = files.filter((f) => f.size <= maxSize)
      }
      onChange?.(files)
    }

    const handleDrag = (event: React.DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (disabled) return
      if (event.type === 'dragenter' || event.type === 'dragover') {
        setDragActive(true)
      } else if (event.type === 'dragleave') {
        setDragActive(false)
      }
    }

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault()
      event.stopPropagation()
      setDragActive(false)
      if (disabled) return
      handleFiles(event.dataTransfer.files)
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-drag-active={dragActive || undefined}
        data-disabled={disabled || undefined}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className={styles.input}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => handleFiles(event.target.files)}
          tabIndex={-1}
          aria-hidden="true"
        />
        {children || (
          <div className={styles.placeholder}>
            <span className={styles.icon} aria-hidden="true">↑</span>
            <span>Drop files here or click to browse</span>
          </div>
        )}
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'
