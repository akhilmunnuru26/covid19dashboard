import {Component} from 'react'
import {Link} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import CovidStateWiseDataTable from '../CovidStateWiseDataTable'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    apiStatus: apiStatusConstants.progress,
    covidStateWiseData: '',
  }

  componentDidMount() {
    this.getStateWiseStats()
  }

  getFilteredList = () => {}

  handleChange = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  getFilteredData = () => {
    const {covidStateWiseData, searchInput} = this.state
    let filteredList = []
    if (searchInput !== '') {
      filteredList = covidStateWiseData.filter(
        state =>
          state.name.toLowerCase().startsWith(searchInput.toLowerCase()) ||
          state.stateCode.toLowerCase().startsWith(searchInput.toLowerCase()),
      )
    }
    return filteredList
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

    const {confirmed, active, recovered, deceased} = covidStateWiseData[0]

    /* const totalStateWiseConfirmedCases = covidStateWiseData[0].map(state =>
      parseInt(state.confirmed),
    )
    const totalStateWiseActiveCases = covidStateWiseData[].map(state =>
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
    ) */
    return (
      <div className="covid-select-page">
        <ul className="country-stats-container">
          <li
            testid="countryWideConfirmedCases"
            key="countryWideConfirmedCases"
            className="tab-item-confirmed"
          >
            <p className="tag confirmed-tag">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668096626/check-mark_1-1_m9ubtj.png"
              className="country-wise-count-image"
              alt="country wide confirmed cases pic"
            />

            <h1 className="count confirmed-tag">{confirmed}</h1>
          </li>
          <li
            testid="countryWideActiveCases"
            key="countryWideActiveCases"
            className="tab-item-active"
          >
            <p className="tag active-tag">Active</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145091/protection_1_wqj33z.png"
              className="country-wise-count-image"
              alt="country wide active cases pic"
            />

            <h1 className="count active-tag">{active}</h1>
          </li>
          <li
            testid="countryWideRecoveredCases"
            key="countryWideRecoveredCases"
            className="tab-item-recovered"
          >
            <p className="tag recovered-tag">Recovered</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145519/recovered_1_nyqaxl.png"
              className="country-wise-count-image"
              alt="country wide recovered cases pic"
            />

            <h1 className="count recovered-tag">{recovered}</h1>
          </li>
          <li
            testid="countryWideDeceasedCases"
            key="countryWideDeceasedCases"
            className="tab-item-deceased"
          >
            <p className="tag deceased-tag">Deceased</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145529/breathing_1_xa6gda.png"
              className="country-wise-count-image"
              alt="country wide deceased cases pic"
            />

            <h1 className="count deceased-tag">{deceased}</h1>
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
    const {searchInput, covidStateWiseData} = this.state
    const filteredList = this.getFilteredData()

    return (
      <div className="home-content">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <div className="input-container">
            <input
              placeholder="Enter the State"
              className="input-element"
              value={searchInput}
              type="search"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          {filteredList.length > 0 ? (
            <ul
              testid="searchResultsUnorderedList"
              className="filterlist-container"
            >
              {filteredList.map(option => (
                <li className="option" key={option.stateCode}>
                  <Link
                    className="option-item"
                    to={`/state/${option.stateCode}`}
                  >
                    <p className="option-name">{option.name}</p>

                    <div className="state-code-container">
                      <p className="option-state-code">{option.stateCode}</p>
                      <BiChevronRightSquare className="right-arrow" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="covid-select-card">
          {this.renderTotalIndiaCovidCases()}
        </div>
        <div>
          <CovidStateWiseDataTable covidStateWiseData={covidStateWiseData} />
        </div>

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
        searchInput: '',
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        searchInput: '',
      })
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
