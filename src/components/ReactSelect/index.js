import {Component} from 'react'
import {Link} from 'react-router-dom'
import Select from 'react-select'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

/* const colourStyles = {
  control: base => ({
    ...base,
    background: '#2F2F43',
    border: 'none',
    borderOutline: 'none',
  }),
  dropdownIndicator: base => ({
    ...base,
    color: 'transparent',
  }),

  option: base => ({
    ...base,
    background: '#161625',
  }),

  singleValue: base => ({
    ...base,
    color: 'transparent',
  }),
  input: base => ({
    ...base,
    color: '#64748B',
  }),
}
*/

class ReactSelect extends Component {
  render() {
    const {selected, onChange, covidStateWiseData} = this.props
    const options = covidStateWiseData.map(item => ({
      label: (
        <ul testid="searchResultsUnorderedList" className="labels-container">
          <li className="label">
            <Link className="link-item" to={`/state/${item.stateCode}`}>
              <p className="label-name">{item.name}</p>
              <button type="button" className="state-code-container">
                <p className="label-state-code">{item.stateCode}</p>
                <BiChevronRightSquare className="right-arrow" />
              </button>
            </Link>
          </li>
        </ul>
      ),
      value: item.stateCode,
      stateCode: item.stateCode,
    }))

    return (
      <Select
        className="select-element select-bg"
        value={selected}
        // styles={colourStyles}
        onChange={onChange}
        options={options}
        // styles={colorStyles}
        placeholder="Enter the State"
        classNamePrefix="select-bg"
        // components={{Menu, Option}}
      />
    )
  }
}

export default ReactSelect
