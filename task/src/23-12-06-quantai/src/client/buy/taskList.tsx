import React, { useEffect, useState } from 'react'

import styles from './taskList.module.less'
import { TASK_STATE_BUTTON, TASK_TYPE, TASK_STATE } from '@constants/task'
import { watch, linkJump } from '@bilibili/utils-leona'
import { useDebounceFn } from 'ahooks'
import { useExposure } from '@bilibili/hooks-leona'
import { report } from '@bilibili/ogv-stars'
import { checkStatus } from '@utils/common'
import { useAtom } from 'jotai'
import { statusAtom, userInfoAtom } from '@jotai/common'
import { openSharePanel } from '@utils/share'
import {
  title,
  description,
  avatar,
  editContent,
  shareId,
} from '@constants/share'
interface ImageObject {
  url: string
  width: number
  height: number
}

interface ListItem {
  bgColor?: string
  titleFront: string
  descFront: string
  title: string
  desc: string
  titleColor: string
  descColor: string
  state: number
  finished_count: number
  total_count: number
  icon: string
  stateDesc: string
  taskType: string
  task_id: number
  clickConfig: any
  watchConfig: any
  watch2Config: any
  watchCountDownConfig: any
  dlcTaskWrapConfig: any
  completed: ImageObject
  inComplete: ImageObject
  disabled: ImageObject
  waiting: ImageObject
  jumpUrl: string
}

interface TaskList {
  titleImage: string
  visible: boolean
  bgColor?: string
  itemColor?: string
  list: ListItem[]
  awardType: 'Dialog' | 'Toast' | 'None'
  handleMaskClick: () => void
  onComplete?: (item: ListItem) => void
  onSpecialTaskClick?: (item: ListItem) => void
  onReceive?: (item: ListItem) => void
  taskComplete?: (item: ListItem) => void
  topSlot: any
  extra?: any
}

/**
 * 该组件仅处理常规任务。点击、观看、倒计时观看方法
 * @param titleImage - 上拉弹窗标题图片
 * @param visible - 是否显示
 * @param bgColor - 上拉弹窗背景色
 * @param list - 列表数据
 * @param awardType - 奖励领取告知方式 'Dialog' | 'Toast' | 'None'
 * @param handleMaskClick - 蒙层点击
 * @param onComplete - 任务完成方法。（可选）没有的话点击完成无响应
 * @param onSpecialTaskClick - 特殊任务点击的函数（需要自己传进来）
 * @param onReceive - 奖励领取方法
 * @param taskComplete - 任务完成方法（告知后端任务完成一般用于点击等）
 * @param topSlot - 上面的插槽
 * @returns
 */
const TaskList = (props: TaskList) => {
  const [updateItem] = useExposure({})
  const [status] = useAtom(statusAtom)
  const [userInfo] = useAtom(userInfoAtom)
  const [refList, setRefList] = useState<React.RefObject<any>[]>([])
  const [list, setList] = useState(props.list)
  const [expand, setExpand] = useState(false)

  // 任务点击 debounce
  const { run } = useDebounceFn(
    (item) => {
      handleTaskButtonClick(item)
    },
    {
      wait: 300,
    }
  )

  // 点击埋点
  const reportClick = (name: string, { task_id }: any) => {
    const other = props.extra || {}
    report.reportWebClick(name, {
      taskId: task_id,
      ...other,
    })
  }

  /**
   * 仅处理
   * @param item
   *
   */
  const handleTaskButtonClick = async (item: ListItem) => {
    //
    try {
      await checkStatus({
        isLogin: userInfo.isLogin,
        status: status,
      })
      const { state, task_id } = item || {}

      switch (state) {
        case TASK_STATE.NOT_COMPLETED:
          // 判断如果探索次数为 0 就提示今日探索次数不够了
          doTask(item)
          reportClick('task_get_click', {
            task_id,
          })

          break
        case TASK_STATE.WAITING:
          // 待领取状态的话，如果需要领取的话，那么执行领取方法
          props.onReceive?.(item)
          reportClick('task_receive_click', {
            task_id,
          })
          break
        case TASK_STATE.COMPLETED:
          // 已完成方法执行，如果有的话
          props.onComplete?.(item)
          reportClick('task_complete_click', {
            task_id,
          })
          return false
        default:
          break
      }
    } catch (error) {
      return false
    }
  }

  /**
   * 做任务
   * @param item
   */
  const doTask = (item: ListItem) => {
    const { taskType } = item || {}
    switch (taskType) {
      case TASK_TYPE.CLICK:
        taskJump(item)
        break
      case TASK_TYPE.ARCHIVE:
        linkJump({
          link: item.jumpUrl,
        })
        break
      case TASK_TYPE.WATCH:
        taskWatch(item)
        break
      case TASK_TYPE.WATCH_COUNT_DOWN:
      case TASK_TYPE.WATCH_2:
        taskWatchCountdown(item)
      case TASK_TYPE.DLC:
        toDLC(item)
        break
      case TASK_TYPE.SHARE:
        openSharePanel({
          title,
          description,
          avatar,
          editContent,
          share_id: shareId,
          onClick: () => {
            props.taskComplete(item)
          },
        })
        break
      default:
        // 其他的任务类型
        console.log('其他任务类型点击')
        props.onSpecialTaskClick?.(item)
        break
    }
  }

  // dlc 类型的任务跳转
  const toDLC = (item) => {
    const { jumpUrl } = item || {}
    jumpUrl &&
      linkJump({
        link: jumpUrl,
      })
  }

  /**
   * 跳转类型的任务
   * @param item 点击该项的内容
   */
  const taskJump = (item: ListItem) => {
    // 完成
    props.taskComplete?.(item)
    const { clickConfig } = item || {}
    const { url } = clickConfig || {}
    url &&
      linkJump({
        link: url,
      })
  }

  // 观看任务
  const taskWatch = (item: ListItem) => {
    const { watchConfig } = item || {}
    watch(watchConfig)
  }

  // 倒计时观看任务
  const taskWatchCountdown = (item: ListItem) => {
    const { task_id } = item || {}
    const query = {
      paramType: 'watch_task',
      task_id: task_id,
    }

    const requestParam = `activity_request_params=${encodeURIComponent(
      JSON.stringify(query)
    )}`
    const { watchCountDownConfig, watch2Config } = item || {}
    watch(watchCountDownConfig || watch2Config, requestParam)
  }

  //展开按钮
  const isExpand = () => {
    setExpand(!expand)
    if (!expand) {
      setList(props.list)
    } else {
      setList(props.list.slice(0, 1))
    }
  }

  // 任务曝光
  useEffect(() => {
    if (props.visible) {
      const listRef: React.RefObject<any>[] = props.list.map(() =>
        React.createRef()
      )
      setRefList(listRef)
      const other = props.extra || {}
      const params = props.list.map((item) => {
        const { task_id, state } = item || {}
        let eventName = 'task_get_show'
        switch (state) {
          case TASK_STATE.NOT_COMPLETED:
            eventName = 'task_get_show'
            break
          case TASK_STATE.WAITING:
            eventName = 'task_receive_show'
            break
          case TASK_STATE.COMPLETED:
            eventName = 'task_complete_show'
            break
          default:
            break
        }
        return {
          eventName: eventName,
          data: {
            taskId: task_id,
            ...other,
          },
        }
      })
      updateItem({
        doms: listRef,
        logParams: params,
      })
    }
  }, [props.visible])

  useEffect(() => {
    setList(props.list.slice(0, 1))
    setExpand(false)
  }, [props])

  return (
    <>
      <ul
        className={styles.taskList}
        style={{ backgroundColor: `${props?.bgColor}` }}
      >
        {list.map((item, index) => {
          return (
            <li
              className={styles.taskItem}
              key={index}
              ref={refList[index]}
              style={{ backgroundColor: `${props?.itemColor}` }}
            >
              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${item.icon})` }}
              ></div>

              <div className={styles.contentWrapper}>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.desc}>
                  {item.desc}{' '}
                  {item.taskType === TASK_TYPE.DLC
                    ? `(${item.dlcTaskWrapConfig.ownedCount} /
                   ${item.dlcTaskWrapConfig.requiredCount})`
                    : ''}
                </p>
              </div>

              <div
                className={`${styles.button} ${
                  item.state === 2 ? styles.receive : ''
                }`}
                onClick={() => {
                  run(item)
                }}
              >
                <img src={item?.stateDesc} alt="" />
              </div>
            </li>
          )
        })}
      </ul>
      <div className={`${styles.showMore}`} onClick={isExpand}>
        {list.length > 1 ? (
          <>
            <div className={`${styles.icon} ${styles.collapse}`}></div>
            <div className={styles.text}>收起</div>
          </>
        ) : (
          <>
            <div className={`${styles.icon}`}></div>
            <div className={styles.text}>点击查看更多任务</div>
          </>
        )}
      </div>
    </>
  )
}

export default TaskList
