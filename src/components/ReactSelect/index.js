import React from 'react'
import Select from 'react-select'
import './index.css'

const colourStyles = {
  control: base => ({
    ...base,
    background: '#2F2F43',
    border: 'none',
    borderOutline: 'none',
    fontSize: '14px',
    color: '#ffffff',
  }),
  dropdownIndicator: base => ({
    ...base,
  }),
  singleValue: base => ({
    ...base,
    color: '#ffffff',
  }),
  option: (base, state) => ({
    ...base,

    background: state.isFocused ? '#202841' : '#161625',
    color: state.isFocused ? '#0967D2' : '#94A3B8',
    padding: '10px',
  }),

  input: base => ({
    ...base,
    color: '#ffffff',
  }),
}

class ReactSelect extends React.Component {
  render() {
    const {selected, onChange, options, placeholder} = this.props
    return (
      <Select
        value={selected}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        className="select"
        theme={theme => ({
          ...theme,
          borderRadius: 0,

          colors: {
            ...theme.colors,
            primary25: '#0967D2',
            primary: 'dangerLight',
          },
        })}
        borderColor="1px solid #0967D2"
        styles={colourStyles}
        clearIndicator
      />
    )
  }
}

export default ReactSelect
