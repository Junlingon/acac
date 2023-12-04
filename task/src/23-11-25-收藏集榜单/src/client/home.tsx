import React, { useEffect } from 'react'
import Top from './tab'
import Bottom from './rank'
import { useAtom } from 'jotai'
import { bfsImg } from '../utils/common';

import './home.less'

const Home = () => {
  useEffect(() => {}, [])

  return (
    <div className="dress-award-list-wrapper">
      <div className="dress-award-list-container" style={{ backgroundImage:`url(${bfsImg('https://i0.hdslb.com/bfs/activity-plat/static/20231204/d3de01ea5b5200083302ca865c89375d/q28CPpPTRm.png',750)})`}}>
        <img className="subtitle" src="https://i0.hdslb.com/bfs/activity-plat/static/20231204/d3de01ea5b5200083302ca865c89375d/SeO66wa5ss.png" />
        <Top></Top>
        <Bottom></Bottom>
      </div>
    </div>
  )
}

export default Home
