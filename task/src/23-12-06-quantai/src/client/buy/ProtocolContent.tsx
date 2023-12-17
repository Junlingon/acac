import React, { useEffect, useState } from 'react'

import styles from './protocol.module.less'
import { CHECK_BOX, CHECK_BOX_BLUE, protocolList } from '@constants/home'
import { linkJump } from '@bilibili/utils-leona'

const ProtocolContent = (props) => {
  const handleRuleJump = (link: string) => {
    link &&
      linkJump({
        link: link.trim(),
      })
  }

  return (
    <div className={`${styles.protocolContainer}`}>
      {props.style === 'blue' ? (
        <img
          className={`${styles.checkButton}`}
          src={
            props.checked
              ? CHECK_BOX_BLUE.CHECKED_URL
              : CHECK_BOX_BLUE.UNCHECKED_URL
          }
          onClick={props.handleCheck}
          alt=""
        />
      ) : (
        <img
          className={`${styles.checkButton}`}
          src={props.checked ? CHECK_BOX.CHECKED_URL : CHECK_BOX.UNCHECKED_URL}
          onClick={props.handleCheck}
          alt=""
        />
      )}
      <div className={styles.protocolWrapper}>
        <span>购买前请阅读</span>
        {protocolList.map((item, index) => {
          return index !== protocolList.length - 1 ? (
            <span
              className={styles.ruleStyle}
              onClick={() => {
                handleRuleJump(item.link)
              }}
              key={index}
            >
              《{item.name}》和
            </span>
          ) : (
            <span
              className={styles.ruleStyle}
              onClick={() => {
                handleRuleJump(item.link)
              }}
              key={index}
            >
              《{item.name}》
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default ProtocolContent
