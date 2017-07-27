import React, {Component} from 'react'
import Chart from 'Chart.js'
import ChartBuilder from './ChartBuilder'


export class Example1 extends Component {
  render(){
    return (
      <ChartBuilder
      data={{
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [1,2,3,4,5,6],
          backgroundColor: [
            'red',
            'blue',
            'yellow',
            'green',
            'purple',
            'orange'
          ],
          borderWidth: 1
        }]
      }}
      type='pie'
      title='Pie Chart'
      />
    )
  }
}
