import { configAtom } from '../../jotai/common'
import { useAtom } from 'jotai'
import React, { useState, useEffect } from 'react'
import { Image } from '@model/common'

import Award from './award/award';
import List from './list/list';

import './index.less'

const Bottom = () => {
  const [config] = useAtom(configAtom)

  useEffect(() => {
    if (config) {
      console.log('config', config)
    }
  }, [config])

  return <div className="dress-award-list-bottom">
    {/* 冠军奖励 */}
    <Award></Award>
    {/* 总榜单 */}
    <List></List>
  </div>
}

export default Bottom
