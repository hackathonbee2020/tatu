import React from 'react'

import CardAgent from './components/CardAgent'

import './styles.scss'

const BoxAgents = ({ top }) => {
  return (
    <div className="BoxAgents">
      <div className="box-agents-header">
        <h4>Top 3 agentes</h4>
      </div>
      <div className="box-agents-main">
        {top.map((item, index) => (
          <CardAgent key={index} item={item} />
        ))}
      </div>
    </div>
  )
}

export default BoxAgents
