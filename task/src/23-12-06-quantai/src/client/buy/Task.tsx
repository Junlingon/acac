import React, { useEffect } from 'react'
import styles from './task.module.less'
import TaskList from './taskList'

import { useAtom } from 'jotai'
import { executeNativeMethod, linkJump } from '@bilibili/utils-leona'
import {
  deviceInfoAtom,
  getTaskListAtom,
  taskDescVisibleAtom,
  taskListAtom,
  taskVisibleAtom,
} from '@jotai/task'
import { rewardsDialogVisibleAtom, buyRewardsListAtom } from '@jotai/dialog'
import { $taskComplete, $taskReceive } from '@api/http'
import { ACTIVITY_CODE } from '@constants/index'
import { currentSelectAtom } from '@jotai/common'

const bgColor = '#fff'
const itemColor = '#fff'
const awardType = 'None'
const titleImage = 'https://activity.hdslb.com/blackboard/static/axvy9F5Nsw.png'
const popDescTitle =
  'https://activity.hdslb.com/blackboard/static/fNrw2fuhhF.png'

const Task = () => {
  const [taskList] = useAtom(taskListAtom)
  const [taskVisible, setTaskVisible] = useAtom(taskVisibleAtom)
  const [, setCurrentSelect] = useAtom(currentSelectAtom)
  const [, getTaskList] = useAtom(getTaskListAtom)
  const [, setRewardsDialogVisible] = useAtom(rewardsDialogVisibleAtom)
  const [, setBuyRewardsList] = useAtom(buyRewardsListAtom)
  // 蒙层点击
  const handleMaskClick = () => {
    setTaskVisible(false)
  }

  // 领取奖励
  const onReceive = async (item) => {
    console.log('----->奖励领取', item)
    const { task_id } = item || {}
    try {
      const res = await $taskReceive({
        task_id,
      })
      console.log('发放的奖励：', res)
      setBuyRewardsList(res)
      setRewardsDialogVisible(true)

      // 刷新任务接口
      setTimeout(() => {
        getTaskList()
      }, 300)
    } catch (error) {
      return false
    }
  }

  // 完成操作
  const onComplete = (item) => {
    console.log('----onComplete', item)
    const { finishUrl } = item || {}
    linkJump({
      link: finishUrl,
    })
  }

  // 任务完成接口调用
  const taskComplete = async (item) => {
    console.log('任务完成~~')
    const { task_id, taskType } = item || {}
    try {
      await $taskComplete({
        activity_code: ACTIVITY_CODE,
        task_id: task_id,
        task_type: taskType,
      })
    } catch (error) {
      console.log('error:', error)
      return false
    }
  }

  // 特殊任务点击
  const onSpecialTaskClick = (item) => {
    console.log('----->特殊任务点击', item)
    // 如果弹窗是打开的则先关闭掉
    if (taskVisible) {
      setTaskVisible(false)
    }
    // 如果 jumpUrl 是http 开头，则直接跳转，如果不是则做页面滚动
    const { jumpUrl } = item || {}
    if (jumpUrl.startsWith('http')) {
      linkJump({
        link: jumpUrl,
      })
    } else {
      // 滚动到对应的位置并切换到对应的阶段
      setCurrentSelect(parseInt(jumpUrl, 10))
      // const tabDOM = document.getElementById('tabWrapper')

      // -10 是因为离的太近了
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const top = () => {
    return <div className={styles.taskTop}></div>
  }

  useEffect(() => {
    getTaskList()
  }, [])

  return (
    <div className={styles.taskWrapper} id="TaskWrapper">
      <TaskList
        list={taskList}
        topSlot={top()}
        visible={taskVisible}
        // bgColor={bgColor}
        awardType={awardType}
        titleImage={titleImage}
        onReceive={onReceive}
        onComplete={onComplete}
        taskComplete={taskComplete}
        handleMaskClick={handleMaskClick}
        onSpecialTaskClick={onSpecialTaskClick}
      />
    </div>
  )
}

export default Task
