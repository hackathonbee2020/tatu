import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import clsx from 'clsx'

import Icon from '@components/Icon'
import Image from '@components/Image'
import Translate from '@components/Translate'

import logo from '@svg/logo.svg'
import UserUtils from '@utils/userUtils'
import avatar2 from '@images/png/avatar2.png'

import routes from '@components/Layout/routers'

import './styles.scss'

const SiderBar = (props) => {
  const history = useHistory()
  const [list, setList] = useState([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const type = UserUtils.getPermission()
    const array = routes.filter((item) => item.permission.includes(type))
    setList(array)
  }, [])

  const goTo = (index) => {
    const { router } = list[index] || {}
    setActive(index)
    history.push(router)
  }

  return (
    <div className="SiderBar">
      <div className="sidebar-header">
        <div className="sidebar-header__logo">
          <Image src={logo} />
        </div>
        <div className="sidebar-header__routes">
          {list.map((item, index) => (
            <span
              key={index}
              onClick={() => goTo(index)}
              className={clsx({ active: index === active })}
            >
              <Icon size={30} name={item.icon} />
            </span>
          ))}
        </div>
      </div>
      <Link to="login">
        <div className="sidebar-footer">
          <div className="user">
            <Image src={avatar2} />
          </div>
          <div className="exit">
            <Translate>SIDERBAR_EXIT</Translate>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SiderBar
