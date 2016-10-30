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
        <p>This example shows the default case where begin and end arrows are disabled, max number of pages listed at a time are 5, and no class names are passed.</p>
        <p>The component is mobile-responsive for all examples. The number links are hidden, and a text description of the pages is provided instead.</p>
        <p>This component requires custom styling, which is included in the <strong>Pagination.scss</strong> file.</p>
        <br />
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={14}
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
        <p>This example shows the pagination component when hidden begin and end arrows are set to true, max view pages are 3, and a custom className (text-center) is passed to the component.</p>
        <p>Note that the component is still mobile-responsive, and still requires the included stylesheet (<strong>Pagination.scss</strong>).</p>
        <br />
        <Pagination
          className="text-center"
          currentPage={this.state.currentPage}
          totalPages={14}
          maxViewPages={4}
          onPageClick={this.onPageClick}
          hideArrows={true}
        />
      </div>
    )
  }
}

export class Example3 extends Component {
  state = {
    currentPage: 1,
  }

  onPageClick = (pageNumber) => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    return (
      <div>
        <p>This example shows the default case for all props except custom content is passed for the first, next, previous, last buttons.</p>
        <p>This component requires custom styling, which is included in the <strong>Pagination.scss</strong> file.</p>
        <br />
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={14}
          onPageClick={this.onPageClick}
          firstPageContent={<i className="icon-angle-double-left" />}
          previousPageContent={<i className="icon-angle-left" />}
          nextPageContent={<i className="icon-angle-right" />}
          lastPageContent={<i className="icon-angle-double-right" />}
        />
        <br />
      </div>
    )
  }
}
