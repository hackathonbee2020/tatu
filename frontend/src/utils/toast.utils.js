import React from 'react'
import { toast } from 'react-toastify'
import Translate from '@components/Translate'
class ToastUtils {
  sendMessage = (type, message, autoClose = 5000, params) => {
    if (message) {
      const Mensagem = () => (
        <div className="custom-toast">
          <span>
            <i className="pe-7s-way" />
          </span>
          <div className="center-center">
            <Translate parameters={params}>{message}</Translate>
          </div>
        </div>
      )
      if (message) {
        toast[type](<Mensagem />, {
          autoClose,
          position: toast.POSITION.TOP_RIGHT,
        })
      }
    }
  }
}

export default new ToastUtils()