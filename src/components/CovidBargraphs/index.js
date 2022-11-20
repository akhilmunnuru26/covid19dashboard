import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
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

const CasesFormatter = count => {
  console.log(count)
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

const DateFormatter = number => {
  const options = {month: 'short', day: 'numeric'}
  const date = new Date(number).toLocaleDateString('en-us', options)
  return date
}

const tabConstants = {
  active: 'ACTIVE',
  confirmed: 'CONFIRMED',
  deceased: 'DECEASED',
  recovered: 'RECOVERED',
}

class CovidGraphs extends Component {
  state = {apiStatus: apiStatusConst.progress, timelineData: []}

  componentDidMount() {
    this.getTimelineData()
  }

  renderConfirmedCasesBarChart = () => {
    const {timelineData} = this.state
    const confirmedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.confirmed,
      }))
      .slice(0, 6)

    return (
      <div className="bar-charts-container">
        <div className="bar-chart-desktop">
          <div>
            <BarChart width={700} height={250} data={confirmedData}>
              <XAxis
                // label={{position: 'bottom', color: 'white'}}
                dataKey="date"
                tick={{strokeWidth: 1, fill: 'red', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#FF073A"
                className="bar"
                label={{position: 'top', fill: 'red', fontSize: 10}}
              />
            </BarChart>
          </div>
        </div>
        <div className="bar-chart-mobile">
          <div>
            <BarChart width={300} height={250} data={confirmedData}>
              <XAxis
                // label={{position: 'bottom', color: 'white'}}
                dataKey="date"
                tick={{strokeWidth: 1, fill: 'red', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#FF073A"
                className="bar"
                label={{position: 'top', fill: 'red', fontSize: 10}}
              />
            </BarChart>
          </div>
        </div>
      </div>
    )
  }

  renderActiveCasesBarChart = () => {
    const {timelineData} = this.state
    const activeData = timelineData
      .map(item => ({
        date: item.date,
        count: item.confirmed - (item.recovered + item.deceased),
      }))
      .slice(0, 10)
    return (
      <div className="bar-charts-container">
        <div className="bar-chart-desktop">
          <div>
            <BarChart width={700} height={250} data={activeData}>
              <XAxis
                dataKey="date"
                tick={{strokeWidth: 1, fill: '#0A4FA0', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#0A4FA0"
                className="bar"
                label={{position: 'top', fill: '#0A4FA0', fontSize: 10}}
                barSize={40}
              />
            </BarChart>
          </div>
        </div>
        <div className="bar-chart-mobile">
          <div>
            <BarChart width={300} height={250} data={activeData}>
              <XAxis
                // label={{position: 'bottom', color: 'white'}}
                dataKey="date"
                tick={{strokeWidth: 1, fill: '#0A4FA0', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#0A4FA0"
                className="bar"
                label={{position: 'top', fill: '#0A4FA0', fontSize: 10}}
              />
            </BarChart>
          </div>
        </div>
      </div>
    )
  }

  renderRecoveredCasesBarChart = () => {
    const {timelineData} = this.state
    const recoveredData = timelineData
      .map(item => ({
        date: item.date,
        count: item.recovered,
      }))
      .slice(0, 10)
    return (
      <div className="bar-charts-container">
        <div className="bar-chart-desktop">
          <div>
            <BarChart width={700} height={250} data={recoveredData}>
              <XAxis
                dataKey="date"
                tick={{strokeWidth: 1, fill: '#216837', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#216837"
                className="bar"
                label={{position: 'top', fill: '#216837', fontSize: 10}}
                barSize={40}
              />
            </BarChart>
          </div>
        </div>
        <div className="bar-chart-mobile">
          <div>
            <BarChart width={300} height={250} data={recoveredData}>
              <XAxis
                // label={{position: 'bottom', color: 'white'}}
                dataKey="date"
                tick={{strokeWidth: 1, fill: '#216837', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#216837"
                className="bar"
                label={{position: 'top', fill: '#216837', fontSize: 10}}
              />
            </BarChart>
          </div>
        </div>
      </div>
    )
  }

  renderDeceasedCasesBarChart = () => {
    const {timelineData} = this.state
    const deceasedData = timelineData
      .map(item => ({
        date: item.date,
        count: item.deceased,
      }))
      .slice(0, 10)
    return (
      <div className="bar-charts-container">
        <div className="bar-chart-desktop">
          <div>
            <BarChart width={700} height={250} data={deceasedData}>
              <XAxis
                dataKey="date"
                tick={{strokeWidth: 1, fill: '#474C57', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#474C57"
                className="bar"
                label={{position: 'top', fill: '#474C57', fontSize: 10}}
                barSize={40}
              />
            </BarChart>
          </div>
        </div>
        <div className="bar-chart-mobile">
          <div>
            <BarChart width={300} height={250} data={deceasedData}>
              <XAxis
                // label={{position: 'bottom', color: 'white'}}
                dataKey="date"
                tick={{strokeWidth: 1, fill: '#474C57', fontSize: 10}}
                tickLine={false}
                axisLine={false}
                tickFormatter={DateFormatter}
              />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#474C57"
                className="bar"
                label={{position: 'top', fill: '#474C57', fontSize: 10}}
              />
            </BarChart>
          </div>
        </div>
      </div>
    )
  }

  renderBarGraphs = () => {
    const {status} = this.props

    switch (status) {
      case tabConstants.confirmed:
        return this.renderConfirmedCasesBarChart()
      case tabConstants.active:
        return this.renderActiveCasesBarChart()
      case tabConstants.recovered:
        return this.renderRecoveredCasesBarChart()
      case tabConstants.deceased:
        return this.renderDeceasedCasesBarChart()

      default:
        return null
    }
  }

  renderLineCharts = () => {
    const {timelineData} = this.state
    const confirmedData = timelineData.map(item => ({
      date: item.date,
      count: item.confirmed,
    }))

    const activeData = timelineData.map(item => ({
      date: item.date,
      count: item.confirmed - (item.recovered + item.deceased),
    }))

    console.log(activeData)

    const recoveredData = timelineData.map(item => ({
      date: item.date,
      count: item.recovered,
    }))

    const deceasedData = timelineData.map(item => ({
      date: item.date,
      count: item.deceased,
    }))

    const testedData = timelineData.map(item => ({
      date: item.date,
      count: item.tested,
    }))

    // console.log(testedData)

    return (
      <div className="line-chart-container"  testid="lineChartsContainer" */>
        <>
          <div className="confirmed-cases-line-chart-mobile confirmed-bg">
            <h1 className="confirmed-chart-tag">Confirmed</h1>
            <div className="line-chart">
              <LineChart width={300} height={250} data={confirmedData}>
                <XAxis dataKey="date" stroke=" #ff073a" />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke=" #ff073a"
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke=" #ff073a"
                />
              </LineChart>
            </div>
          </div>
          <div className="confirmed-cases-line-chart-desktop confirmed-bg">
            <h1 className="confirmed-chart-tag">Confirmed</h1>
            <div className="line-chart">
              <LineChart width={800} height={300} data={confirmedData}>
                <XAxis tick dataKey="date" stroke=" #ff073a" />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke=" #ff073a"
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke=" #ff073a"
                />
              </LineChart>
            </div>
          </div>
        </>
        <>
          <div className="confirmed-cases-line-chart-mobile active-bg">
            <h1 className="confirmed-chart-tag active">Active</h1>
            <div className="line-chart">
              <LineChart
                width={300}
                height={250}
                data={activeData}
                margin={{top: 5, right: 50, left: 10, bottom: 5}}
              >
                <XAxis tick dataKey="date" stroke="#007BFF" />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke="#007BFF"
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#007BFF"
                />
              </LineChart>
            </div>
          </div>
          <div className="confirmed-cases-line-chart-desktop active-bg">
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
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke="#007BFF"
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#007BFF"
                />
              </LineChart>
            </div>
          </div>
        </>
        <>
          <div className="confirmed-cases-line-chart-desktop recovered-bg">
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
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke="#27A243"
                />
                <Tooltip content={<CustomTooltip class="recovered" />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#27A243"
                />
              </LineChart>
            </div>
          </div>
          <div className="confirmed-cases-line-chart-mobile recovered-bg">
            <h1 className="confirmed-chart-tag recovered">recovered</h1>
            <div className="line-chart">
              <LineChart
                width={300}
                height={250}
                data={recoveredData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis tick dataKey="date" stroke=" #27A243" />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke="#27A243"
                />
                <Tooltip content={<CustomTooltip class="recovered" />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#27A243"
                />
              </LineChart>
            </div>
          </div>
        </>
        <>
          <div className="confirmed-cases-line-chart-mobile deceased-bg">
            <h1 className="confirmed-chart-tag deceased">Deceased</h1>
            <div className="line-chart">
              <LineChart
                width={300}
                height={250}
                data={deceasedData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis tick dataKey="date" stroke="#6C757D" />
                <YAxis
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke="#6C757D"
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#6C757D"
                />
              </LineChart>
            </div>
          </div>
          <div className="confirmed-cases-line-chart-desktop deceased-bg">
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
                  domain={['auto', 'auto']}
                  tickFormatter={DataFormatter}
                  stroke="#6C757D"
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#6C757D"
                />
              </LineChart>
            </div>
          </div>
        </>
        <>
          <div className="confirmed-cases-line-chart-desktop tested-bg">
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
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#6C757D"
                />
              </LineChart>
            </div>
          </div>
          <div className="confirmed-cases-line-chart-mobile tested-bg">
            <h1 className="confirmed-chart-tag tested">Tested</h1>
            <div className="line-chart">
              <LineChart
                width={300}
                height={250}
                data={testedData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis tick dataKey="date" stroke="#6C757D" />
                <YAxis
                  tickFormatter={DataFormatter}
                  stroke="#6C757D"
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  dot={false}
                  type="monotone"
                  dataKey="count"
                  stroke="#6C757D"
                />
              </LineChart>
            </div>
          </div>
        </>
      </div>
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
    <div className="loader-spinner"  testid="timelinesDataLoader"  >
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.renderBarGraphs()}
      <h1 className="daily-spread-title">Daily Spread Trends</h1>
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

export default CovidGraphs
