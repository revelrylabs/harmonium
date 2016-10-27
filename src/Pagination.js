import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

// TODO: once icons are added to this repo, enable them here and
// provide ability to pass in custom first/previous/next/last content.
export default class Pagination extends Component {

  static propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    hideArrows: PropTypes.bool,
    maxViewPages: PropTypes.number,
    onPageClick: PropTypes.func.isRequired,
    setHref: PropTypes.func,
    showFirstLast: PropTypes.bool,
    totalPages: PropTypes.number.isRequired,
  };

  static defaultProps = {
    hideArrows: false,
    maxViewPages: 5,
    setHref: (page) => '#',
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
      return 'Pagination-arrow Hidden Disabled'
    } else if (!relevant && hideArrows) {
      return 'Pagination-arrow Hidden'
    } else if (samePage) {
      return 'Pagination-arrow Disabled'
    } else {
      return 'Pagination-arrow'
    }
  }

  numberLinks(start, end) {
    const baseRange = Array.from(Array(end - start + 1).keys())
    const {currentPage, setHref} = this.props

    return (
      baseRange.map( (e) => {
        const page = e + start

        if (page === currentPage) {
          return (
            <li key={page} className="Pagination-number current">
              <span className="show-for-sr">You're on page </span>
              {page}
            </li>
          )
        } else {
          return (
            <li key={page} className="Pagination-number">
              <a
                href={setHref(page)}
                onClick={(e) => this.onClick(e, page)}
                aria-label={`Page ${page}`}
              >
                {page}
              </a>
            </li>
          )
        }
      })
    )
  }

  onClick = (e, pageNumber) => {
    e.preventDefault()
    const samePage = pageNumber === this.props.currentPage
    const invalidPage = pageNumber < 1 || pageNumber > this.props.totalPages
    if (!samePage && !invalidPage) {
      this.props.onPageClick(pageNumber)
    }
  }

  render() {
    const {currentPage, totalPages, setHref} = this.props
    const {beginArrows, endArrows, start, end} = this.getAttributes()
    const beginArrowsClass = this.getArrowClass(beginArrows, currentPage === 1)
    const endArrowsClass = this.getArrowClass(endArrows, currentPage === totalPages)

    if (totalPages === 1) {
      return null
    } else {
      return (
        <div className={classNames('PaginationContent', this.props.className)}>
          <ul className="pagination" role="navigation" aria-label="Pagination">
            <li className={beginArrowsClass}>
              <a href={setHref(1)} onClick={(e) => this.onClick(e, 1)}>
                <i className="icon-angle-double-left"/>
                First
                <span className="show-for-sr"> page</span>
              </a>
            </li>
            <li className={beginArrowsClass}>
              <a
                href={setHref(currentPage - 1)}
                onClick={(e) => this.onClick(e, currentPage - 1)}
              >
                <i className="icon-angle-left"/>
                Previous
                <span className="show-for-sr"> page</span>
              </a>
            </li>
            <li className={classNames('Pagination-dots', beginArrows ? '' : 'Hidden')}>
              ...
            </li>
            {this.numberLinks(start, end)}
            <li className={classNames('Pagination-dots', endArrows ? '' : 'Hidden')}>
              ...
            </li>
            <li className={endArrowsClass}>
              <a
                href={setHref(currentPage + 1)}
                onClick={(e) => this.onClick(e, currentPage + 1)}
              >
                Next
                <span className="show-for-sr"> page</span>
                <i className="icon-angle-right"/>
              </a>
            </li>
            <li className={endArrowsClass}>
              <a
                href={setHref(totalPages)}
                onClick={(e) => this.onClick(e, totalPages)}
              >
                Last
                <span className="show-for-sr"> page</span>
                <i className="icon-angle-double-right"/>
              </a>
            </li>
          </ul>
          <div className="Pagination-page-list">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )
    }
  }
}
