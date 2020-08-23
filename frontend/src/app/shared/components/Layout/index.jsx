import React from 'react'

import SiderBar from './components/SiderBar'

import './styles.scss'

const Layout = (props) => {
  return (
    <div className="Layout">
      <div className="flex">
        <SiderBar {...props} />
        <div className="content">
          <div className="main">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
