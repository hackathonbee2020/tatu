import React from 'react'
import Grid from '@material-ui/core/Grid'

import Icon from '@components/Icon'
import Filter from '@components/Filter'
import Button from '@components/Button'

import './styles.scss'

const Header = ({ onClick }) => {
  return (
    <div className="Header">
      <Grid container spacing={3}>
        <Grid item xs className="header_select">
          <Filter />
        </Grid>
        <Grid item className="header_select">
          <Button onClick={onClick} icon={() => <Icon name="plus" />}>
            Novo Cliente
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
