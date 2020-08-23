import React, { useEffect, useState, useRef } from 'react'
import Talk from 'talkjs'

import InputAdornment from '@material-ui/core/InputAdornment'

import UserUtils from '@utils/userUtils'
import { http } from '@components/Axios'
import Axios from '@components/Axios'
import Modal from '@components/Modal'
import Input from '@components/Input'
import Icon from '@components/Icon'
import Button from '@components/Button'

import Header from './components/Header'

import * as Yup from 'yup'
import { Formik } from 'formik'

import background from '@images/png/background.png'

import './styles.scss'

const Chat = (props) => {
  const { item, updateList, agents = [], departments = [] } = props

  const talkjsContainer = useRef()
  const user = UserUtils.getUser()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (item) {
      getChat()
      updateChannel(item)
    }
  }, [item])

  const schema = {
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object().shape({
      // agente_id: Yup.string().required('Agente obrigatório'),
      department_id: Yup.string().required('Departamento é obrigatório')
    })
  }

  const toggle = () => {
    setOpen(!open)
  }

  const onSubmit = ({ values, submit, resetForm }) => {
    values.id = item.id;
    values.agente_id = values.agente_id || 'd4383ae5-fa85-4cc7-9169-e8b18dbf326c';
    submit({ params: values })
    resetForm()
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
          Transferir
        </Button>
      </div>
    )
  }

  const updateChannel = (item, status = '02') => {
    http({
      method: 'put',
      api: 'conversations',
      params: {
        status,
        agente_id: user.id,
        conversation_id: item.conversation_id
      },
      others: item.id
    })
  }

  const getChat = () => {
    Talk.ready.then(() => {
      let me = new Talk.User({
        id: user.id,
        name: user.name,
        email: user.email,
        welcomeMessage: 'Bem vindo ao Tok'
      })

      window.talkSession = new Talk.Session({
        appId: 'tc7Q1y1H',
        me: me
      })

      var conversation = window.talkSession.getOrCreateConversation(
        item.conversation_id
      )

      if (item.status === '02') {
        conversation.setParticipant(me)
      }

      const chatbox = window.talkSession.createChatbox(conversation, {
        showChatHeader: false,
        showFeedHeader: false,
        showMobileBackButton: false
      })

      chatbox.mount(talkjsContainer.current)

      chatbox.on('sendMessage', updateList)
      chatbox.on('conversationSelected', updateChannel)
    })
  }

  const onInit = () => {
    getChat()
  }

  const onFinish = () => {
    updateList()
    updateChannel(item, '03')
  }

  return (
    <div className="Chat">
      <Header
        onTransf={toggle}
        onFinish={onFinish}
        onInit={onInit}
        {...props}
      />

      <div
        className="chat-maessage"
        ref={talkjsContainer}
        id="chat"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <Axios api="conversations.transference" method="post" onSuccess={updateList}>
        {({ submit }) => (
          <Formik
            {...schema}
            onSubmit={(values, event) => onSubmit({ ...event, values, submit })}
          >
            {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
              <Modal
                open={open}
                close={toggle}
                title="Transferir atendimento"
                actions={() => actions({ handleSubmit })}
              >
                <Input
                  shrink
                  label="Agentes"
                  nameText="name"
                  name="agente_id"
                  nameValue="id"
                  type="autocomplete"
                  array={agents}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.agente_id}
                  error={errors.agente_id}
                  helperText={errors.agente_id}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon size={25} name="user" />
                    </InputAdornment>
                  }
                />
                <Input
                  shrink
                  label="Departamento"
                  nameText="name"
                  name="department_id"
                  nameValue="id"
                  type="autocomplete"
                  array={departments}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.department_id}
                  error={errors.department_id}
                  helperText={errors.department_id}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon size={25} name="sales" />
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

export default Chat
