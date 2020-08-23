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

const List = (props) => {
  const [open, setOpen] = useState(false)

  const { data, updateList } = props

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

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string()
        .required('Email obritatório')
        .email('Email obritatório')
    })
  }

  const toggle = () => {
    setOpen(!open)
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
          Salvar Cliente
        </Button>
      </div>
    )
  }

  const onSubmit = ({ values, submit, resetForm }) => {
    values.password = 123456;
    submit({ params: values })
    resetForm()
  }

  return (
    <div className="List">
      <div className="list-header">
        <Header onClick={toggle} />
      </div>
      <div className="list-main">
        <Table headers={headers} data={data} />
      </div>

      <Axios api="clientes" method="post" onSuccess={updateList}>
        {({ submit }) => (
          <Formik
            {...schema}
            onSubmit={(values, event) => onSubmit({ ...event, values, submit })}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
              <Modal
                open={open}
                close={toggle}
                actions={() => actions({ handleSubmit })}
                title="Novo Cliente"
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
                <Input
                  shrink
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email}
                  helperText={errors.email}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon size={30} name="user" />
                    </InputAdornment>
                  }
                />
              </Modal>
            )}
          </Formik>
        )}
      </Axios>
    </div>
  )
}

export default List
