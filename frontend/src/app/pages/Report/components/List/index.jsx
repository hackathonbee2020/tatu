import React from 'react'
import Table from '@components/Table'

import Header from './components/Header'

import './styles.scss'

const List = ({ departamentos = [] }) => {
  const headers = [
    {
      name: 'Nome',
      field: 'name'
    },
    {
      name: 'Conversas',
      field: 'conversations_count'
    }
  ]

  return (
    <div className="List">
      <div className="list-header">
        <Header />
      </div>
      <div className="list-main">
        <Table headers={headers} data={departamentos} />
      </div>
    </div>
  )
}

export default List
