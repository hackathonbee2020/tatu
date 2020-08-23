import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

import Box from './components/Box'
import CardClient from './components/CardClient'

import './styles.scss'

const Chat = () => {
  const [item, setItem] = useState(null)
  return (
    <div className="Chat">
      <Grid container spacing={3}>
        <Grid className="pd-0" item xs>
          <Box item={item} setItem={setItem} />
        </Grid>
        <Grid className="pd-0" item xs={3}>
          <CardClient item={item} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Chat
