import React, {Component, PropTypes} from 'react'

export default class Pagination extends Component {

  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    maxViewPages: PropTypes.number.isRequired,
  }

  getAttributes() {
    const {currentPage, totalPages, maxViewPages} = this.props
    let attributes = {
      beginArrows: false,
      endArrows: false
    }

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

  numberLinks(start, end) {
    const baseRange = Array.from(Array(end - start + 1).keys())
    const currentPage = this.props.currentPage

    return (
      baseRange.map( (e) => {
        const page = e + start
        const activeClass = (page === currentPage) ? 'Active' : ''

        return (
          <li
            key={page}
            className={`Pagination-number ${activeClass}`}>
            <a href="#" onClick={(e) => this.onClick(e, page)}>{page}</a>
          </li>
        )
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
    const {currentPage, totalPages} = this.props
    const {beginArrows, endArrows, start, end} = this.getAttributes()
    const beginArrowsClass = (beginArrows) ? '' : 'Disabled'
    const endArrowsClass = (endArrows) ? '' : 'Disabled'

    if (totalPages === 1) {
      return null
    } else {
      return (
        <div className={`PaginationContent ${this.props.className}`}>
          <ul className="Pagination">
            <li className={`Pagination-first ${beginArrowsClass}`}>
              <a href="#" onClick={(e) => this.onClick(e, 1)}>
                <i className="icon-angle-double-left"/>
              </a>
            </li>
            <li className={`Pagination-previous ${beginArrowsClass}`}>
              <a href="#" onClick={(e) => this.onClick(e, currentPage - 1)}>
                <i className="icon-angle-left"/>
              </a>
            </li>
            <li className={`Pagination-dots ${beginArrowsClass}`}>...</li>
            {this.numberLinks(start, end)}
            <li className={`Pagination-dots ${endArrowsClass}`}>...</li>
            <li className={`Pagination-next ${endArrowsClass}`}>
              <a href="#" onClick={(e) => this.onClick(e, currentPage + 1)}>
                <i className="icon-angle-right"/>
              </a>
            </li>
            <li className={`Pagination-last ${endArrowsClass}`}>
              <a href="#" onClick={(e) => this.onClick(e, totalPages)}>
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
