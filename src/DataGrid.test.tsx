import React from 'react'
import { render } from '@testing-library/react'
import DataGrid from './DataGrid'

describe('DataGrid', () => {
  it('should render without throwing', () => {
    render(<DataGrid />)
    // Should render without errors
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(<DataGrid className={testClassName} />)
    
    const grid = container.firstChild
    expect(grid).toHaveClass('rev-DataGrid')
    expect(grid).toHaveClass(testClassName)
  })

  it('should handle boolean props correctly', () => {
    const { container: stripedContainer } = render(<DataGrid striped />)
    expect(stripedContainer.firstChild).toHaveClass('rev-DataGrid--striped')
    
    const { container: scrollContainer } = render(<DataGrid horizontalScroll />)
    expect(scrollContainer.firstChild).toHaveClass('rev-DataGrid--horizontalScroll')
    
    const { container: verticalContainer } = render(<DataGrid verticalScroll />)
    expect(verticalContainer.firstChild).toHaveClass('rev-DataGrid--verticalScroll')
  })
})

describe('DataGrid subcomponents', () => {
  it('renders HeaderRow properly', () => {
    const { container } = render(<DataGrid.HeaderRow />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-headerRow')
  })

  it('renders HeaderCol properly', () => {
    const { container } = render(<DataGrid.HeaderCol />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-headerCol')
  })

  it('renders HeaderRowStacked properly', () => {
    const { container } = render(<DataGrid.HeaderRowStacked />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-headerRow--stacked')
  })

  it('renders HeaderInline properly', () => {
    const { container } = render(<DataGrid.HeaderInline />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-header--inline')
  })

  it('renders Body properly', () => {
    const { container } = render(<DataGrid.Body />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-body')
  })

  it('renders Row properly', () => {
    const { container } = render(<DataGrid.Row />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-row')
  })

  it('renders Col properly', () => {
    const { container } = render(<DataGrid.Col />)
    expect(container.firstChild).toHaveClass('rev-DataGrid-col')
  })
}) 