import React from 'react'
import Grid from '@material-ui/core/Grid'

import Input from '@components/Input'
import Filter from '@components/Filter'

import './styles.scss'

const Header = () => {
  const array = [{ label: 'Todos', value: 'ALL' }]
  const filter = [
    { label: 'Últimos 30 dias', value: 'ALL_30' },
    { label: 'Últimos semana', value: 'ALL_7' },
    { label: 'Últimos dia', value: 'ALL_1' }
  ]
  return (
    <div className="Header">
      <Grid container spacing={3}>
        <Grid item className="header_select">
          <Filter />
        </Grid>
        <Grid item xs className="header_select">
          <Input
            translate
            array={array}
            value="ALL"
            nameValue="value"
            nameText="label"
            type="select"
            label="Selecionar"
          />
        </Grid>
        <Grid item xs className="header_select">
          <Input
            translate
            array={filter}
            value="ALL_30"
            nameValue="value"
            nameText="label"
            type="select"
            label="Filtrar por"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
