// 任务状态
export const TASK_STATE = {
  NOT_COMPLETED: 1,
  WAITING: 2,
  COMPLETED: 3,
  NOT_AVAILABLE: 4,
  END: 5,
}

export const TASK_STATE_BUTTON = {
  [TASK_STATE.NOT_COMPLETED]: 'inComplete',
  [TASK_STATE.WAITING]: 'waiting',
  [TASK_STATE.COMPLETED]: 'completed',
  [TASK_STATE.NOT_AVAILABLE]: 'disabled',
}

// 任务
export const TASK_TYPE = {
  WATCH: 'watch', // 观看视频
  SHARE: 'share', // 分享任务
  WATCH_COUNT_DOWN: 'watch_count_down', // 倒计时任务
  CLICK: 'click', // 点击跳转
  WATCH_2: 'WATCH2', // 总观影任务,
  DLC: 'dlc-task-wrap', // dlc 任务类型
  ARCHIVE: 'archive', // 话题投稿 任务类型
}

export const TASK_STATUS = {
  [TASK_STATE.WAITING]: 1,
  [TASK_STATE.NOT_COMPLETED]: 2,
  [TASK_STATE.COMPLETED]: 3,
  [TASK_STATE.NOT_AVAILABLE]: 4,
  [TASK_STATE.END]: 5,
}
