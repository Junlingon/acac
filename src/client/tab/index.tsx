import React, { useEffect, useState } from 'react'
import TabBtn from './TabBtn'

import { useAtom } from 'jotai'
import {
  configAtom,
  curMainTabAtom,
  curSubTabAtom,
} from '../../jotai/common'
import { mainTabs } from '../../constants/tab'

import './index.less'

const Top = () => {
  const [config] = useAtom(configAtom)
  const [curMainTab, setCurMainTab] = useAtom(curMainTabAtom)
  const [curSubTab, setCurSubTab] = useAtom(curSubTabAtom)

  useEffect(() => {
    if (config) {
      console.log('config:', config)
    }
  }, [config])

  const handleMainTabChange = (item) => {
    console.log('mainItem', item)
    setCurMainTab(item)
    setCurSubTab(item.subTabs[0])
  }

  const handleSubTabChange = (item) => {
    console.log('subItem', item)
    setCurSubTab(item)
  }

  return (
    <div className={`dress-award-list-top ${[0, 1].includes(curMainTab._index) ? 'tab-extra-style-1' : 'tab-extra-style-2'}`}>
      <div className="top-main-tab-container">
        {mainTabs.map((item) => (
          <TabBtn
            key={item.value}
            text={item.name}
            active={curMainTab.value === item.value}
            type="main"
            onClick={() => handleMainTabChange(item)}
          />
        ))}
      </div>
      <div className={`top-sub-tab-container`}>
        {curMainTab.subTabs.map((item, index) => (
          <TabBtn
            key={index}
            text={item.name}
            active={(curSubTab.value) === item.value}
            type="sub"
            onClick={() => handleSubTabChange(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default Top
