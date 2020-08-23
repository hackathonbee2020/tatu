import React from 'react'

import Icon from '@components/Icon'
import Button from '@components/Button'

import './styles.scss'

const HeaderReport = () => {
  return (
    <div className="HeaderReport">
      <div className="header-title">
        <h2>Relatórios</h2>
      </div>
      <div className="header-actions">
        <Button basic icon={() => <Icon name="repeat" />}>Mossoró - RN</Button>
      </div>
    </div>
  )
}

export default HeaderReport
