import React, { useState } from 'react'

import Axios from '@components/Axios'

import List from './components/List'
import HeaderClients from './components/HeaderClients'

import './styles.scss'

const Clients = () => {
  const [run, setRun] = useState(1)
  const [data, setData] = useState([])

  const onSuccess = (data) => {
    setData(data)
  }

  const updateList = () => {
    setRun(run + 1)
  }

  return (
    <Axios run={run} api="clientes" onSuccess={onSuccess}>
      <div className="Clients">
        <HeaderClients />
        <List data={data} updateList={updateList} />
      </div>
    </Axios>
  )
}

export default Clients
