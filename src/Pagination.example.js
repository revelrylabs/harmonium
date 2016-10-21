import React, {Component} from 'react'
import Pagination from './Pagination'

export class Example1 extends Component {
  state = {
    currentPage: 1,
  }

  onPageClick = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    return (
      <div>
        <h5 className="subheader">Disabled (default) begin and end arrows</h5>
        <br />
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={14}
          maxViewPages={5}
          onPageClick={this.onPageClick}
        />
        <br />
      </div>
    )
  }
}

export class Example2 extends Component {
  state = {
    currentPage: 1,
  }

  onPageClick = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    return (
      <div>
        <h5 className="subheader">Hidden begin and end arrows</h5>
        <br />
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={14}
          maxViewPages={5}
          onPageClick={this.onPageClick}
          hideArrows={true}
        />
      </div>
    )
  }
}
