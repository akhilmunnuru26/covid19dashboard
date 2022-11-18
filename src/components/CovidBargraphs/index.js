import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  // Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'

import './index.css'

const CustomLabel = props => {
  const {x, y, stroke, value, fill} = props

  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fill={fill}
      color="white"
      fontSize={20}
      textAnchor="middle"
    >
      {value}
    </text>
  )
}

const CustomTooltip = ({active, payload}: any) => {
  if (active && payload && payload.length) {
    const options = {year: 'numeric', month: 'short', day: 'numeric'}
    return (
      <div className="custom-tooltip">
        <p className="label-date">{`${new Date(
          payload[0].payload.date,
        ).toLocaleDateString('en-us', options)}`}</p>
        <p className="label-count">{`${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

const apiStatusConst = {
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const DataFormatter = number => {
  if (number > 1000) {
    const num = Math.round(number / 1000)

    return `${num.toString()}k`
  }
  return number.toString()
}

const tabConstants = {
  active: 'ACTIVE',
  confirmed: 'CONFIRMED',
  deceased: 'DECEASED',
  recovered: 'RECOVERED',
}

class CovidBargraphs extends Component {
  state = {apiStatus: apiStatusConst.progress, timelineData: []}

  componentDidMount() {
    this.getTimelineData()
  }

  renderBarGraphs = () => {
    const {timelineData} = this.state

    // const {status} = this.props

    const activeData = timelineData
      .map(item => ({
        date: item.date,
        count: item.confirmed - (item.recovered + item.deceased),
      }))
      .slice(0, 6)
    // console.log(active)

    const confirmedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.confirmed,
      }))
      .slice(0, 6)
      .sort()

    const recoveredData = timelineData
      .map(item => ({
        date: item.date,
        count: item.recovered,
      }))
      .slice(0, 6)

    const deceasedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.deceased,
      }))
      .slice(0, 6)

    const {status} = this.props
    let data = []
    let color = ''
    switch (status) {
      case tabConstants.active:
        data = activeData
        color = '#0A4FA0'
        break
      case tabConstants.confirmed:
        data = confirmedData
        color = '#FF073A'
        break
      case tabConstants.recovered:
        data = recoveredData
        color = '#216837'
        break
      case tabConstants.deceased:
        data = deceasedData
        color = '#474C57'
        break
      default:
        data = ''
        color = ''
        break
    }
    return (
      <div style={{position: 'relative', width: '50%'}} className="bar-chart">
        <div style={{position: 'absolute', height: '100%'}}>
          <BarChart width={600} height={300} data={data}>
            <XAxis hide dataKey="date" />
            <YAxis
              hide
              tickFormatter={DataFormatter}
              domain={[2010000, 2040708]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill={color}
              className="label-text"
              label={{position: 'top', color: 'white'}}
              barSize={50}
              barGap={0}
            />
          </BarChart>
        </div>
      </div>
    )
  }

  renderLineCharts = () => {
    const {timelineData} = this.state
    const confirmedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.confirmed,
      }))
      .slice(0, 18)

    const activeData = timelineData
      .map(item => ({
        date: item.date,
        count: item.confirmed - (item.recovered + item.deceased),
      }))
      .slice(0, 10)

    console.log(activeData)

    const recoveredData = timelineData
      .map(item => ({
        date: item.date,
        count: item.recovered,
      }))
      .slice(0, 10)

    const deceasedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.deceased,
      }))
      .slice(0, 18)

    const testedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.tested,
      }))
      .slice(0, 10)

    // console.log(testedData)

    return (
      <div testid="lineChartsContainer">
        <div className="confirmed-cases-line-chart confirmed-bg">
          <h1 className="confirmed-chart-tag">Confirmed</h1>
          <div className="line-chart">
            <LineChart width={800} height={250} data={confirmedData}>
              <XAxis tick dataKey="date" stroke=" #ff073a" />
              <YAxis
                domain={[2030849, 2040708]}
                tickFormatter={DataFormatter}
                stroke=" #ff073a"
              />
              <Tooltip content={<CustomTooltip />} />

              <Line type="monotone" dataKey="count" stroke=" #ff073a" />
            </LineChart>
          </div>
        </div>
        <div className="confirmed-cases-line-chart active-bg">
          <h1 className="confirmed-chart-tag active">Active</h1>
          <div className="line-chart">
            <LineChart
              width={800}
              height={250}
              data={activeData}
              margin={{top: 5, right: 50, left: 10, bottom: 5}}
            >
              <XAxis tick dataKey="date" stroke="#007BFF" />
              <YAxis
                domain={[13905, 15200]}
                tickFormatter={DataFormatter}
                stroke="#007BFF"
              />
              <Tooltip content={<CustomTooltip />} />

              <Line type="monotone" dataKey="count" stroke="#007BFF" />
            </LineChart>
          </div>
        </div>
        <div className="confirmed-cases-line-chart recovered-bg">
          <h1 className="confirmed-chart-tag recovered">recovered</h1>
          <div className="line-chart">
            <LineChart
              width={800}
              height={250}
              data={recoveredData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis tick dataKey="date" stroke=" #27A243" />
              <YAxis
                domain={[2000817, 2012714]}
                tickFormatter={DataFormatter}
                stroke="#27A243"
              />
              <Tooltip content={<CustomTooltip class="recovered" />} />

              <Line type="monotone" dataKey="count" stroke="#27A243" />
            </LineChart>
          </div>
        </div>
        <div className="confirmed-cases-line-chart deceased-bg">
          <h1 className="confirmed-chart-tag deceased">Deceased</h1>
          <div className="line-chart">
            <LineChart
              width={800}
              height={250}
              data={deceasedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis tick dataKey="date" stroke="#6C757D" />
              <YAxis
                domain={[13990, 14089]}
                tickFormatter={DataFormatter}
                stroke="#6C757D"
              />
              <Tooltip content={<CustomTooltip />} />

              <Line type="monotone" dataKey="count" stroke="#6C757D" />
            </LineChart>
          </div>
        </div>
        <div className="confirmed-cases-line-chart tested-bg">
          <h1 className="confirmed-chart-tag tested">Tested</h1>
          <div className="line-chart">
            <LineChart
              width={800}
              height={250}
              data={testedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis tick dataKey="date" stroke="#6C757D" />
              <YAxis
                tickFormatter={DataFormatter}
                stroke="#6C757D"
                domain={[70000000, 8000000]}
              />
              <Tooltip content={<CustomTooltip />} />

              <Line type="monotone" dataKey="count" stroke="#6C757D" />
            </LineChart>
          </div>
        </div>
      </>
    )
  }

  renderApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConst.progress:
        return this.renderLoadingView()
      case apiStatusConst.success:
        return this.renderSuccessView()
      case apiStatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div testid="timelinesDataLoader" className="loader-spinner">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.renderBarGraphs()}
      {this.renderLineCharts()}
    </>
  )

  renderFailureView = () => {}

  getTimelineData = async () => {
    const {stateCode} = this.props
    const requestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(requestUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const keyNames = Object.keys(data[stateCode].dates)
      const timelineData = []

      keyNames.forEach(date =>
        timelineData.push({
          date,
          confirmed: data[stateCode].dates[date].total.confirmed,
          deceased: data[stateCode].dates[date].total.deceased,
          recovered: data[stateCode].dates[date].total.recovered,
          tested: data[stateCode].dates[date].total.tested,
        }),
      )

      this.setState({timelineData, apiStatus: apiStatusConst.success})
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  render() {
    return <div className="covid-bar-graphs">{this.renderApiViews()}</div>
  }
}

export default CovidBargraphs
