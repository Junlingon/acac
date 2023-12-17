import React, { useEffect, useState } from 'react'

import FusionHeader from './FusionHeader'
import FusionBody from './FusionBody'
import FusionFooter from './FusionFooter'
import Dialog from '@client/common/base-dialog/Index'
import ExchangeSuccessModal from './ExchangeSuccessModal'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

import { useAtom } from 'jotai'
import {
  roleListAtom,
  getRoleInfoAtom,
  curRoleInfoAtom,
  setCurRoleInfoAtom,
  exchangeRewardAtom,
  clearNewAtom,
} from '@jotai/fusion'
import { getRankAtom } from '@jotai/rank'
import { bfsImg } from '@utils/common'

import styles from './fusion.module.less'

const Fusion = () => {
  const [roleList] = useAtom(roleListAtom)
  const [curRoleInfo] = useAtom(curRoleInfoAtom)
  const [, getRoleInfo] = useAtom(getRoleInfoAtom)
  const [, getRank] = useAtom(getRankAtom)
  const [, setCurRoleInfo] = useAtom(setCurRoleInfoAtom)
  const [, exchangeReward] = useAtom(exchangeRewardAtom)
  const [, clearNew] = useAtom(clearNewAtom)

  const [exChangeSuccessDialogVisible, setExChangeSuccessDialogVisible] =
    useState(false)
  const [awardList, setAwardList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRoleInfo()
  }, [])

  // 角色切换
  const handleRoleChange = (roleInfo) => {
    // 清除new
    if (haveNew(curRoleInfo)) {
      handleClearNew(curRoleInfo.id)
    }
    setCurRoleInfo(roleInfo)
  }

  const handleClearNew = async (preId) => {
    await clearNew(preId)
    getRoleInfo()
  }

  const haveNew = (info) => {
    return (
      info?.ownedFragmentList?.some((item) => item.label === 'NEW') || false
    )
  }

  // 兑换
  const handleExchange = async () => {
    setLoading(true)
    try {
      const res = await exchangeReward(curRoleInfo?.id)
      setAwardList(res?.rewards || [])
      // 显示弹框
      setExChangeSuccessDialogVisible(true)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  // 关闭弹框后
  const handleExchangeModalClose = () => {
    setExChangeSuccessDialogVisible(false)
    if (haveNew(curRoleInfo)) {
      // clear new
      handleClearNew(curRoleInfo.id)
    } else {
      getRoleInfo()
    }
    // 重新拉取排行榜
    setTimeout(() => {
      getRank()
    }, 500)
  }

  return (
    <>
      <Dialog
        visible={exChangeSuccessDialogVisible}
        content={
          <ExchangeSuccessModal
            awardList={awardList}
            onClose={handleExchangeModalClose}
          />
        }
        handleClose={handleExchangeModalClose}
      />

      <Backdrop sx={{ zIndex: 10 }} open={loading}>
        <CircularProgress />
      </Backdrop>

      <div
        id="cardPosition"
        style={{
          backgroundImage: `url(${bfsImg(
            'https://i0.hdslb.com/bfs/activity-plat/static/20231206/55e8b7702babcaa954cb4a844e5ce05e/U3gxLONPd3.png',
            678
          )})`,
        }}
        className={styles['fusion-container']}
      >
        <FusionHeader
          activeId={curRoleInfo?.id}
          roleList={roleList}
          onRoleChange={handleRoleChange}
        />
        <FusionBody
          showVipBtn={
            curRoleInfo?.unlockType === 'VIP' && !curRoleInfo?.unlocked
          }
          showDlcBtn={
            curRoleInfo?.unlockType === 'DLC' && !curRoleInfo?.unlocked
          }
          bigImage={curRoleInfo?.picture}
          fragments={curRoleInfo?.ownedFragmentList}
        />
        <FusionFooter
          isCompletely={curRoleInfo?.award}
          awards={curRoleInfo?.awards}
          onExchange={handleExchange}
        />
      </div>
    </>
  )
}

export default Fusion
