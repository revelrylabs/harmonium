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

/**
 * A user's picture, or `fallback` text (usually initials) when there's no
 * `src` or the image fails to load. The fallback is announced as an image
 * named by `alt`, else `fallback`.
 *
 * @category Display
 * @example
 * <Avatar src={user.photoUrl} alt={user.name} fallback="JD" />
 * <Avatar fallback="JD" size="lg" />
 */
export const Avatar =React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({src, alt = '', fallback, size = 'md', className, ...props}, ref) => {
    const [imgError, setImgError] = React.useState(false)

    React.useEffect(() => {
      setImgError(false)
    }, [src])

    const showImage = src && !imgError
    // The fallback stands in for the image, so it is announced as one. With
    // no text to name it, it is decorative and hidden instead.
    const fallbackLabel = alt || fallback

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
          <span
            className={styles.fallback}
            role={fallbackLabel ? 'img' : undefined}
            aria-label={fallbackLabel || undefined}
            aria-hidden={fallbackLabel ? undefined : true}
          >
            {fallback}
          </span>
        )}
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'
