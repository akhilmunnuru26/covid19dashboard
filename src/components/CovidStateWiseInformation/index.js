import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

class CovidStateWiseDataTable extends Component {
  state = {covidStatesData: []}

  componentDidMount() {
    const {covidStateWiseData} = this.props
    this.setState({covidStatesData: covidStateWiseData})
  }

  ascendingSort = () => {
    const {covidStateWiseData} = this.props
    const ascendingSorting = [...covidStateWiseData].sort()
    this.setState({covidStatesData: ascendingSorting})
    // console.log(ascendingSorting)
  }

  descendingSort = () => {
    const {covidStateWiseData} = this.props
    const descendingSorting = [...covidStateWiseData].reverse()
    this.setState({covidStatesData: descendingSorting})
  }

  render() {
    const {covidStatesData} = this.state

    return (
      <div className="table-content">
        <table testid="stateWiseCovidDataTable" className="info-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header state-details">
                <p className="table-headers-title-state">State/UT</p>
                <div className="sorting-buttons-container">
                  <button
                    onClick={this.ascendingSort}
                    className="sorting-buttons"
                    type="button"
                    testid="ascendingSort"
                  >
                    <FcGenericSortingAsc className="sort-icon" />
                  </button>
                  <button
                    testid="descendingSort"
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
            {covidStatesData.map(state => {
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
}

export default CovidStateWiseDataTable
