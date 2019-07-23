import Chart from 'chart.js'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

const REV_CHART_SPEC = {
  bar: {
    defaultOptions: {
      // Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      // Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLine: true,
      // Whether to show vertical lines (except Y axis)
      scaleShowVerticalLine: false,
      barShowStroke: true,
      barStrokeWidth: 2,
      // Spacing between each of the X value sets
      barValueSpacing: 5,
      // Spacing between data sets within X values
      barDatasetSpacing: 1,
      // Amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      // Whether to show a stroke for datasets
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: false,
    },
  },
  donut: {
    defaultOptions: {
      segmentShowStroke: true,
      segmentStrokeColor: '#fff',
      segmentStrokeWidth: 2,
      percentageInnerCutout: 50,
      animationSteps: 100,
      animationEasing: 'easeOutBounce',
      animateRotate: true,
      animateScale: false,
    },
  },
  line: {
    defaultOptions: {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLine: true,
      scaleShowVerticalLine: false,
      bezierCurve: false,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: false,
    },
  },
  pie: {
    defaultOptions: {
      segmentShowStroke: true,
      segmentStrokeColor: '#fff',
      segmentStrokeWidth: 2,
      percentageInnerCutout: 0,
      animationSteps: 100,
      animationEasing: 'easeOutBounce',
      animateRotate: true,
      animateScale: false,
    },
  },
  radar: {
    defaultOptions: {
      // Whether to show lines for each scale point
      scaleShowLine: true,
      // Whether we show the angle lines out of the radar
      angleShowLineOut: true,
      scaleShowLabels: false,
      scaleBeginAtZero: true,
      // Colour of the angle line
      angleLineColor: 'rgba(0,0,0,.1)',
      // Pixel width of the angle line
      angleLineWidth: 1,
      pointLabelFontFamily: 'Arial',
      pointLabelFontStyle: 'normal',
      pointLabelFontSize: 10,
      pointLabelFontColor: '#666',
      pointDot: true,
      pointDotRadius: 3,
      pointDotStrokeWidth: 1,
      // amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
    },
  },
}

export default class ChartBuilder extends Component {
  static get propTypes() {
    return {
      data: PropTypes.object.isRequired,
      type: PropTypes.oneOf(Object.keys(REV_CHART_SPEC)).isRequired,
      options: PropTypes.object,
      width: PropTypes.number,
      height: PropTypes.number,
      title: PropTypes.string,
    }
  }

  static get defaultProps() {
    return {
      title: 'Chart Title',
      width: 300,
      height: 300,
    }
  }

  componentDidMount() {
    this.createChart()
  }

  componentWillUnmount() {
    this.destroyChart()
  }

  get ctx() {
    return this.canvas.getContext('2d')
  }

  get chartSpec() {
    return REV_CHART_SPEC[this.props.type]
  }

  get chartFuncName() {
    return this.props.type
  }

  get options() {
    const opts = Object.assign({}, this.chartSpec.defaultOptions)

    return Object.assign(opts, this.props.options)
  }

  createChart() {
    if (this._chart) {
      throw new Error('`createChart` may only be called once.`')
    }
    this._chart = new Chart(this.ctx, {
      type: this.props.type,
      data: this.props.data,
      options: this.options,
    })
  }

  destroyChart() {
    this._chart.destroy()
  }

  render() {
    return (
      <div>
        <h3 className="ChartTitle">{this.props.title}</h3>
        <canvas
          ref={(self) => {
            this.canvas = self
          }}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}
