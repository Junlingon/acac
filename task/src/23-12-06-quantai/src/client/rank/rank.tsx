import React, { useEffect, useState } from 'react'

import styles from './rank.module.less'
import { useAtom } from 'jotai'
import { getRankAtom, rankInfoAtom } from '@jotai/rank'
import { RankInfoItem } from '@model/rank'
import Mine from './mine'

const pageNum = 10
const defaultNum = 3

const Rank = () => {
  const [rankInfo, getRank] = useAtom(getRankAtom)
  const [list, setList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [index, setIndex] = useState(1)

  useEffect(() => {
    getRank()
  }, [])

  // 显示
  useEffect(() => {
    if (rankInfo) {
      reset()
    }
  }, [rankInfo])

  // 初始化
  const reset = () => {
    setList(rankInfo.rankList.slice(0, defaultNum))
    setHasMore(true)
  }

  const showMore = () => {
    /***
     * 第一次加 7 条数据，第二次开始加 10 条
     * 1. 先加 10 条
     * 2. 判断是不是结束了
     */
    setList(rankInfo.rankList.slice(0, index * pageNum))
    if (rankInfo.rankList.length <= pageNum * index) {
      setHasMore(false)
    }
    setIndex(index + 1)
  }

  const collapse = () => {
    reset()
  }

  const getRankText = (rank) => {
    return rank < 10 ? '0' + rank : rank
  }

  return (
    <div className={styles.rankWrapper}>
      <div className={styles.title}>
        <div className={styles.titleContent}>
          <div className={styles.title}></div>
          <div className={styles.text}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.top}></div>
        <div className={styles.rankList}>
          <p className={styles.listTitle}>拳手排行榜</p>
          <p className={styles.listDesc}>
            碎片发放即得10乾/枚，记忆合成可领额外乾数
          </p>
          <ul className={styles.list}>
            {list.map((item, index) => {
              return (
                <li key={index}>
                  <p className={styles.rankNumber}>{getRankText(item.rank)}</p>
                  <div className={styles.rankAvatar}>
                    <img src={item.userAvatar} alt="" />
                  </div>
                  <div className={styles.rankName}>{item.userName}</div>

                  <div className={styles.scoreWrapper}>
                    <div className={styles.score}>{item.score}</div>
                    <div className={styles.text}>乾</div>
                  </div>
                </li>
              )
            })}
          </ul>
          {rankInfo.rankList.length > defaultNum ? (
            <div className={styles.action}>
              {hasMore ? (
                <div className={styles.actionContent} onClick={showMore}>
                  <div className={`${styles.icon}`}></div>
                  <div className={styles.text}>点击展开10个排名</div>
                </div>
              ) : (
                <div className={styles.actionContent} onClick={collapse}>
                  <div className={`${styles.icon} ${styles.collapse}`}></div>
                  <div className={styles.text}>收起</div>
                </div>
              )}
            </div>
          ) : null}
          <Mine></Mine>
        </div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  )
}

export default Rank
