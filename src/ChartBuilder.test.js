import ChartBuilder from './ChartBuilder.js'

describe('ChartBuilder', () => {
  it('should render without throwing', () => {
    shallow(
      <ChartBuilder
        data={{
          labels: ['Red', 'Blue'],
          datasets: [{
            label: '#',
            data: [1,2],
            backgroundColor: [
              'red',
              'blue',
            ],
          }]
        }}
        type='pie'
        title='Pie Chart'
      />
    )
  })
})
