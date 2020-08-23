import React from 'react'
import clsx from 'clsx'

import Translate from '@components/Translate'

import './styles.scss'

const Button = (props) => {
  const { icon, basic, background } = props

  const classes = clsx('Button', { basic })

  const styles = { backgroundColor: background }

  return (
    <button {...props} style={styles} className={classes}>
      <div className="button-icon">{icon ? icon() : null}</div>
      <Translate>{props.children}</Translate>
    </button>
  )
}

export default Button
