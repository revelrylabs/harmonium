import React from 'react'
import classNames from 'classnames'

export interface BrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Optional content to display alongside the brand image
   */
  children?: React.ReactNode
  /**
   * Path to the brand image
   */
  imagePath?: string
  /**
   * Alt text for the brand image
   */
  altTag?: string
  /**
   * URL to navigate to when the brand is clicked
   */
  linkPath?: string
}

/**
 * Brand component for displaying a company/application logo with optional link
 */
const Brand: React.FC<BrandProps> = ({
  className,
  children,
  imagePath,
  altTag,
  linkPath,
  ...props
}) => {
  const newClassName = classNames(className, 'rev-Brand')

  return (
    <a href={linkPath} className={newClassName} {...props}>
      <img className="rev-Brand-img" src={imagePath} alt={altTag} />
      {children}
    </a>
  )
}

export default Brand 