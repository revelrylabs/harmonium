import React, {Component, ReactNode} from 'react'
import classNames from 'classnames'

export interface PaginationProps {
  anchorAriaLabel?: (page: number) => string
  className?: string
  currentPage: number
  currentPageText?: string
  firstPageContent?: ReactNode
  hideArrows?: boolean
  lastPageContent?: ReactNode
  maxViewPages?: number
  mobilePageListText?: (currentPage: number, totalPages: number) => string
  nextPageContent?: ReactNode
  onPageClick: (pageNumber: number) => void
  previousPageContent?: ReactNode
  href?: (page: number) => string
  totalPages: number
  showFirstLast?: boolean
}

interface PaginationAttributes {
  beginArrows: boolean
  endArrows: boolean
  start: number
  end: number
}

// TODO: once icons are added to this repo, enable them here.
export default class Pagination extends Component<PaginationProps> {
  static defaultProps = {
    anchorAriaLabel: (page: number) => `Page ${page}`,
    currentPageText: "You're on page ",
    firstPageContent: (
      <span>
        <i className="icon-angle-double-left" />
        First
        <span className="ShowForSR"> page</span>
      </span>
    ),
    hideArrows: false,
    lastPageContent: (
      <span>
        Last
        <span className="ShowForSR"> page</span>
        <i className="icon-angle-double-right" />
      </span>
    ),
    maxViewPages: 5,
    mobilePageListText: (currentPage: number, totalPages: number) =>
      `Page ${currentPage} of ${totalPages}`,
    nextPageContent: (
      <span>
        Next
        <span className="ShowForSR"> page</span>
        <i className="icon-angle-right" />
      </span>
    ),
    previousPageContent: (
      <span>
        <i className="icon-angle-left" />
        Previous
        <span className="ShowForSR"> page</span>
      </span>
    ),
    href: () => '#',
    showFirstLast: true,
  }
  
  /* eslint complexity: [2, 4] */
  getAttributes(): PaginationAttributes {
    const {currentPage, totalPages, maxViewPages = 5} = this.props
    const attributes: PaginationAttributes = {
      beginArrows: false, 
      endArrows: false,
      start: 1,
      end: totalPages
    }

    if (totalPages <= maxViewPages) {
      attributes.start = 1
      attributes.end = totalPages
    } else if (currentPage <= Math.ceil(maxViewPages / 2)) {
      // Left end
      attributes.start = 1
      attributes.end = maxViewPages
      attributes.endArrows = true
    } else if (currentPage > totalPages - Math.ceil(maxViewPages / 2)) {
      // Right end
      attributes.start = totalPages - (maxViewPages - 1)
      attributes.end = totalPages
      attributes.beginArrows = true
    } else {
      // Middle
      const buffer = Math.floor((maxViewPages - 2) / 2)
      const unevenAmount = (maxViewPages - 2) % 2

      attributes.start = currentPage - (buffer + unevenAmount)
      attributes.end = currentPage + buffer
      attributes.beginArrows = true
      attributes.endArrows = true
    }

    return attributes
  }
  
  /* eslint complexity: [2, 7] */
  getArrowClass(relevant: boolean, samePage: boolean): string {
    const {hideArrows} = this.props

    if (!relevant && hideArrows && samePage) {
      return 'rev-Pagination-arrow rev-Pagination-arrow--hidden'
    } else if (!relevant && hideArrows) {
      return 'rev-Pagination-arrow rev-Pagination-arrow--hidden'
    } else if (samePage) {
      return 'rev-Pagination-arrow rev-Pagination-arrow--disabled'
    } else {
      return 'rev-Pagination-arrow'
    }
  }

  numberLinks(start: number, end: number): ReactNode[] {
    const baseRange = Array.from(Array(end - start + 1).keys())
    const {currentPage, href = () => '#', currentPageText, anchorAriaLabel} = this.props

    return baseRange.map((e) => {
      const page = e + start

      if (page === currentPage) {
        return (
          <li
            key={page}
            className="rev-Pagination-number rev-Pagination-number--selected"
          >
            <span className="ShowForSR">{currentPageText}</span>
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a>{page}</a>
            {/* eslint-enable jsx-a11y/anchor-is-valid */}
          </li>
        )
      } else {
        return (
          <li key={page} className="rev-Pagination-number">
            <a
              href={href(page)}
              onClick={this.createClickHandler(page)}
              aria-label={anchorAriaLabel && anchorAriaLabel(page)}
            >
              {page}
            </a>
          </li>
        )
      }
    })
  }

  createClickHandler = (pageNumber: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const {currentPage, totalPages, onPageClick} = this.props
    const samePage = pageNumber === currentPage
    const invalidPage = pageNumber < 1 || pageNumber > totalPages

    if (!samePage && !invalidPage) {
      onPageClick(pageNumber)
    }
  }

  render() {
    const {
      currentPage,
      firstPageContent,
      lastPageContent,
      mobilePageListText = (currentPage, totalPages) => `Page ${currentPage} of ${totalPages}`,
      nextPageContent,
      previousPageContent,
      href = () => '#',
      totalPages,
    } = this.props
    const {beginArrows, endArrows, start, end} = this.getAttributes()
    const beginArrowsClass = this.getArrowClass(beginArrows, currentPage === 1)
    const endArrowsClass = this.getArrowClass(
      endArrows,
      currentPage === totalPages
    )

    if (totalPages === 1) {
      return null
    } else {
      return (
        <div
          className={classNames('rev-PaginationWrapper', this.props.className)}
        >
          <ul
            className="rev-Pagination"
            role="navigation"
            aria-label="Pagination"
          >
            <li className={beginArrowsClass}>
              <a href={href(1)} onClick={this.createClickHandler(1)}>
                {firstPageContent}
              </a>
            </li>
            <li className={beginArrowsClass}>
              <a
                href={href(currentPage - 1)}
                onClick={this.createClickHandler(currentPage - 1)}
              >
                {previousPageContent}
              </a>
            </li>
            <li
              className={classNames(
                'rev-Pagination-dots',
                beginArrows ? '' : 'rev-Pagination-dots--hidden'
              )}
            >
              ...
            </li>
            {this.numberLinks(start, end)}
            <li
              className={classNames(
                'rev-Pagination-dots',
                endArrows ? '' : 'rev-Pagination-dots--hidden'
              )}
            >
              ...
            </li>
            <li className={endArrowsClass}>
              <a
                href={href(currentPage + 1)}
                onClick={this.createClickHandler(currentPage + 1)}
              >
                {nextPageContent}
              </a>
            </li>
            <li className={endArrowsClass}>
              <a
                href={href(totalPages)}
                onClick={this.createClickHandler(totalPages)}
              >
                {lastPageContent}
              </a>
            </li>
          </ul>
          <div className="rev-PaginationWrapper-pageList">
            <span className="Small">
              ( {mobilePageListText(currentPage, totalPages)} )
            </span>
          </div>
        </div>
      )
    }
  }
} 