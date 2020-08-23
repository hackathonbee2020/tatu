import React from 'react'
import Grid from '@material-ui/core/Grid'

import Filter from '@components/Filter'
import Button from '@components/Button'
import Icon from '@components/Icon'

import './styles.scss'

const Header = ({ onClick }) => {
  return (
    <div className="Header">
      <Grid container>
        <Grid item xs className="header_select">
          <Filter />
        </Grid>
        <Grid item className="header_select">
          <Button onClick={onClick} icon={() => <Icon name="plus" />}>
            Novo Canal
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
