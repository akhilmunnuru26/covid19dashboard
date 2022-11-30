import {Component} from 'react'
import {LineChart, XAxis, YAxis, Tooltip, Line, BarChart, Bar} from 'recharts'

import Loader from 'react-loader-spinner'
import Header from '../Header'

import Footer from '../Footer'

import './index.css'

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

const statsStatus = {
  initial: 'INITIAL',
  active: 'ACTIVE',
  confirmed: 'CONFIRMED',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193351/Group_7362_jvfzwe.png',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669198618/Group_7354_ahzhe5.png',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189129/Group_7340_lutow2.png',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189208/Group_7341_ldt7z9.png',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188523/Group_7335_d52ksq.png',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193282/Group_7361_pihty5.png',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189664/Group_7353_s9fraj.png',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193427/Group_7357_wgzlfw.png',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193619/Group_7358_vp3j10.png',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189272/Group_7349_tqbvml.png',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188680/Group_7337_xe3h4r.png',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188114/Group_7332_xmehql.png',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669187818/Group_7364_vfmxnt.png',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669187622/Group_7328_ecgwgm.png',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188892/Group_7342_qyrskh.png',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189909/Group_7339_y4su0h.png',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193007/Group_7355_k9apjl.png',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193711/Group_7363_a26cnl.png',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193497/Group_7359_ymk2ha.png',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189795/Group_7350_sjng1i.png',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188608/Group_7336_evkuxw.png',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189466/Group_7346_u54t1x.png',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189331/Group_7344_ak3nme.png',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189523/Group_7347_artrgs.png',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189410/Group_7345_lh8n3h.png',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189732/Group_7348_i64lhi.png',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193563/Group_7360_fiarmc.png',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    imageUrl:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669187881/Group_7330_v0b1rc.png',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    imageUrl:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188292/Group_7333_amdond.png',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189044/Group_7338_fjipxm.png',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669193116/Group_7356_arksps.png',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189848/Group_7351_bktnjm.png',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669189589/Group_7352_i4akoo.png',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    imageUrl:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188371/Group_7334_ll7tyd.png',
  },
  {
    state_code: 'UT',

    imageUrl:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669187965/Group_7331_a3gmmz.png',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    image_url:
      'https://res.cloudinary.com/dstuhdad3/image/upload/v1669188956/Group_7343_lbt7sx.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class StateSpecificRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    specificStateData: apiStatusConstants.initial,
    status: statsStatus.confirmed,
    topDistrictsCases: [],
    timelineApiStatus: apiStatusConstants.inProgress,
    timelineDataList: [],
  }

  componentDidMount() {
    this.getStateInformation()
    this.getTimelineData()
  }

  // covid select code starts from here

  changeConfirmBgColor = () => {
    const {specificStateData} = this.state
    const {districtsDataList} = specificStateData
    const topResultList = []

    districtsDataList.forEach(item => {
      const cases = item.districtConfirmed ? item.districtConfirmed : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    districtsDataList.reverse()

    this.setState({
      status: statsStatus.confirmed,
      topDistrictsCases: topResultList,
    })
  }

  changeActiveBgColor = () => {
    const {specificStateData} = this.state
    const {districtsDataList} = specificStateData
    const topResultList = []
    districtsDataList.forEach(item => {
      const cases = item.districtActive ? item.districtActive : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    districtsDataList.reverse()

    this.setState({
      status: statsStatus.active,
      topDistrictsCases: topResultList,
    })
  }

  changeRecoveredBgColor = () => {
    const {specificStateData} = this.state
    const {districtsDataList} = specificStateData
    const topResultList = []

    districtsDataList.forEach(item => {
      const cases = item.districtRecovered ? item.districtRecovered : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    districtsDataList.reverse()

    this.setState({
      status: statsStatus.recovered,
      topDistrictsCases: topResultList,
    })
  }

  changeDeceasedBgColor = () => {
    const {specificStateData} = this.state
    const {districtsDataList} = specificStateData
    const topResultList = []

    districtsDataList.forEach(item => {
      const cases = item.districtDeceased ? item.districtDeceased : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    topResultList.reverse()

    this.setState({
      status: statsStatus.deceased,
      topDistrictsCases: topResultList,
    })
  }

  renderTopDistricts = () => {
    const {topDistrictsCases, status} = this.state

    let highlightedText = ''
    switch (status) {
      case statsStatus.confirmed:
        highlightedText = '-confirmed'
        break
      case statsStatus.active:
        highlightedText = '-active'
        break
      case statsStatus.recovered:
        highlightedText = '-recovered'
        break
      case statsStatus.deceased:
        highlightedText = '-deceased'
        break
      default:
        highlightedText = ''
        break
    }

    return (
      <ul
        // testid="topDistrictsUnorderedList"
        className="top-districts-container"
      >
        {topDistrictsCases.map(item => {
          const {name, cases} = item
          return (
            <li className="top-district-list-item" key={name}>
              <div className="top-district-item">
                <p className={`top-district-cases${highlightedText}`}>
                  {cases}
                </p>
                <p className={`top-district-name${highlightedText}`}>{name}</p>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  renderCovidSelect = () => {
    const {status, specificStateData} = this.state
    // console.log(topDistrictsCases)

    let changeTextColor = ''

    switch (status) {
      case statsStatus.confirmed:
        changeTextColor = 'confirmed-tag'
        break
      case statsStatus.active:
        changeTextColor = 'active-tag'
        break
      case statsStatus.recovered:
        changeTextColor = 'recovered-tag'
        break
      case statsStatus.deceased:
        changeTextColor = 'deceased-tag'
        break
      default:
        changeTextColor = ''
        break
    }

    const bgColor1 =
      status === statsStatus.confirmed ? 'on-click-confirmed-tab' : ''
    const bgColor2 = status === statsStatus.active ? 'on-click-active-tab' : ''
    const bgColor3 =
      status === statsStatus.recovered ? 'on-click-recovered-tab' : ''
    const bgColor4 =
      status === statsStatus.deceased ? 'on-click-deceased-tab' : ''

    const {
      confirmed,
      active,
      recovered,
      deceased,
      name,
      population,
      tested,
      lastUpdated,

      // stateCode,
    } = specificStateData
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const currentState = statesList.find(
      state => state.state_code === stateCode,
    )
    const stateImage = currentState.image_url
    const date = new Date(lastUpdated)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const updatedDate = date.toLocaleDateString('en-us', options)

    return (
      <div className="covid-select-page">
        <ul className="country-stats-container">
          <li
            onClick={this.changeConfirmBgColor}
            className={`tab-item-confirmed ${bgColor1}`}
            // testid="stateSpecificConfirmedCasesContainer"
          >
            <p className="tag confirmed-tag">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668096626/check-mark_1-1_m9ubtj.png"
              className="country-wise-count-image"
              alt="state specific confirmed cases pic"
            />

            <p className="count confirmed-tag">{confirmed}</p>
          </li>
          <li
            //  testid="stateSpecificActiveCasesContainer"
            onClick={this.changeActiveBgColor}
            className={`tab-item-active ${bgColor2}`}
          >
            <p className="tag active-tag">Active</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145091/protection_1_wqj33z.png"
              className="country-wise-count-image"
              alt="state specific active cases pic"
            />

            <p className="count active-tag">{active}</p>
          </li>
          <li
            onClick={this.changeRecoveredBgColor}
            className={`tab-item-recovered ${bgColor3}`}
            //   testid="stateSpecificRecoveredCasesContainer"
          >
            <p className="tag recovered-tag">Recovered</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145519/recovered_1_nyqaxl.png"
              className="country-wise-count-image"
              alt="state specific recovered cases pic"
            />

            <p className="count recovered-tag">{recovered}</p>
          </li>
          <li
            onClick={this.changeDeceasedBgColor}
            className={`tab-item-deceased ${bgColor4}`}
            // testid="stateSpecificDeceasedCasesContainer"
          >
            <p className="tag deceased-tag">Deceased</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145529/breathing_1_xa6gda.png"
              className="country-wise-count-image"
              alt="state specific deceased cases pic"
            />

            <p className="count deceased-tag">{deceased}</p>
          </li>
        </ul>
        <div className="state-image-container">
          <img className="state-image" src={stateImage} alt={`${name}`} />
          <div>
            <p className="ncp-report-tag">NCP Report </p>
            <ul className="ncp-report-stats-container">
              <li className="report-item">
                <p className="report-heading">Population</p>
                <p className="report-count">{population}</p>
              </li>
              <li className="report-item">
                <p className="report-heading">Tested</p>
                <h1 className="report-count">{tested}</h1>
                <p className="report-source-date-time">
                  {`(As of ${updatedDate} per source)`}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <h1 className={`heading-tag ${changeTextColor}`}>Top Districts</h1>
        <div>{this.renderTopDistricts()}</div>
      </div>
    )
  }

  // covid select code ends here

  // time line code starts here
  //
  //
  //

  renderConfirmedCasesBarChart = () => {
    const {timelineDataList} = this.state
    const confirmedData = timelineDataList
      .map(item => ({
        date: item.date,
        count: item.confirmed,
      }))
      .slice(0, 10)

    return (
      <div className="bar-charts-container">
        <div className="bar-chart-desktop">
          <div>
            <BarChart width={700} height={400} data={confirmedData}>
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

  //

  renderActiveCasesBarChart = () => {
    const {timelineDataList} = this.state
    const activeData = timelineDataList
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

  //

  renderRecoveredCasesBarChart = () => {
    const {timelineDataList} = this.state
    const recoveredData = timelineDataList
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

  //

  renderDeceasedCasesBarChart = () => {
    const {timelineDataList} = this.state
    const deceasedData = timelineDataList
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

  //

  renderBarGraphs = () => {
    const {status} = this.state

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

  // line charts

  renderLineCharts = () => {
    const {timelineDataList} = this.state
    const confirmedData = timelineDataList.map(item => ({
      date: item.date,
      count: item.confirmed,
    }))

    const activeData = timelineDataList.map(item => ({
      date: item.date,
      count: item.confirmed - (item.recovered + item.deceased),
    }))

    const recoveredData = timelineDataList.map(item => ({
      date: item.date,
      count: item.recovered,
    }))

    const deceasedData = timelineDataList.map(item => ({
      date: item.date,
      count: item.deceased,
    }))

    const testedData = timelineDataList.map(item => ({
      date: item.date,
      count: item.tested,
    }))

    // console.log(testedData)

    return (
      <div /* testid="lineChartsContainer" */ className="line-chart-container">
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
            <h1 className="confirmed-chart-tag recovered">Recovered</h1>
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

  renderTimelineApiViews = () => {
    const {timelineApiStatus} = this.state
    switch (timelineApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderTimelineLoadingView()
      case apiStatusConstants.success:
        return this.renderTimelineSuccessView()
      case apiStatusConstants.failure:
        return this.renderTimelineFailureView()
      default:
        return null
    }
  }

  renderTimelineLoadingView = () => (
    <div /* testid="timelinesDataLoader" */ className="loader-spinner">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  renderTimelineFailureView = () => {}

  renderTimelineSuccessView = () => (
    <>
      {this.renderBarGraphs()}
      <h1 className="daily-spread-title">Daily Spread Trends</h1>
      {this.renderLineCharts()}
    </>
  )

  // state specific code starts here
  //
  //

  renderApiStatusViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getApiSuccessView()
      case apiStatusConstants.failure:
        return this.getApiFailureView()
      case apiStatusConstants.inProgress:
        return this.getApiLoadingView()
      default:
        return null
    }
  }

  getApiSuccessView = () => {
    const {specificStateData} = this.state

    const {lastUpdated, name, tested} = specificStateData

    const date = new Date(lastUpdated)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const updatedDate = date.toLocaleDateString('en-us', options)

    return (
      <div className="specific-page-content">
        <div className="specific-state-header">
          <div>
            <div className="state-name-container">
              <h1 className="specific-state-name">{name}</h1>
            </div>
            <p className="last-updated">last update date from {updatedDate}.</p>
          </div>
          <div className="test-count-container">
            <p className="tested-tag">Tested</p>
            <p className="tested-count">{tested}</p>
          </div>
        </div>
        <div className="state-total-stats">{this.renderCovidSelect()}</div>
        <div>{this.renderTimelineApiViews()}</div>
      </div>
    )
  }

  getApiLoadingView = () => (
    <div /* testid="stateDetailsLoader" */ className="loader-spinner">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  getApiFailureView = () => <h1>Oops!</h1>

  getTimelineData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const timelineRequestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }

    const timelineResponse = await fetch(timelineRequestUrl, options)
    if (timelineResponse.ok === true) {
      const timelineData = await timelineResponse.json()

      const keyNames = Object.keys(timelineData[stateCode].dates)
      const timelineDataList = []

      keyNames.forEach(date =>
        timelineDataList.push({
          date,
          confirmed: timelineData[stateCode].dates[date].total.confirmed,
          deceased: timelineData[stateCode].dates[date].total.deceased,
          recovered: timelineData[stateCode].dates[date].total.recovered,
          tested: timelineData[stateCode].dates[date].total.tested,
        }),
      )

      this.setState({
        timelineDataList,
        timelineApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({timelineApiStatus: apiStatusConstants.failure})
    }
  }

  getStateInformation = async () => {
    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    // specific state api request
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data`
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      // state specific api data extraction
      const resultList = []
      const districtsDataList = []
      const topResultList = []

      const keyNames = Object.keys(data)
      keyNames.splice(33, 1)

      if (data[stateCode]) {
        const {total} = data[stateCode]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[stateCode].meta.population
          ? data[stateCode].meta.population
          : 0
        const lastUpdated = data[stateCode].meta.last_updated
          ? data[stateCode].meta.last_updated
          : 0
        const {districts} = data[stateCode]
        const districtNamesList = Object.keys(districts)

        districtNamesList.forEach(key => {
          if (districts[key]) {
            const districtName = key

            const districtsTotal = districts[key].total
              ? districts[key].total
              : 0
            const districtsMeta = districts[key].meta ? districts[key].meta : 0
            const districtConfirmed = districtsTotal.confirmed
              ? districtsTotal.confirmed
              : 0
            const districtDeceased = districtsTotal.deceased
              ? districtsTotal.deceased
              : 0
            const districtRecovered = districtsTotal.recovered
              ? districtsTotal.recovered
              : 0
            const districtTested = districtsTotal.tested
              ? districtsTotal.tested
              : 0
            const districtPopulation = districtsMeta.population
              ? districtsMeta.population
              : 0

            districtsDataList.push({
              districtName,
              districtConfirmed,
              districtDeceased,
              districtTested,
              districtPopulation,
              districtRecovered,
              districtActive:
                districtConfirmed - (districtDeceased + districtRecovered),
            })
          }
          return districtsDataList.reverse()
        })

        districtsDataList.forEach(item => {
          const cases = item.districtConfirmed ? item.districtConfirmed : 0

          return topResultList.push({
            name: item.districtName,
            cases,
          })
        })

        resultList.push({
          stateCode,
          name: statesList.find(state => state.state_code === stateCode)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
          lastUpdated,
          districtsDataList,
        })
      }

      const currentStateInfo = resultList.find(
        state => state.stateCode === stateCode,
      )

      // specific state data extraction ends here

      this.setState({
        apiStatus: apiStatusConstants.success,
        timelineApiStatus: apiStatusConstants.inProgress,
        specificStateData: currentStateInfo,
        topDistrictsCases: topResultList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    return (
      <div className="specific-state-page">
        <Header />
        {this.renderApiStatusViews()}
        <div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default StateSpecificRoute
