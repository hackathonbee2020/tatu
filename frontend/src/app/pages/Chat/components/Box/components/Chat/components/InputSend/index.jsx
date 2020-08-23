import React from 'react'

import Input from '@components/Input'
import Translate from '@components/Translate'

import './styles.scss'

const InputSend = (props) => {
  return (
    <div className="InputSend">
      <div className="input-content">
        <Input placeholder="CHAT_INPUT_SEND_TYPING" />
      </div>
      <div className="input-send">
        <button>
          <Translate>CHAT_INPUT_SEND_SEND</Translate>
        </button>
      </div>
    </div>
  )
}

export default InputSend
