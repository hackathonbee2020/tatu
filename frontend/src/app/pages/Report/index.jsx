import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import Axios from '@components/Axios'

import List from './components/List'
import Chart from './components/Chart'
import BoxAgents from './components/BoxAgents'
import BoxChannel from './components/BoxChannel'
import HeaderReport from './components/HeaderReport'

import './styles.scss'

const Report = () => {
  const [top, setTop] = useState([])
  const [status, setStatus] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [conversations, setConversations] = useState([])

  const onSuccessStatus = (data) => {
    setStatus(data)
  }

  const onSuccessTop = (data) => {
    setTop(data)
  }

  const onSuccessDepartamentos = (data) => {
    setDepartamentos(data)
  }

  const onSuccessConversations = (data) => {
    setConversations(data)
  }

  return (
    <Axios run api="report.status" onSuccess={onSuccessStatus}>
      <Axios run api="report.top" onSuccess={onSuccessTop}>
        <Axios
          run
          api="report.departamentos"
          onSuccess={onSuccessDepartamentos}
        >
          <Axios
            run
            api="report.conversations"
            onSuccess={onSuccessConversations}
          >
            <div className="Report">
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <HeaderReport />
                  <Chart conversations={conversations} />
                </Grid>
                <Grid item xs={4}>
                  <BoxChannel status={status} />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <BoxAgents top={top} />
                </Grid>
                <Grid item xs={7}>
                  <List departamentos={departamentos} />
                </Grid>
              </Grid>
            </div>
          </Axios>
        </Axios>
      </Axios>
    </Axios>
  )
}

export default Report
