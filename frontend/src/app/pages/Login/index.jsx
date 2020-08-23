import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import Utils from '@utils'
import Config from '@configs'
import Input from '@components/Input'
import Axios from '@components/Axios'
import InputAdornment from '@material-ui/core/InputAdornment'

import Icon from '@components/Icon'
import Image from '@components/Image'

import tok from '@svg/tok.svg'
import background from '@images/png/login.png'

import * as Yup from 'yup'
import { Formik } from 'formik'

import './styles.scss'

const Login = () => {
  const history = useHistory()

  useEffect(() => {
    sessionStorage.clear()
  }, [])

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
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
    submit({ params: values })
    resetForm()
  }

  return (
    <div style={{ backgroundImage: `url(${background})` }} className="Login">
      <div className="login-logo">
        <Image src={tok} />
      </div>
      <div className="login-main">
        <div className="login-main-header">
          <h3>Bem-vindo de volta !</h3>
          <p>
            Insira suas credenciais e inicie uma <span>Talk</span> :D
          </p>
        </div>
        <Axios api="login" method="post" onSuccess={onSuccess}>
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
                  <div className="login-main-content">
                    <div className="login-main-content-main">
                      <div className="form">
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
                          className="input_pass"
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
                    <p className="text-login"> Esqueceu sua senha?</p>
                  </div>
                  <div className="login-main-footer">
                    <button onClick={handleSubmit} disabled={isSubmitting}>
                      Entrar
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

export default Login
