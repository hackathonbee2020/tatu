import React from 'react'
import clsx from 'clsx'

import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import './styles.scss'

const Modal = (props) => {
  const { open, close, subtitle, title, actions, className } = props

  const getIconClose = () => {
    if (close) {
      return (
        <IconButton aria-label="close" onClick={close}>
          <CloseIcon />
        </IconButton>
      )
    }
  }

  const styles = clsx(['Modal', className])

  return (
    <Dialog className={styles} onClose={close} open={open}>
      <div className="confirm-modal-close">{getIconClose()}</div>
      <div className="confirm-modal-title">
        <h2>{title}</h2>
      </div>
      <div className="confirm-modal-description">
        <p className="description">{subtitle}</p>
      </div>
      <div className="confirm-modal-subtitle">{props.children}</div>
      <div className="confirm-modal-actions">{actions()}</div>
    </Dialog>
  )
}

export default Modal
