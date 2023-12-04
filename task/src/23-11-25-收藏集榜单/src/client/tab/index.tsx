import React, { useEffect, useState } from 'react'
import TabBtn from './TabBtn'

import { useAtom } from 'jotai'
import {
  configAtom,
  curMainTabAtom,
  curSubTabAtom,
  TabsAtom
} from '../../jotai/common'

import './index.less'

const Top = () => {
  const [config] = useAtom(configAtom)
  const [curMainTab, setCurMainTab] = useAtom(curMainTabAtom)
  const [curSubTab, setCurSubTab] = useAtom(curSubTabAtom)
  const [Tabs, setTabs] = useAtom(TabsAtom)

  useEffect(() => {
    if (config) {
      console.log('config:', config)
      const { mainTabs = [] } = config;
      setTabs(mainTabs);
      console.log('888888888', mainTabs)
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

  return (Tabs.length !== 0 ?
    <div className={`dress-award-list-top ${[Tabs[0].value, Tabs[1]?.value].includes(curMainTab.value) ? 'tab-extra-style-1' : 'tab-extra-style-2'}`}>
      <div className="top-main-tab-container">
        {Tabs.map((item) => (
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
    </div> : null
  )
}

export default Top
