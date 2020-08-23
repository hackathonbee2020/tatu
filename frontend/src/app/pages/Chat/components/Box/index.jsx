import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import Axios from '@components/Axios'
import List from './components/List'
import Chat from './components/Chat'
import UserUtils from '@utils/userUtils'

import './styles.scss'

const Box = ({ item, setItem }) => {
  const [run, setRun] = useState(1)
  const [data, setData] = useState([])
  const [agents, setAgentes] = useState([])
  const [departments, setDepartments] = useState([])

  const user = UserUtils.getUser() || {}

  const updateList = () => {
    setRun(run + 1)
  }

  const onSuccess = (data) => {
    setData(data)
  }

  const onSuccessAgentes = (data) => {
    setAgentes(data)
  }

  const onSuccessDepartments = (data) => {
    setDepartments(data)
  }

  const channel_id = item?.channel_id
  const cliente_id = user?.cliente_id

  return (
    <div className="Box">
      <Axios run={run} api="conversations" onSuccess={onSuccess} load={false}>
        <Axios
          run={channel_id}
          api="agentes"
          others={{
            cliente_id,
            channel_id
          }}
          onSuccess={onSuccessAgentes}
        >
          <Axios
            api="departments"
            run={channel_id}
            onSuccess={onSuccessDepartments}
            others={{
              channel_id,
              cliente_id
            }}
          >
            <Grid container>
              <Grid className="pd-0" item xs>
                <List
                  object={item}
                  setItem={setItem}
                  data={data}
                  updateList={updateList}
                />
              </Grid>
              <Grid className="pd-0" item xs={7}>
                <Chat
                  item={item}
                  agents={agents}
                  updateList={updateList}
                  departments={departments}
                />
              </Grid>
            </Grid>
          </Axios>
        </Axios>
      </Axios>
    </div>
  )
}

export default Box
