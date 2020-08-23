import React from 'react'

import Input from '@components/Input'
import SearchIcon from '@material-ui/icons/Search'

import './styles.scss'

const Filter = () => {
  return (
    <div className="Filter">
      <Input
        placeholder="CHAT_LIST_FILTER_INPUT_PLACEHOLDER"
        startAdornment={<SearchIcon />}
      />
    </div>
  )
}

export default Filter
