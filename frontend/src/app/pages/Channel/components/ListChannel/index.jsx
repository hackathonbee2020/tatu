import React, { useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'

import Axios from '@components/Axios'
import Table from '@components/Table'
import Modal from '@components/Modal'
import Input from '@components/Input'
import Icon from '@components/Icon'
import Button from '@components/Button'

import Header from './components/Header'

import * as Yup from 'yup'
import { Formik } from 'formik'

import './styles.scss'

const ListChannel = (props) => {
  const { setChannel } = props

  const [run, setRun] = useState(1)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState([])

  const headers = [
    {
      name: 'Nome',
      field: 'name'
    }
  ]

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome obrigatório')
    })
  }

  const onSuccess = (data) => {
    setData(data)
  }

  const updateList = () => {
    setRun(run + 1)
  }

  const getChannel = (channel) => {
    setChannel(channel)
  }

  const toggle = () => {
    setOpen(!open)
  }

  const onSuccessClient = (data) => {
    setClients(data)
  }

  const actions = ({ handleSubmit }) => {
    return (
      <div className="buttons_modal">
        <Button basic onClick={toggle}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          icon={() => <Icon size={16} name="check" />}
        >
          Salvar Canal
        </Button>
      </div>
    )
  }

  const onSubmit = ({ values, submit, resetForm }) => {
    submit({ params: values })
    resetForm()
  }
  
  return (
    <Axios run={run} api="channels" onSuccess={onSuccess}>
      <div className="ListChannel">
        <div className="list-header">
          <Header onClick={toggle} />
        </div>
        <div className="list-main">
          <Table onClick={getChannel} headers={headers} data={data} />
        </div>

        <Axios api="channels" method="post" onSuccess={updateList}>
          {({ submit }) => (
            <Formik
              {...schema}
              onSubmit={(values, event) =>
                onSubmit({ ...event, values, submit })
              }
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <Modal
                  open={open}
                  close={toggle}
                  actions={() => actions({ handleSubmit })}
                  title="Novo Canal"
                >
                  <Input
                    shrink
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={errors.name}
                    helperText={errors.name}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon size={30} name="sales" />
                      </InputAdornment>
                    }
                  />

                  <Axios run api="clientes" onSuccess={onSuccessClient}>
                    <Input
                      shrink
                      label="Cliente"
                      nameText="name"
                      name="cliente_id"
                      nameValue="id"
                      type="autocomplete"
                      array={clients}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cliente_id}
                      error={errors.cliente_id}
                      helperText={errors.cliente_id}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon size={30} name="user" />
                        </InputAdornment>
                      }
                    />
                  </Axios>

                </Modal>
              )}
            </Formik>
          )}
        </Axios>
      </div>
    </Axios>
  )
}

export default ListChannel
