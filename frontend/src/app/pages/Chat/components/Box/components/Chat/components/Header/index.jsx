import React from 'react'

import Icon from '@components/Icon'
import Image from '@components/Image'
import Button from '@components/Button'
import avatar1 from '@images/png/avatar1.png'

import './styles.scss'

const Header = ({ item = {}, onInit, onFinish, onTransf }) => {
  return (
    <div className="Header">
      <div className="header-avatar">
        <Image src={avatar1} />
        <p>{item?.user_name}</p>
      </div>
      <div className="header-actions">
        {item && (
          <Button onClick={onTransf} basic icon={() => <Icon name="repeat" />}>
            Transferir
          </Button>
        )}
        {item?.status === '02' && (
          <Button
            onClick={onFinish}
            background="#e74c3c"
            icon={() => <Icon name="trash" />}
          >
            Finalizar
          </Button>
        )}
        {item?.status === '01' && (
          <Button onClick={onInit} icon={() => <Icon name="sent" />}>
            Iniciar
          </Button>
        )}
      </div>
    </div>
  )
}

export default Header
