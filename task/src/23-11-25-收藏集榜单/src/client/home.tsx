import React, { useEffect, useState} from 'react'
import Top from './tab'
import Bottom from './rank'
import { useAtom } from 'jotai'
import { bfsImg } from '../utils/common'
import { configAtom } from '../jotai/common'


import './home.less'

const Home = () => {
  const [config] = useAtom(configAtom)
  const [HeadImg, setHeadImg]=useState('')
  const [HeadLine, setHeadLine]=useState('')

  useEffect(() => {
    if (config) {
      const {HeadImg, HeadLine}=config
      setHeadImg(HeadImg)
      setHeadLine(HeadLine)
    }
  }, [config])

  return (
    <div className="dress-award-list-wrapper">
      <div className="dress-award-list-container" style={{ backgroundImage:`url(${bfsImg(HeadImg,750)})`}}>
        <img className="subtitle" src={HeadLine} />
        <Top></Top>
        <Bottom></Bottom>
      </div>
    </div>
  )
}

export default Home
