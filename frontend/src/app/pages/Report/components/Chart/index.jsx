import React, { useEffect, useState } from 'react'

import { LineChart } from 'react-chartkick'

import 'chart.js'

import './styles.scss'

const Chart = ({ conversations = [] }) => {
  const [itens, setItens] = useState()

  useEffect(() => {
    const object = {}
    for (const value of conversations) {
      const { day, total } = value || {}
      object[day] = total
    }
    setItens(object)
  }, [conversations])

  return (
    <div className="Chart">
      <div className="chat-header">
        <h4>Fluxo de atendimento do canal</h4>
      </div>
      <div className="chat-main">
        <LineChart download={true} colors={['#8300B9']} data={itens} />
      </div>
    </div>
  )
}

export default Chart
