import React, { useEffect } from 'react'
import Top from './tab'
import Bottom from './rank'
import { useAtom } from 'jotai'

import './home.less'

const Home = () => {
  useEffect(() => {}, [])

  return (
    <div className="dress-award-list-wrapper">
      <div className="dress-award-list-container">
        <img className="subtitle" src="https://i0.hdslb.com/bfs/activity-plat/static/20231127/55e8b7702babcaa954cb4a844e5ce05e/nnlYxh4fdX.png" />
        <Top></Top>
        <Bottom></Bottom>
      </div>
    </div>
  )
}

export default Home
