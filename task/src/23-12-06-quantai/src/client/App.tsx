import React, { useEffect } from 'react'
import biliMirror from '@bilibili/bili-mirror'

import Home from './home/Home'
import Loading from './loading/Loading'
import { useAtom } from 'jotai'
import { loadingAtom } from '@jotai/common'
import { callNative } from '@bilibili/utils-leona'
import { setShareContentFunc, setDefineBar } from '@utils/share'

import '@api/http'

import '../assets/less/normalize.less'
import '../assets/less/base.less'

import '@bilibili/fe-quick-share/dist/share.css'

const App = () => {
  const [loadingVisible] = useAtom(loadingAtom)
  /**
   * 导航栏设置
   */
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual'
    }
    if (loadingVisible) {
      setShareContentFunc()
    } else {
      setDefineBar({
        leftBarsActionFunc: () => {
          // 左边按钮操作方法
          // 直接关闭
          callNative({
            method: 'global.closeBrowser',
          })
        },
        rightBarsActionFunc: () => {
          // 右边按钮操作方法
        },
      })
    }
  }, [loadingVisible])

  /**
   * bili-mirror 上报
   */
  useEffect(() => {
    biliMirror.init({
      origin: 'ogv',
      module: 'activity-quantai-2023',
      config: {
        whiteScreen: {
          elemArry: ['html', 'body', '#app'], // 要检测的dom-tree 默认 ['html','body','#app'] 支持html标签, id--#+'xxx" 样式:'.'+'xxx",例如:['html','body','#app','.account-wrapper']
          callback: (status) => {
            console.log('白屏检测是否正常', status)
          },
          isSkeleton: false, // 是否有骨架屏
          checkNum: 3, //默认值 （可选）基本结构层级
          maxLoop: 9, // 默认值 最大轮训次数，默认10次
        },
      },
    })
  }, [])

  return (
    <div>
      {loadingVisible ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Home />
          {/* <ToolBar /> */}
        </>
      )}
    </div>
  )
}

export default App
