import React from 'react'

import { FormHelperText } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Visibility from '@material-ui/icons/Visibility'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import './styles.scss'

const DatePicker = (props) => {
  const { label, value, helperText } = props

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  })

  const handleChange = ({ target: { value } }) => {
    const { name } = props
    const event = {
      target: {
        name,
        value
      }
    }
    props.handleChange(event)
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <FormControl className="Password" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...props}
        value={value}
        label={label}
        onChange={handleChange}
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

DatePicker.defaultProps = {
  error: null,
  helperText: null
}

export default DatePicker
