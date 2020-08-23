import React from 'react'

import * as Material from '@material-ui/lab'
import TextField from '@material-ui/core/TextField'

import Utils from '@utils'

import './styles.scss'

const Autocomplete = (props = {}) => {
  const {
    value = '',
    name,
    label,
    variant,
    nameText,
    array = [],
    nameValue = '',
    handleChange,
    disabled
  } = props

  const onChange = (event, item) => {
    event.target = {
      ...event.target,
      name,
      item,
      value: Utils.getValue(item, nameValue)
    }
    handleChange(event)
  }

  const getOptionLabel = (option) => {
    if (typeof option === 'string') {
      return option
    }
    if (option.inputValue) {
      return option.inputValue
    }
    return option[nameText]
  }

  const text = array.find(item => item[nameValue] === value);

  return (
    <Material.Autocomplete
      value={text}
      options={array}
      onChange={onChange}
      disabled={disabled}
      className="Autocomplete"
      getOptionLabel={getOptionLabel}
      renderOption={(option) => option[nameText]}
      renderInput={(params) => <TextField {...params} variant={variant} label={label} />}
    />
  )
}

Autocomplete.defaultProps = {
  value: '',
  array: [],
  nameValue: ''
}

export default Autocomplete
