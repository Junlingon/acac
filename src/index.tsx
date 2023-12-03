import React, { useEffect } from 'react'
import './assets/less/normalize.less'
import './assets/less/base.less'
import Home from './client/home'
import { useAtom } from 'jotai'
import { configAtom } from './jotai/common'

interface IOwnProps {}

const Component: React.FC<IOwnProps> = (props: any) => {
  const [, setConfig] = useAtom(configAtom)

  useEffect(() => {
    if (props) {
      const { config } = props
      setConfig(config)
    }
  }, [props])

  return (
    <>
      <Home></Home>
    </>
  )
}

export default Component
