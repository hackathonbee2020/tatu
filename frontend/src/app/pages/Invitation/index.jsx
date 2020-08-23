import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import Utils from '@utils'
import Config from '@configs'
import Input from '@components/Input'
import Axios from '@components/Axios'
import InputAdornment from '@material-ui/core/InputAdornment'

import Icon from '@components/Icon'

import invitation from '@images/png/invitation.png'

import * as Yup from 'yup'
import { Formik } from 'formik'

import './styles.scss'

const Invitation = (props) => {
  const history = useHistory()

  const [cliente_id, setId] = useState(null)

  useEffect(() => {
    const { params } = props.match || {}
    setId(params.cliente_id)
    sessionStorage.clear()
  }, [])

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      password: Yup.string().required('Senha obrigatória'),
      email: Yup.string()
        .required('Email obritatório')
        .email('Email obritatório')
    })
  }

  const onSuccess = ({ success }) => {
    setUser(Utils.getValue(success, 'user'))
    setToken(Utils.getValue(success, 'token'))
  }

  const setToken = (token) => {
    sessionStorage.setItem(Config.TokenSession, token)
    history.push('/')
  }

  const setUser = (user) => {
    sessionStorage.setItem(Config.ObjectSession, JSON.stringify(user))
  }

  const onSubmit = ({ values, submit, resetForm }) => {
    values.cliente_id = cliente_id;
    submit({ params: values })
    resetForm()
  }

  return (
    <div
      style={{ backgroundImage: `url(${invitation})` }}
      className="Invitation"
    >
      <div className="invitation-logo">
        <Icon size={180} name="tok" />
      </div>
      <div className="invitation-main">
        <div className="invitation-main-header">
          <h3>Falta pouco</h3>
          <p>Insira o endereço do usuário que deseja convidar</p>
        </div>
        <Axios api="register" method="post" onSuccess={onSuccess}>
          {({ submit }) => (
            <Formik
              {...schema}
              onSubmit={(values, event) =>
                onSubmit({ ...event, values, submit })
              }
            >
              {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <>
                  <div className="invitation-main-content">
                    <div className="invitation-main-content-main">
                      <div className="form">
                        <Input
                          shrink
                          label="Name"
                          name="name"
                          onBlur={handleBlur}
                          value={values.name}
                          error={errors.name}
                          onChange={handleChange}
                          helperText={errors.name}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon size={25} name="emoticon" />
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

                        <Input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          error={errors.password}
                          helperText={errors.password}
                          label="Senha"
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon size={30} name="look" />
                            </InputAdornment>
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="invitation-main-footer">
                    <button onClick={handleSubmit} disabled={isSubmitting}>
                      Enviar
                    </button>
                  </div>
                </>
              )}
            </Formik>
          )}
        </Axios>
      </div>
    </div>
  )
}

export default Invitation
