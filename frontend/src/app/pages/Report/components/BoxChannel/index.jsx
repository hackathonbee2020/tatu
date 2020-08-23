import React from 'react'
import Grid from '@material-ui/core/Grid'

import CardChannel from './components/CardChannel'

import './styles.scss'

const BoxChannel = ({ status = {} }) => {
  const { conversations = [] } = status

  const one = conversations.find((item) => item.status === '01') || {}
  const two = conversations.find((item) => item.status === '02') || {}
  const three = conversations.find((item) => item.status === '03') || {}

  const array = [
    {
      icon: 'dot',
      title: 'Esperando',
      content: () => <div className="number">{one.quantidade}</div>
    },
    {
      icon: 'comment',
      title: 'Em atendimento',
      content: () => <div className="number">{two.quantidade}</div>
    },
    {
      icon: 'task',
      title: 'Finalizados',
      content: () => <div className="number">{three.quantidade || 0}</div>
    },
    {
      icon: 'clock',
      title: 'Agentes',
      content: () => <div className="number">{status.agentes}</div>
    }
  ]

  return (
    <div className="BoxChannel">
      <div className="box-channel-header">
        <h4>Dados do canal</h4>
      </div>
      <div className="box-channel-main">
        <Grid container spacing={3}>
          {array.map((item, index) => (
            <Grid key={index} item xs={6}>
              <CardChannel item={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default BoxChannel
