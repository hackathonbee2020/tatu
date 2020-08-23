import React, { useState, useRef } from 'react'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import AttachFileIcon from '@material-ui/icons/AttachFile'

// Styles
import './styles.scss'

const File = props => {
  const refContainer = useRef(null)

  const [nameFile, setNameFile] = useState(null)

  const handleChange = ({ target: { files } }) => {
    const { name } = props
    const file = files[0]
    if (file) {
      const event = {
        target: {
          name,
          value: file
        }
      }
      props.handleChange(event)
      setNameFile(file.name)
    }
  }

  const activeFile = () => {
    refContainer.current.click()
  }

  const { readOnly } = props

  return (
    <div className="File">
      <TextField
        {...props}
        type={null}
        onClick={activeFile}
        value={nameFile}
        InputProps={{
          readOnly,
          endAdornment: (
            <IconButton className="file-icon">
              <AttachFileIcon />
            </IconButton>
          )
        }}
      />
      <input
        onChange={handleChange}
        className="input-file"
        ref={refContainer}
        type="file"
      />
    </div>
  )
}
export default File
