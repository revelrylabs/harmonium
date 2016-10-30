import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

// TODO: once icons are added to this repo, enable them here and
// provide ability to pass in custom first/previous/next/last content.
export default class Pagination extends Component {

  static propTypes = {
    anchorAriaLabel: PropTypes.func,
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    currentPageText: PropTypes.string,
    firstPageContent: PropTypes.node,
    hideArrows: PropTypes.bool,
    lastPageContent: PropTypes.node,
    maxViewPages: PropTypes.number,
    mobilePageListText: PropTypes.func,
    nextPageContent: PropTypes.node,
    onPageClick: PropTypes.func.isRequired,
    previousPageContent: PropTypes.node,
    href: PropTypes.func,
    showFirstLast: PropTypes.bool,
    totalPages: PropTypes.number.isRequired,
  };

  static defaultProps = {
    anchorAriaLabel: (page) => `Page ${page}`,
    currentPageText: "You're on page ",
    firstPageContent: (
      <span>
        <i className="icon-angle-double-left"/>
        First
        <span className="show-for-sr"> page</span>
      </span>
    ),
    hideArrows: false,
    lastPageContent: (
      <span>
        Last
        <span className="show-for-sr"> page</span>
        <i className="icon-angle-double-right"/>
      </span>
    ),
    maxViewPages: 5,
    mobilePageListText: (currentPage, totalPages) => (
      `Page ${currentPage} of ${totalPages}`
    ),
    nextPageContent: (
      <span>
        Next
        <span className="show-for-sr"> page</span>
        <i className="icon-angle-right"/>
      </span>
    ),
    previousPageContent: (
      <span>
        <i className="icon-angle-left"/>
        Previous
        <span className="show-for-sr"> page</span>
      </span>
    ),
    href: (page) => '#',
    showFirstLast: true,
  }

  getAttributes() {
    const {currentPage, totalPages, maxViewPages} = this.props
    let attributes = {beginArrows: false, endArrows: false}

    if (totalPages <= maxViewPages) {
      attributes.start = 1
      attributes.end = totalPages
    } else {
      if (currentPage <= Math.ceil(maxViewPages / 2)) {
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
        const buffer = Math.floor( (maxViewPages - 2) / 2)
        const unevenAmount = (maxViewPages - 2) % 2
        attributes.start = currentPage - (buffer + unevenAmount)
        attributes.end = currentPage + buffer
        attributes.beginArrows = true
        attributes.endArrows = true
      }
    }

    return attributes
  }

  getArrowClass(relevant, samePage) {
    const {hideArrows} = this.props

    if (!relevant && hideArrows && samePage) {
      return 'pagination-arrow is-hidden is-disabled'
    } else if (!relevant && hideArrows) {
      return 'pagination-arrow is-onlyMobile'
    } else if (samePage) {
      return 'pagination-arrow is-disabled'
    } else {
      return 'pagination-arrow'
    }
  }

  numberLinks(start, end) {
    const baseRange = Array.from(Array(end - start + 1).keys())
    const {currentPage, href, currentPageText, anchorAriaLabel} = this.props

    return (
      baseRange.map( (e) => {
        const page = e + start

        if (page === currentPage) {
          return (
            <li key={page} className="pagination-number current">
              <span className="show-for-sr">{currentPageText}</span>
              {page}
            </li>
          )
        } else {
          return (
            <li key={page} className="pagination-number">
              <a
                href={href(page)}
                onClick={this.createClickHandler(page)}
                aria-label={anchorAriaLabel(page)}
              >
                {page}
              </a>
            </li>
          )
        }
      })
    )
  }

  createClickHandler(pageNumber) {
    return (e) => {
      e.preventDefault()
      const {currentPage, totalPages, onPageClick} = this.props
      const samePage = pageNumber === currentPage
      const invalidPage = pageNumber < 1 || pageNumber > totalPages

      if (!samePage && !invalidPage) {
        onPageClick(pageNumber)
      }
    }
  }

  render() {
    const {
      currentPage,
      firstPageContent,
      lastPageContent,
      mobilePageListText,
      nextPageContent,
      previousPageContent,
      href,
      totalPages,
    } = this.props
    const {beginArrows, endArrows, start, end} = this.getAttributes()
    const beginArrowsClass = this.getArrowClass(beginArrows, currentPage === 1)
    const endArrowsClass = this.getArrowClass(endArrows, currentPage === totalPages)

    if (totalPages === 1) {
      return null
    } else {
      return (
        <div className={classNames('PaginationWrapper', this.props.className)}>
          <ul className="pagination" role="navigation" aria-label="Pagination">
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
            <li className={classNames('pagination-dots', beginArrows ? '' : 'is-hidden')}>
              ...
            </li>
            {this.numberLinks(start, end)}
            <li className={classNames('pagination-dots', endArrows ? '' : 'is-hidden')}>
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
          <div className="PaginationWrapper-pageList">
            {mobilePageListText(currentPage, totalPages)}
          </div>
        </div>
      )
    }
  }
}
