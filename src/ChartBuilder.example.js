import React, {Component} from 'react'
import Chart from 'Chart.js'
import ChartBuilder from './ChartBuilder'


export class Example1 extends Component {
  render(){
    return (
        <div>
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
          <ChartBuilder
            data={{
              labels: ['Free Time', 'Energy', 'Money'],
              datasets: [
                {
                  label: 'Youth',
                  data: [2,3,1],
                  borderColor: 'red',
                  backgroundColor:"rgba(255,0,0,0.5)"
                },
                {
                  label: 'Adulthood',
                  data: [1,2,3],
                  borderColor: 'yellow',
                  backgroundColor:"rgba(255,255,0,0.5)"
                },
                {
                  label: 'Retirement',
                  data: [3,1,2],
                  borderColor: 'blue',
                  backgroundColor:"rgba(0,0,255,0.5)"
                },
              ]
            }}
            type='radar'
            title='Radar Chart'
            options={{'scaleBeginAtZero':true}}
          />
        </div>
    )
  }
}
