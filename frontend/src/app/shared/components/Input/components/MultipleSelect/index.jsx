import React from 'react'

import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'

export default function MultipleSelect(props) {
  const {
    value = [],
    array = [],
    nameValue,
    nameText = nameValue,
    label,
    name
  } = props

  const handleChange = ({ target: { value } }) => {
    console.log(value)
    const event = {
      target: {
        name,
        value
      }
    }
    props.handleChange(event)
  }

  const getRenderValue = select => {
    const itens = []
    for (const id of select) {
      const item = array.find(item => item[nameValue] === id)
      if (item) {
        itens.push(item)
      }
    }
    return itens.map(item => item[nameText]).join(', ')
  }

  return (
    <div>
      <FormControl variant="outlined">
        <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
        <Select
          multiple
          onChange={handleChange}
          id="demo-mutiple-checkbox"
          renderValue={getRenderValue}
          labelId="demo-mutiple-checkbox-label"
          value={Array.isArray(value) ? value : []}
          input={<OutlinedInput label={label} />}
        >
          {array.map((item, index) => (
            <MenuItem key={index} value={item[nameValue]}>
              <Checkbox
                checked={
                  Array.isArray(value)
                    ? value.indexOf(item[nameValue]) !== -1
                    : null
                }
              />
              <ListItemText primary={item[nameText]} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
