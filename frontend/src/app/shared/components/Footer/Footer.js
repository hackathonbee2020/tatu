/*eslint-disable*/
import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// core components
import styles from '@js/material/components/footerStyle.js'

const useStyles = makeStyles(styles)

export default function Footer(props) {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <p className={classes.right}>
            &copy; {1900 + new Date().getYear()} Blog Admin, made with love for
            a better web
        </p>
      </div>
    </footer>
  )
}
