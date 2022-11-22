import {Component} from 'react'
import {Link} from 'react-router-dom'

import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

// import CovidStateWiseDataTable from '../CovidStateWiseDataTable'

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
    sortingData: '',
  }

  componentDidMount() {
    this.getStateWiseStats()
  }

  ascendingSort = () => {
    const {covidStateWiseData} = this.state
    const ascendingData = [...covidStateWiseData].sort()
    this.setState({sortingData: ascendingData})
  }

  descendingSort = () => {
    const {covidStateWiseData} = this.state
    const descendingSorting = [...covidStateWiseData].reverse()
    this.setState({sortingData: descendingSorting})
  }

  renderCovidStateWiseDataTable = () => {
    const {sortingData} = this.state

    return (
      <div /* testid="stateWiseCovidDataTable" */ className="table-content">
        <table className="info-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header state-details">
                <p className="table-headers-title-state">States/UT</p>
                <div className="sorting-buttons-container">
                  <button
                    onClick={this.ascendingSort}
                    className="sorting-buttons"
                    type="button"
                    //  testid="ascendingSort"
                  >
                    <FcGenericSortingAsc className="sort-icon" />
                  </button>
                  <button
                    //  testid="descendingSort"
                    onClick={this.descendingSort}
                    className="sorting-buttons"
                    type="button"
                  >
                    <FcGenericSortingDesc className="sort-icon" />
                  </button>
                </div>
              </th>
              <th>
                <p className="table-header table-headers-title-confirmed">
                  Confirmed
                </p>
              </th>
              <th>
                <p className="table-header table-headers-title-active">
                  Active
                </p>
              </th>
              <th>
                <p className="table-header table-headers-title-recovered">
                  Recovered
                </p>
              </th>
              <th>
                <p className="table-header table-headers-title-deceased">
                  Deceased
                </p>
              </th>
              <th>
                <p className="table-header table-headers-title-population">
                  Population
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortingData.map(state => {
              const {
                stateCode,
                name,
                confirmed,
                active,
                recovered,
                deceased,
                population,
              } = state
              return (
                <tr className="state-table-row" key={stateCode}>
                  <td className="state-name data">
                    <ul className="states-count-list-container">
                      <li className="states-count-list-item">
                        <Link className="links" to={`/state/${stateCode}`}>
                          {name}
                        </Link>
                      </li>
                    </ul>
                  </td>
                  <td className="">
                    <ul className="states-count-list-container">
                      <li className="states-count-list-item state-confirmed-count data">
                        {confirmed}
                      </li>
                    </ul>
                  </td>
                  <td className="">
                    <ul className="states-count-list-container">
                      <li className="states-count-list-item state-active-count data">
                        {active}
                      </li>
                    </ul>
                  </td>
                  <td className="">
                    <ul className="states-count-list-container">
                      <li className="states-count-list-item state-recovered-count data">
                        {recovered}
                      </li>
                    </ul>
                  </td>
                  <td className="">
                    <ul className="states-count-list-container">
                      <li className="states-count-list-item state-deceased-count data">
                        {deceased}
                      </li>
                    </ul>
                  </td>
                  <td className="">
                    <ul className="states-count-list-container">
                      <li className="states-count-list-item state-population-count data">
                        {population}
                      </li>
                    </ul>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  handleChange = event => {
    if (event.target.value !== ' ') {
      this.setState({
        searchInput: event.target.value,
      })
    }
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

    // const {confirmed} = covidStateWiseData[0]

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
          <li
            // testid="countryWideConfirmedCases"
            key="countryWideConfirmedCases"
            className="tab-item-confirmed"
          >
            <p className="tag confirmed-tag">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668096626/check-mark_1-1_m9ubtj.png"
              className="country-wise-count-image"
              alt="country wide confirmed cases pic"
            />

            <p className="count confirmed-tag">{countryConfirmedCases}</p>
          </li>
          <li
            //  testid="countryWideActiveCases"
            key="countryWideActiveCases"
            className="tab-item-active"
          >
            <p className="tag active-tag">Active</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145091/protection_1_wqj33z.png"
              className="country-wise-count-image"
              alt="country wide active cases pic"
            />

            <p className="count active-tag">{countryActiveCases}</p>
          </li>
          <li
            //  testid="countryWideRecoveredCases"
            key="countryWideRecoveredCases"
            className="tab-item-recovered"
          >
            <p className="tag recovered-tag">Recovered</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145519/recovered_1_nyqaxl.png"
              className="country-wise-count-image"
              alt="country wide recovered cases pic"
            />

            <p className="count recovered-tag">{countryRecoveredCases}</p>
          </li>
          <li
            //  testid="countryWideDeceasedCases"
            key="countryWideDeceasedCases"
            className="tab-item-deceased"
          >
            <p className="tag deceased-tag">Deceased</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145529/breathing_1_xa6gda.png"
              className="country-wise-count-image"
              alt="country wide deceased cases pic"
            />

            <p className="count deceased-tag">{countryDeceasedCases}</p>
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
    <div /* testid="homeRouteLoader" */ className="loader-spinner">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  renderApiSuccessView = () => {
    const {searchInput} = this.state
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
          {searchInput !== '' && filteredList.length > 0 ? (
            <ul
              //  testid="searchResultsUnorderedList"
              className="filterlist-container"
            >
              {filteredList.map(option => (
                <Link className="option" to={`/state/${option.stateCode}`}>
                  <li className="option-item" key={option.stateCode}>
                    <p className="option-name">{option.name}</p>

                    <div className="state-code-container">
                      <p className="option-state-code">{option.stateCode}</p>
                      <BiChevronRightSquare className="right-arrow" />
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          {this.renderTotalIndiaCovidCases()}
          {this.renderCovidStateWiseDataTable()}
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
        sortingData: resultList,
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
