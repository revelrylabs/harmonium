import * as React from 'react'
import {clsx} from 'clsx'
import styles from './Avatar.module.css'

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Fallback text (typically initials) shown when no image */
  fallback?: string
  /** Size of the avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({src, alt = '', fallback, size = 'md', className, ...props}, ref) => {
    const [imgError, setImgError] = React.useState(false)
    const showImage = src && !imgError

    return (
      <span
        ref={ref}
        className={clsx(styles.root, className)}
        data-size={size}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.fallback} aria-label={alt || fallback}>
            {fallback}
          </span>
        )}
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'
