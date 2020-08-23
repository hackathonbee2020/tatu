import React, { useState, useRef } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'

import Icon from '@components/Icon'
import Table from '@components/Table'
import Button from '@components/Button'
import Modal from '@components/Modal'
import Input from '@components/Input'
import UserUtils from '@utils/userUtils'

import Header from './components/Header'

import './styles.scss'

const List = (props) => {
  const text = useRef(null)

  const [open, setOpen] = useState(false)

  const { setUser, data = [] } = props

  const headers = [
    {
      name: 'Nome',
      field: 'name'
    },
    {
      name: 'Email',
      field: 'email'
    }
  ]

  const getUser = (user) => {
    setUser(user)
  }

  const toggle = () => {
    setOpen(!open)
  }

  const copyToClipboard = (e) => {
    text.current.select()
    document.execCommand('copy')
    e.target.focus()
  }

  const actions = () => {
    return (
      <div className="buttons_modal">
        <Button basic onClick={toggle}>
          Cancelar
        </Button>
        <Button
          onClick={copyToClipboard}
          icon={() => <Icon size={16} name="copy" />}
        >
          Copiar
        </Button>
      </div>
    )
  }

  const getUrl = () => {
    const url = process.env.REACT_APP_URL
    const user = UserUtils.getUser()
    return `${url}/${user.cliente_id}`
  }

  return (
    <div className="List">
      <div className="list-header">
        <Header onClick={toggle} />
      </div>
      <div className="list-main">
        <Table onClick={getUser} headers={headers} data={data} />
      </div>

      <Modal
        open={open}
        close={toggle}
        title="Convidar usuário"
        actions={() => actions()}
        subtitle="Insira o endereço do usuário que deseja convidar"
      >
        <Input
          shrink
          ref={text}
          label="Link"
          name="name"
          value={getUrl()}
          startAdornment={
            <InputAdornment position="start">
              <Icon size={30} name="link" />
            </InputAdornment>
          }
        />
      </Modal>
    </div>
  )
}

export default List
