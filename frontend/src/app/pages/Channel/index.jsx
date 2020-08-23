import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import HeaderChannel from './components/HeaderChannel'

import ListChannel from './components/ListChannel'
import ListDepartment from './components/ListDepartment'

import './styles.scss'

const Channel = () => {
  const [channel, setChannel] = useState(null)
  return (
    <div className="Channel">
      <HeaderChannel />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ListChannel setChannel={setChannel} />
        </Grid>
        <Grid item xs>
          <ListDepartment channel={channel} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Channel
