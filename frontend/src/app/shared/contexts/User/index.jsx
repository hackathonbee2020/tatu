import React from 'react'
import configs from '@configs'
import { useHistory } from 'react-router-dom'

import routes from '@components/Layout/routers'

const { Provider, Consumer } = React.createContext()

const UserConsumer = (props) => {
  return <Consumer>{props.children}</Consumer>
}

const UserProvider = (props) => {
  const user = () => {
    try {
      let user = sessionStorage.getItem(configs.ObjectSession)
      const token = sessionStorage.getItem(configs.TokenSession)
      if (user) return JSON.parse(user)
      if (!token) return null
      return uptateToken()
    } catch (e) {
      console.error(e)
      return null
    }
  }

  const uptateToken = () => {
    const token = sessionStorage.getItem(configs.TokenSession)
    let object = sessionStorage.getItem(configs.ObjectSession) || {}
    if (!token) return null
    object = JSON.parse(
      Buffer.from(String(token).split('.')[1], 'base64').toString()
    )
    object = { ...user, ...object }
    sessionStorage.setItem(configs.ObjectSession, JSON.stringify(object))
    return object
  }

  const value = { user }
  return <Provider value={value}>{props.children}</Provider>
}

const UserValidate = (props) => {
  const history = useHistory()

  const isLogged = ({ user: token }) => {
    const user = token() || {};
    
    const path = props.location.pathname
    const isPublic = configs.Routes.Publics.indexOf(path) > -1

    const array = routes.filter((item) => item.permission.includes(user.type))
    const item = array.find((item) => item.router.includes(path))

    if (item && user && !isPublic) {
      if (user.type === 'master') {
        window.location.hash = 'clients'
        return null
      }
      if (user.type === 'agente') {
        window.location.hash = '/'
        return null
      }
    } else if (!isPublic) {
      history.push('/login')
    }
    return null
  }

  return <UserConsumer>{isLogged}</UserConsumer>
}

const User = () => {
  return null
}

export { UserProvider, UserConsumer, UserValidate }

export default User
