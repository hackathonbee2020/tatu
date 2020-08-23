import React from 'react'

import Image from '@components/Image'
import Translate from '@components/Translate'

import avatar1 from '@images/png/avatar1.png'

import './styles.scss'

const CardClient = ({ item = {} }) => {
  const component = () => {
    if (item) {
      return (
        <>
          <div className="cardclient-header">
            <div className="cardclient-avatar">
              <Image src={avatar1} />
            </div>
            <div className="cardclient-description">
              <h4>{item.user_name}</h4>
              <p>{item.user_id}</p>
            </div>
          </div>
          <div className="cardclient-main">
            <div className="cardclient-item">
              <h4>
                <Translate>CHAT_CARDCLIENT_PHONE</Translate>
              </h4>
              <p>{item.user_telefone}</p>
            </div>
            <div className="cardclient-item">
              <h4>
                <Translate>CHAT_CARDCLIENT_CPF</Translate>
              </h4>
              <p>{item.user_cpf}</p>
            </div>
          </div>
        </>
      )
    }
  }

  return <div className="CardClient">{component()}</div>
}

export default CardClient
