import React from 'react'

import clsx from 'clsx'

import Image from '@components/Image'
import avatar1 from '@images/png/avatar1.png'

import './styles.scss'

const Message = (props) => {
  const { right } = props

  const styles = clsx('Message', { right })

  return (
    <div className={styles}>
      <div className="avatar">
        <Image src={avatar1} />
      </div>
      <div className="message-main">
        <div className="message-description">
          Amazingg! It’s really cool bro. Can you make in another page too?
        </div>
        <div className="message-time">10:35</div>
      </div>
    </div>
  )
}

export default Message
