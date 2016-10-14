import React, {Component} from 'react'
import Pagination from './Pagination'

export class Example extends Component {
  state = {
    currentPage: 1,
  }

  onPageClick = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    return (
      <Pagination
        currentPage={1}
        totalPages={14}
        maxViewPages={7}
        onPageClick={this.onPageClick}
      />
    )
  }
}
