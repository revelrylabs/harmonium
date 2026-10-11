import * as React from 'react'
import {mergeProps} from '@base-ui/react/merge-props'
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
  /** Callback with the files left out for not matching `accept`, `maxSize` or `multiple` */
  onReject?: (files: File[]) => void
  /** Maximum file size in bytes */
  maxSize?: number
}

/**
 * Whether a file matches an `accept` string: extensions (`.pdf`), exact MIME
 * types (`image/png`) or wildcards (`image/*`), comma-separated.
 */
function matchesAccept(file: File, accept: string | undefined): boolean {
  if (!accept) return true
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return accept
    .split(',')
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith('.')) return name.endsWith(token)
      if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1))
      return type === token
    })
}

/**
 * A drop zone that also opens the file picker on click, Enter or Space.
 * Picked and dropped files are checked against `accept`, `maxSize` and
 * `multiple`: matching files go to `onChange`, the rest to `onReject`. It
 * doesn't upload anything itself. Children replace the default
 * "Drop files here or click to browse" text.
 *
 * @category Forms
 * @example
 * <FileUpload
 *   accept="image/*,.pdf"
 *   multiple
 *   maxSize={5_000_000}
 *   onChange={(files) => upload(files)}
 *   onReject={(files) => setError(`${files.length} file(s) skipped`)}
 * />
 */
export const FileUpload =React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {accept, multiple, disabled, onChange, onReject, maxSize, className, children, ...props},
    ref,
  ) => {
    const [dragActive, setDragActive] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    // dragenter/dragleave fire for every child crossed; count them so the
    // highlight doesn't flicker while dragging over the placeholder content
    const dragDepth = React.useRef(0)

    const handleFiles = (fileList: FileList | File[] | null) => {
      if (!fileList || disabled) return
      const accepted: File[] = []
      const rejected: File[] = []
      for (const file of Array.from(fileList)) {
        const fits =
          matchesAccept(file, accept) &&
          (maxSize === undefined || file.size <= maxSize) &&
          (multiple || accepted.length === 0)
        ;(fits ? accepted : rejected).push(file)
      }
      if (rejected.length > 0) onReject?.(rejected)
      onChange?.(accepted)
    }

    const openPicker = () => {
      if (!disabled) inputRef.current?.click()
    }

    const internalProps: React.ComponentProps<'div'> = {
      onDragEnter: (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (disabled) return
        dragDepth.current += 1
        setDragActive(true)
      },
      onDragOver: (event) => {
        event.preventDefault()
        event.stopPropagation()
      },
      onDragLeave: (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (disabled) return
        dragDepth.current = Math.max(0, dragDepth.current - 1)
        if (dragDepth.current === 0) setDragActive(false)
      },
      onDrop: (event) => {
        event.preventDefault()
        event.stopPropagation()
        dragDepth.current = 0
        setDragActive(false)
        if (disabled) return
        handleFiles(event.dataTransfer.files)
      },
      onClick: (event) => {
        // The input's own click bubbles up here; don't reopen the picker
        if (event.target === inputRef.current) return
        if (!event.defaultPrevented) openPicker()
      },
      onKeyDown: (event) => {
        if (event.defaultPrevented) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openPicker()
        }
      },
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-drag-active={dragActive || undefined}
        data-disabled={disabled || undefined}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        // Consumer handlers run alongside the internal ones instead of
        // replacing them; calling preventDefault() in onClick/onKeyDown skips
        // opening the file picker
        {...mergeProps<'div'>(internalProps, props)}
      >
        <input
          ref={inputRef}
          type="file"
          // Already display:none via CSS; `hidden` also keeps it out of the
          // accessibility tree, so it isn't a control nested in the button
          hidden
          className={styles.input}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => {
            handleFiles(event.target.files)
            // Reset so choosing the same file again still fires a change
            event.target.value = ''
          }}
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
