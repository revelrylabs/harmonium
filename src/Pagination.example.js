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
        currentPage={this.state.currentPage}
        totalPages={14}
        maxViewPages={5}
        onPageClick={this.onPageClick}
      />
    )
  }
}
