import React from 'react'

import Input from '@components/Input'
import Translate from '@components/Translate'

import './styles.scss'

const Header = () => {
  const array = [
    { label: 'CHAT_BOX_LIST_FILTER_HEADER_IN_PROGRESS', value: 'IN_PROGRESS' }
  ]

  return (
    <div className="Header">
      <div className="header_title">
        <Translate>CHAT_LIST_HEADER_TITLE</Translate>
      </div>
      <div className="header_select">
        <Input
          translate
          array={array}
          value="IN_PROGRESS"
          nameValue="value"
          nameText="label"
          type="select"
        />
      </div>
    </div>
  )
}

export default Header
