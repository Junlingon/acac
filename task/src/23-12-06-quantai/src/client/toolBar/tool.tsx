import React from 'react'

import styles from './tool.module.less'
import { linkJump } from '@bilibili/utils-leona'
import { report } from '@bilibili/ogv-stars'
import { ruleIcon, ruleLink } from '@constants/toolBar'

const ToolBar = () => {
  // 规则点击
  const ruleClick = () => {
    report.reportWebClick('rule_click')
    ruleLink &&
      linkJump({
        link: ruleLink,
      })
  }

  return (
    <div className={`${styles.toolBar} ${styles.row}`}>
      {/* 规则 */}
      {ruleLink ? (
        <div
          className={styles.toolItem}
          style={{ backgroundImage: `url('${ruleIcon}')` }}
          onClick={ruleClick}
        ></div>
      ) : null}
    </div>
  )
}

export default ToolBar
