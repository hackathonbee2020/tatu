import React from 'react'

import Axios from '@components/Axios'
import Image from '@components/Image'
import Input from '@components/Input'
import Icon from '@components/Icon'
import Button from '@components/Button'

import avatar1 from '@images/png/avatar1.png'
import listfound from '@images/png/list-found.png'

import * as Yup from 'yup'
import { Formik } from 'formik'

import './styles.scss'

const CardClient = (props) => {
  const array = [
    {
      name: 'Gerente',
      value: 'manager'
    },
    {
      name: 'Agente',
      value: 'agente'
    },
    {
      name: 'Admin',
      value: 'admin'
    }
  ]

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      type: Yup.string().required('Cargo é obrigatório'),
    })
  }

  const onSubmit = ({ values, submit, resetForm }) => {
    submit({ params: values })
    resetForm()
  }

  const components = () => {
    const { user = {}, updateList } = props
    return (
      <Axios api="clientes" method="post" onSuccess={updateList}>
        {({ submit }) => (
          <Formik
            {...schema}
            onSubmit={(values, event) => onSubmit({ ...event, values, submit })}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
              <>
                <div className="cardclient-header">
                  <div className="cardclient-avatar">
                    <Image src={avatar1} />
                  </div>
                  <div className="cardclient-description">
                    <h4> {user.name} </h4>
                  </div>
                </div>

                <div className="cardclient-main">
                  <div className="cardclient-main-item">
                    <Input
                      shrink
                      label="E-mail"
                      name="email"
                      variant="standard"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={user.email}
                      error={errors.email}
                      helperText={errors.email}
                    />
                  </div>
                  <div className="cardclient-main-item">
                    <Input
                      variant="standard"
                      array={array}
                      nameValue="value"
                      nameText="name"
                      name="type"
                      type="select"
                      label="Cargo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                      error={errors.type}
                      helperText={errors.type}
                    />
                  </div>
                  <div className="cardclient-main-item">
                    <Input
                      type="add"
                      variant="standard"
                      label="Procurar Canais"
                    />
                  </div>
                  <div className="cardclient-main-item">
                    <Input
                      type="add"
                      variant="standard"
                      label="Procurar Departamentos"
                    />
                  </div>
                </div>
                <div className="cardclient-footer">
                  <Button
                    onClick={handleSubmit}
                    icon={() => <Icon name="check" />}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </>
            )}
          </Formik>
        )}
      </Axios>
    )
  }

  const image = () => {
    return (
      <div
        className="card-client-image"
        style={{ backgroundImage: `url(${listfound})` }}
      ></div>
    )
  }

  const { user } = props

  return <div className="CardClient">{user ? components() : image()}</div>
}

export default CardClient
