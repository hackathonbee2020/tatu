import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import List from './components/List'
import Axios from '@components/Axios'
import CardClient from './components/CardClient'
import HeaderUsers from './components/HeaderUsers'

import './styles.scss'

const Users = () => {
  const [user, setUser] = useState(null)
  const [run, setRun] = useState(1)
  const [data, setData] = useState([])
  const [channels, setChannels] = useState([])

  const updateList = () => {
    setRun(run + 1)
  }

  const onSuccess = (data) => {
    setData(data)
  }

  const onSuccessChannel = (data) => {
    setChannels(data)
  }

  return (
    <Axios run={run} api="users" onSuccess={onSuccess}>
      <Axios run api="channels" onSuccess={onSuccessChannel}>
        <div className="Users">
          <HeaderUsers />
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <List data={data} setUser={setUser} />
            </Grid>
            <Grid item xs={3}>
              <CardClient
                channels={channels}
                updateList={updateList}
                user={user}
              />
            </Grid>
          </Grid>
        </div>
      </Axios>
    </Axios>
  )
}

export default Users
