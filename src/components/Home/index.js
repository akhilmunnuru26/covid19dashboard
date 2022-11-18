import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import ReactSelect from '../ReactSelect'

import CovidStateWiseInformation from '../CovidStateWiseInformation'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const formatStateList = statesList.map(state => ({
  stateCode: state.state_code,
  stateName: state.state_name,
}))

// console.log(formattedStatesList.length)

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    selected: null,
    apiStatus: apiStatusConstants.progress,
    covidStateWiseData: '',
  }

  componentDidMount() {
    this.getStateWiseStats()
  }

  handleChange = value => {
    this.setState({
      selected: value,
    })
  }

  getCountryWiseStats = array => {
    let sum = 0
    array.forEach(item => {
      sum += item
    })
    return sum
  }

  renderTotalIndiaCovidCases = () => {
    const {covidStateWiseData} = this.state

    // console.log(covidStateWiseData.reverse())

    const totalStateWiseConfirmedCases = covidStateWiseData.map(state =>
      parseInt(state.confirmed),
    )
    const totalStateWiseActiveCases = covidStateWiseData.map(state =>
      parseInt(state.active),
    )
    const totalStateWiseRecoveredCases = covidStateWiseData.map(state =>
      parseInt(state.recovered),
    )
    const totalStateWiseDeceasedCases = covidStateWiseData.map(state =>
      parseInt(state.deceased),
    )

    const countryConfirmedCases = this.getCountryWiseStats(
      totalStateWiseConfirmedCases,
    )
    const countryActiveCases = this.getCountryWiseStats(
      totalStateWiseActiveCases,
    )
    const countryRecoveredCases = this.getCountryWiseStats(
      totalStateWiseRecoveredCases,
    )
    const countryDeceasedCases = this.getCountryWiseStats(
      totalStateWiseDeceasedCases,
    )
    return (
      <div className="covid-select-page">
        <ul className="country-stats-container">
          <li key="countryWideConfirmedCases" testid="countryWideConfirmedCases" className="tab-item">
            <p className="tag confirmed-tag">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668096626/check-mark_1-1_m9ubtj.png"
              className="country-wise-count-image"
              alt="country wide confirmed cases pic"
            />

            <h1 className="count confirmed-tag">{countryConfirmedCases}</h1>
          </li>
          <li key="countryWideActiveCases" testid="countryWideActiveCases" className="tab-item ">
            <p className="tag active-tag">Active</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145091/protection_1_wqj33z.png"
              className="country-wise-count-image"
              alt="country wide active cases pic"
            />

            <h1 className="count active-tag">{countryActiveCases}</h1>
          </li>
          <li key="countryWideRecoveredCases" testid="countryWideRecoveredCases" className="tab-item">
            <p className="tag recovered-tag">Recovered</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145519/recovered_1_nyqaxl.png"
              className="country-wise-count-image"
              alt="country wide recovered cases pic"
            />

            <h1 className="count recovered-tag">{countryRecoveredCases}</h1>
          </li>
          <li key="countryWideDeceasedCases" testid="countryWideDeceasedCases" className="tab-item ">
            <p className="tag deceased-tag">Deceased</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145529/breathing_1_xa6gda.png"
              className="country-wise-count-image"
              alt="country wide deceased cases pic"
            />

            <h1 className="count deceased-tag">{countryDeceasedCases}</h1>
          </li>
        </ul>
      </div>
    )
  }

  renderApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderApiSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLoadingView = () => (
    <div className="loader-spinner" testid="homeRouteLoader">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  renderApiSuccessView = () => {
    const {covidStateWiseData, selected} = this.state

    return (
      <div className="home-content">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <div className="input-container">
            <ReactSelect
              options={formatStateList}
              onChange={this.handleChange}
              selected={selected}
              covidStateWiseData={covidStateWiseData}
            />
          </div>
        </div>

        {this.renderTotalIndiaCovidCases()}
        <CovidStateWiseInformation covidStateWiseData={covidStateWiseData} />
        <Footer />
      </div>
    )
  }

  getStateWiseStats = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok === true) {
      const resultList = []

      const keyNames = Object.keys(data)
      keyNames.splice(33, 1)

      keyNames.forEach(keyName => {
        if (data[keyName]) {
          const {total} = data[keyName]

          const confirmed = total.confirmed ? total.confirmed : 0
          const deceased = total.deceased ? total.deceased : 0
          const recovered = total.recovered ? total.recovered : 0
          const tested = total.tested ? total.tested : 0
          const population = data[keyName].meta.population
            ? data[keyName].meta.population
            : 0

          // const name = statesList.find(state => state.state_code === keyName)

          resultList.push({
            stateCode: keyName,
            name: statesList.find(state => state.state_code === keyName)
              .state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      })
      this.setState({
        apiStatus: apiStatusConstants.success,
        covidStateWiseData: resultList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    return (
      <div className="home-page">
        <Header />
        {this.renderApiViews()}
      </div>
    )
  }
}

export default Home
