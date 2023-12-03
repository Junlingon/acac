import React from "react"

import './tabBtn.less'

type TabBtnProps = {
  text: string,
  type: 'main' | 'sub',
  active: boolean,
  onClick: () => void,
}

const TabBtn = ({
  text,
  type,
  active,
  onClick,
}: TabBtnProps) => {
  return (
    <div className={`${type}-tab-btn common-tab-btn ${active ? 'active' : ''}`} onClick={onClick}>
      <div className={`${type}-tab-btn-text`}>
        { text }
      </div>
    </div>
  )
}

export default TabBtn