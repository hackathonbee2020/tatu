import React from 'react'

import clsx from 'clsx'
import moment from 'moment'

import Tag from '@components/Tag'
import Image from '@components/Image'

import avatar1 from '@images/png/avatar1.png'

import './styles.scss'

const CardUser = (props) => {
  const { active, item, setItem } = props

  const styles = clsx('CardUser', { active })

  return (
    <div onClick={() => setItem(item)} className={styles}>
      <div className="image_carduser">
        <Image src={avatar1} />
      </div>
      <div className="carduser_content">
        <div className="carduser_header">
          <p className="user">{item.user_name}</p>
          <p>{moment(item.updated_at).calendar()}</p>
        </div>
        <div className="carduser_main">
          <p>{item.recent_message}</p>
        </div>
        <div className="carduser_footer">
          <Tag>{item?.department?.name}</Tag>
          <Tag>{item?.channel?.name}</Tag>
        </div>
      </div>
    </div>
  )
}

export default CardUser
