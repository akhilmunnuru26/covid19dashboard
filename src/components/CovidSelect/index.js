import {Component} from 'react'
import CovidBargraphs from '../CovidBargraphs'

import './index.css'

const statsStatus = {
  initial: 'INITIAL',
  active: 'ACTIVE',
  confirmed: 'CONFIRMED',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class CovidSelect extends Component {
  state = {status: statsStatus.initial, topDistrictsCases: []}

  changeConfirmBgColor = () => {
    const {districtsDataList} = this.props
    // console.log(districtsDataList)
    const topResultList = []

    districtsDataList.forEach(item => {
      const cases = item.districtConfirmed ? item.districtConfirmed : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    this.setState({
      status: statsStatus.confirmed,
      topDistrictsCases: topResultList,
    })
  }

  changeActiveBgColor = () => {
    const {districtsDataList} = this.props
    const topResultList = []
    districtsDataList.forEach(item => {
      const cases = item.districtActive ? item.districtActive : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    this.setState({
      status: statsStatus.active,
      topDistrictsCases: topResultList,
    })
  }

  changeRecoveredBgColor = () => {
    const {districtsDataList} = this.props
    const topResultList = []

    districtsDataList.forEach(item => {
      const cases = item.districtRecovered ? item.districtRecovered : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    this.setState({
      status: statsStatus.recovered,
      topDistrictsCases: topResultList,
    })
  }

  changeDeceasedBgColor = () => {
    const {districtsDataList} = this.props
    const topResultList = []

    districtsDataList.forEach(item => {
      const cases = item.districtDeceased ? item.districtDeceased : 0

      return topResultList.push({
        name: item.districtName,
        cases,
      })
    })

    this.setState({
      status: statsStatus.deceased,
      topDistrictsCases: topResultList,
    })
  }

  renderTopDistricts = () => {
    const {topDistrictsCases} = this.state
    topDistrictsCases.reverse()
    return (
      <ul
        testid="topDistrictsUnorderedList"
        className="top-districts-container"
      >
        {topDistrictsCases.map(item => {
          const {name, cases} = item
          return (
            <li className="top-district-item" key={name}>
              <p className="top-district-cases">{cases}</p>
              <p className="top-district-name">{name}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {status} = this.state
    const {stateCode} = this.props
    // console.log(topDistrictsCases)
    const highlightConfirmCases =
      status === statsStatus.confirmed ? 'confirmed-cases' : ''
    const highlightActiveCases =
      status === statsStatus.active ? 'active-cases' : ''
    const highlightRecoveredCases =
      status === statsStatus.recovered ? 'recovered-cases' : ''
    const highlightDeceasedCases =
      status === statsStatus.deceased ? 'deceased-cases' : ''

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

    const {
      confirmedCases,
      activeCases,
      recoveredCases,
      deceasedCases,
    } = this.props
    return (
      <div className="covid-select-page">
        <ul className="country-stats-container">
          <li
            onClick={this.changeConfirmBgColor}
            className={`tab-item ${highlightConfirmCases}`}
            testid="stateSpecificConfirmedCasesContainer"
          >
            <h1 className="tag confirmed-tag">Confirmed</h1>
            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668096626/check-mark_1-1_m9ubtj.png"
              className="country-wise-count-image"
              alt="state specific confirmed cases pic"
            />

            <h1 className="count confirmed-tag">{confirmedCases}</h1>
          </li>
          <li
            testid="stateSpecificActiveCasesContainer"
            onClick={this.changeActiveBgColor}
            className={`tab-item ${highlightActiveCases}`}
          >
            <p className="tag active-tag">Active</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145091/protection_1_wqj33z.png"
              className="country-wise-count-image"
              alt="state specific active cases pic"
            />

            <h1 className="count active-tag">{activeCases}</h1>
          </li>
          <li
            testid="stateSpecificRecoveredCasesContainer"
            onClick={this.changeRecoveredBgColor}
            className={`tab-item ${highlightRecoveredCases}`}
          >
            <p className="tag recovered-tag">Recovered</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145519/recovered_1_nyqaxl.png"
              className="country-wise-count-image"
              alt="state specific recovered cases pic"
            />

            <h1 className="count recovered-tag">{recoveredCases}</h1>
          </li>
          <li
            testid="stateSpecificDeceasedCasesContainer"
            onClick={this.changeDeceasedBgColor}
            className={`tab-item ${highlightDeceasedCases}`}
          >
            <p className="tag deceased-tag">Deceased</p>

            <img
              src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668145529/breathing_1_xa6gda.png"
              className="country-wise-count-image"
              alt="state specific deceased cases pic"
            />

            <h1 className="count deceased-tag">{deceasedCases}</h1>
          </li>
        </ul>
        <h1 className={`heading-tag ${changeTextColor}`}>Top Districts</h1>
        {this.renderTopDistricts()}
        {<CovidBargraphs stateCode={stateCode} status={status} />}
      </div>
    )
  }
}

export default CovidSelect
