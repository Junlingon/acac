import React from 'react'
import Buy from './Buy'
import styles from './buy.module.less'
import Task from './Task'
import Collections from './Collections'
import PurchaseModal from './PurchaseModal'

const BuyIndex = () => {
  return (
    <>
      <div className={styles.buyWrapper} id="buyWrapper">
        {/* 标题 */}
        <div className={styles.topBg}>
          <div className={styles.tittle}></div>
        </div>

        {/* 购买会员 */}
        <Buy></Buy>

        {/* 购买收藏集 */}
        <Collections></Collections>

        {/* 任务列表 */}
        <Task></Task>

        <PurchaseModal />

        <div className={styles.bottomBg}></div>
      </div>
    </>
  )
}

export default BuyIndex
