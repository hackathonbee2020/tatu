import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Utils from '@utils'
import configs from '@configs'
import Toast from '@utils/toast.utils'
import { LoadConsumer } from '@contexts/Load'

const Axios = props => {
  const initialize = async () => {
    if (props.run) await submit({})
  }

  useEffect(() => {
    initialize() // eslint-disable-next-line
  }, [props.run])

  const [response, setResponse] = useState({})

  let setLoad = () => true

  const activeLoad = inLoad => {
    const { load = true } = props
    if (typeof inLoad === 'function' && load) {
      setLoad = inLoad
    }
  }

  const showLoad = show => {
    if (typeof setLoad === 'function') {
      setLoad(show)
    }
  }

  const error = error => {
    const message = Utils.getValue(error, 'response.data.error')
    props.onError(error)
    // if (message) {
    //   Toast.sendMessage('error', message, false)
    // } else {
    //   Toast.sendMessage('error', 'AXIOS_ERRO', 10000)
    // }
    if (message === 'TOKEN_EXPIRED') {
      window.location.hash = '/login'
    }
  }

  const success = success => {
    const { onSuccess } = props
    const data = Utils.getValue(success, 'data')
    onSuccess(data)
    setResponse(data)
    showLoad(false)
    if (data.message) {
      Toast.sendMessage('success', data.message)
    }
  }

  const submit = async data => {
    const { params, formData } = data || {}
    const { messageLoad } = props
    if (params) props = { ...props, params }
    if (formData) props = { ...props, formData }
    showLoad(typeof messageLoad === 'string' ? messageLoad : true)
    try {
      const object = (await http({ ...props })) || {}
      success(object)
    } catch (err) {
      showLoad(false)
      error(err)
    }
  }

  const { children } = props
  return (
    <LoadConsumer>
      {({ setLoad: load }) => {
        activeLoad(load)
        if (typeof children === 'function') {
          return children({
            submit,
            response
          })
        } else {
          return children
        }
      }}
    </LoadConsumer>
  )
}

Axios.defaultProps = {
  onError: () => true,
  onSuccess: () => true
}

const http = async ({
  api,
  params,
  formData,
  others,
  headers,
  method = 'get',
  ...props
}) => {
  const { endpoints } = configs.api
  let { url } = Utils.getValue(endpoints, api)
  const urlBase = process.env.REACT_APP_API_URL
  url = `${urlBase}${Utils.getParams(url, others)}`
  const token = sessionStorage.getItem(configs.TokenSession)
  headers = { ...headers, Authorization: `Bearer ${token}` }

  return await axios({
    url,
    method,
    headers,
    data: formData ?? { ...params },
    ...props
  })
}

const getApi = api => {
  const { endpoints } = configs.api
  const { url } = endpoints[api]
  const urlBase = process.env.REACT_APP_API_URL
  return `${urlBase}${url}`
}

export { getApi, http }
export default Axios
