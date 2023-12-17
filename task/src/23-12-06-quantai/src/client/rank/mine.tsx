import React, { useEffect, useState } from 'react'

import styles from './rank.module.less'
import { useAtom } from 'jotai'
import { rankInfoAtom } from '@jotai/rank'
import { NO_FACE } from '@constants/index'

const pageNum = 10
const baseRank = 100

const Mine = () => {
  const [rankInfo] = useAtom(rankInfoAtom)

  const scoreGapText = () => {
    const { userRank, rankList = [] } = rankInfo || {}
    if (!userRank) return ''
    if (userRank.rank === 1) {
      // ○如果用户是第一名，显示距离下一名的分差 下一名没有的话当0 处理
      const secondUser = rankList[1]
      return secondUser
        ? `领先下一名${userRank.score - secondUser.score}`
        : `领先下一名${userRank.score}`
      // 如果用户是前100名（100可能调整），显示距离上一名的分差
    } else if (userRank.rank <= baseRank && userRank.rank > 0) {
      const previousUser = rankList[userRank.rank - 2]
      return `距上一名差${previousUser.score - userRank.score}`
      // 如果用户是100名之外，显示距离第100名的分差
    } else {
      const baseRankUser = rankList[baseRank - 1]
      return baseRankUser
        ? `距top${baseRank}差${baseRankUser.score - userRank.score}`
        : '距TOP100差1分'
    }
  }

  const getUserRank = () => {
    const { rank } = rankInfo.userRank || {}
    if (rank <= 0) {
      return `1000+`
    } else if (rank <= 1000) {
      return `${rank}`
    } else {
      return `1000+`
    }
  }

  return (
    <div className={styles.mineWrapper}>
      <div className={styles.mine}>
        <p className={styles.rankNumber}>{getUserRank()}</p>
        <div className={styles.rankAvatar}>
          <img src={rankInfo.userRank.userAvatar || NO_FACE} alt="" />
        </div>
        <div className={styles.rankName}>{rankInfo.userRank.userName}</div>

        <div className={styles.scoreInfo}>
          <div className={styles.scoreWrapper}>
            <div className={styles.score}>{rankInfo.userRank.score}</div>
            <div className={styles.text}>乾</div>
          </div>

          <div className={styles.userRankDesc}>{scoreGapText()}</div>
        </div>
      </div>
    </div>
  )
}

export default Mine
