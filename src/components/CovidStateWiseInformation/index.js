import {Link} from 'react-router-dom'

import './index.css'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

const CovidStateWiseInformation = props => {
  const {covidStateWiseData} = props

  const ascendingSort = () => covidStateWiseData.sort()

  const descendingSort = () => covidStateWiseData.reverse()

  return (
    <div className="table-content">
      <table testid="stateWiseCovidDataTable" className="info-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header state-details">
              <p className="table-headers-title">State/UT</p>
              <div className="sorting-buttons-container">
                <button
                  onClick={ascendingSort}
                  testid="ascendingSort"
                  className="sorting-buttons"
                  type="button"
                >
                  <FcGenericSortingAsc className="sort-icon" />
                </button>
                <button
                  onClick={descendingSort}
                  testid="descendingSort"
                  className="sorting-buttons"
                  type="button"
                >
                  <FcGenericSortingDesc className="sort-icon" />
                </button>
              </div>
            </th>
            <th className="table-header table-headers-title">Confirmed</th>
            <th className="table-header table-headers-title">Active</th>
            <th className="table-header table-headers-title">Recovered</th>
            <th className="table-header table-headers-title">Deceased</th>
            <th className="table-header table-headers-title">Population</th>
          </tr>
        </thead>
        <tbody>
          {covidStateWiseData.map(state => {
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
                  <Link className="links" to={`/state/${stateCode}`}>
                    {name}
                  </Link>
                </td>
                <td className="state-confirmed-count data">{confirmed}</td>
                <td className="state-active-count data">{active}</td>
                <td className="state-recovered-count data">{recovered}</td>
                <td className="state-deceased-count data">{deceased}</td>
                <td className="state-population-count data">{population}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CovidStateWiseInformation
