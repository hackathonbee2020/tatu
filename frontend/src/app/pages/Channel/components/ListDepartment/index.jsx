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

const ListDepartment = (props) => {
  const { channel } = props

  const [run, setRun] = useState(1)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)

  const { setUser } = props

  const headers = [
    {
      name: 'Nome',
      field: 'name'
    }
  ]

  const getUser = (user) => {
    setUser(user)
  }

  const toggle = () => {
    setOpen(!open)
  }

  const updateList = () => {
    setRun(run + 1)
  }

  const onSuccess = (data) => {
    if (data) {
      setData(data)
    }
  }

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome obrigatório')
    })
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
          Salvar Departamento
        </Button>
      </div>
    )
  }

  const onSubmit = ({ values, submit, resetForm }) => {
    values.channel_id = channel.id
    values.cliente_id = channel.cliente_id
    submit({ params: values })
    resetForm()
  }

  const component = () => {
    if (channel) {
      return (
        <div className="list-department-main">
          <Axios
            run={run}
            api="departments"
            onSuccess={onSuccess}
            others={{ channel_id: channel.id }}
          >
            <div className="list-header">
              <Header onClick={toggle} />
            </div>
            <div className="list-main">
              <Table onClick={getUser} headers={headers} data={data} />
            </div>
          </Axios>
        </div>
      )
    }
  }

  return (
    <div className="ListDepartment">
      {component()}
      <Axios api="departments" method="post" onSuccess={updateList}>
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
                title="Novo Departamento"
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
              </Modal>
            )}
          </Formik>
        )}
      </Axios>
    </div>
  )
}

export default ListDepartment
