import Pagination from './Pagination'

describe('Pagination', () => {
  it('should render without throwing', () => {
    const onPageClick = () => { console.log("do something") }

    shallow(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageClick={onPageClick}
      />
    )
  })
})
