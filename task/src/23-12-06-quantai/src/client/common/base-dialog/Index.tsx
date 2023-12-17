import React from 'react'
import Modal from '@mui/material/Modal'

import styles from './index.module.less'

const BaseDialog = (props) => {
  const dialogContainer = () => {
    return (
      <div className={styles.dialogContainer} style={props.styles}>
        {props.content}

        <div className={styles.close} onClick={props.handleClose}></div>
      </div>
    )
  }

  return (
    <Modal
      open={props.visible}
      style={{ background: 'rgba(0,0,0,0.8)', outline: 'none' }}
    >
      {dialogContainer()}
    </Modal>
  )
}

export default BaseDialog
