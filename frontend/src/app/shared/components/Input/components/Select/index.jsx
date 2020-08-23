import React from 'react'

import clsx from 'clsx'
import Translate from '@components/Translate'
import * as Material from '@material-ui/core'
import { FormHelperText } from '@material-ui/core'
import { MenuItem, InputLabel, FormControl } from '@material-ui/core'

import './styles.scss'

const Select = props => {
  const handleChange = (e, { props: { value } }) => {
    const { array = [], nameValue, name } = props
    const event = {
      target: {
        name,
        value: value,
        item: array.find(item => item[nameValue] === value)
      }
    }
    props.handleChange(event)
  }

  let {
    label,
    error,
    value,
    translate,
    nameValue,
    nameText = nameValue,
    array = [],
    inputProps,
    helperText
  } = props || {}

  const classNames = clsx('Select', { error })

  return (
    <FormControl className={classNames}>
      <InputLabel>{label}</InputLabel>
      <Material.Select
        value={value}
        onChange={handleChange}
        inputProps={inputProps}
        {...props}
      >
        {array.map((item, index) => (
          <MenuItem key={index} value={item[nameValue]}>
            {translate ? (
              <Translate>{item[nameText]}</Translate>
            ) : (
              item[nameText]
            )}
          </MenuItem>
        ))}
      </Material.Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

Select.defaultProps = {
  value: '',
  array: []
}

export default Select
