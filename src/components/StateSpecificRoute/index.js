import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CovidSelect from '../CovidSelect'
import Footer from '../Footer'

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
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class StateSpecificRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    specificStateData: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStateInformation()
  }

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

    const {
      lastUpdated,
      name,
      tested,
      confirmed,
      active,
      recovered,
      deceased,
      stateCode,
    } = specificStateData
    const {districtsDataList} = specificStateData

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
            <h1 className="tested-count">{tested}</h1>
          </div>
        </div>
        <div className="state-total-stats">
          <CovidSelect
            confirmedCases={confirmed}
            activeCases={active}
            recoveredCases={recovered}
            deceasedCases={deceased}
            districtsDataList={districtsDataList}
            stateCode={stateCode}
          />
        </div>
      </div>
    )
  }

  getApiLoadingView = () => (
    <div testid="stateDetailsLoader" className="loader-spinner">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  getApiFailureView = () => <h1>Oops!</h1>

  getStateInformation = async () => {
    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    // console.log(stateCode)
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data/`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const resultList = []
      const districtsDataList = []

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
              districtActive:
                districtConfirmed - (districtDeceased + districtRecovered),
            })
          }
          return districtsDataList.reverse()
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
      // console.log(currentStateInfo)
      this.setState({
        apiStatus: apiStatusConstants.success,
        specificStateData: currentStateInfo,
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
      </div>
    )
  }
}

export default StateSpecificRoute
