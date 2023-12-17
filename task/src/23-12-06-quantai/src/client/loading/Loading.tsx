import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { loadingAtom } from '@jotai/common'

import styles from './loading.module.less'

const Loading = () => {
  const [, setLoadingVisible] = useAtom(loadingAtom)
  const [count, setCount] = useState(2)

  /***
   * 这里用于修改loading关闭的条件
   */
  useEffect(() => {
    setTimeout(() => {
      if (count <= 1) {
        console.log('loading 结束')
        setLoadingVisible(false)
      } else {
        console.log('倒计时', count)
        setCount((count) => count - 1)
      }
    }, 1000)
  }, [count])

  return (
    <>
      <div className={styles.loading}>
        <p>{count}s 后自动关闭 loading</p>
        <div className={styles.container}>loading...</div>
      </div>
    </>
  )
}

export default Loading
