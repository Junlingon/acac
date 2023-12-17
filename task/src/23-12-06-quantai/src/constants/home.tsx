export const STAGE_CONFIG = [
  {
    step: 1,
    title: '第一赛段',
    titleImage: 'https://activity.hdslb.com/blackboard/static/jVgmkp8b6l.png',
  },
  {
    step: 2,
    title: '第二赛段',
    titleImage: 'https://activity.hdslb.com/blackboard/static/rVBXqrndl4.png',
  },
  {
    step: 3,
    title: '第三赛段',
    titleImage: 'https://activity.hdslb.com/blackboard/static/PHk5p6xcpd.png',
  },
]

export const protocolList = [
  {
    name: '大会员服务协议',
    link: 'https://www.bilibili.com/blackboard/big-protocol.html',
  },
  {
    name: '大会员自动续费协议',
    link: 'https://www.bilibili.com/blackboard/big-protocol.html#monthly',
  },
]

export const CHECK_BOX = {
  CHECKED_URL:
    'https://i0.hdslb.com/bfs/activity-plat/static/20231207/d3de01ea5b5200083302ca865c89375d/tUAGpIg7RJ.png',
  UNCHECKED_URL:
    'https://i0.hdslb.com/bfs/activity-plat/static/20231206/d3de01ea5b5200083302ca865c89375d/w05jW7lvP9.png',
}

export const CHECK_BOX_BLUE = {
  CHECKED_URL:
    'https://i0.hdslb.com/bfs/activity-plat/static/20231207/d3de01ea5b5200083302ca865c89375d/4AjFNIdDZ5.png',
  UNCHECKED_URL:
    'https://i0.hdslb.com/bfs/activity-plat/static/20231207/d3de01ea5b5200083302ca865c89375d/unqLkWRuS6.png',
}

export const dlcUrl =
  'https://www.bilibili.com/h5/mall/digital-card/home?-Abrowser=live&act_id=246&hybrid_set_header=2&lottery_id=198&f_source=ogv&from=act.pay'

export const BUY_TYPE = {
  NORMAL: 'NORMAL',
  SUPER: 'SUPER',
}

export const BUY_DURATION = {
  YEAR: 12,
  SEASON: 3,
  MONTH: 1,
}

const AWARD = {
  DLC: {
    image:
      'https://i0.hdslb.com/bfs/activity-plat/static/20231211/55e8b7702babcaa954cb4a844e5ce05e/ZFsLQaJhPw.png',
    btn: 'https://i0.hdslb.com/bfs/activity-plat/static/20231211/55e8b7702babcaa954cb4a844e5ce05e/foVHUwbQ4H.png',
    class: 'dlc',
    bigBtn: '',
  },
  FRAGMENT: {
    image:
      'https://i0.hdslb.com/bfs/activity-plat/static/20231211/55e8b7702babcaa954cb4a844e5ce05e/BcWUn5ZHzY.png',
    btn: 'https://i0.hdslb.com/bfs/activity-plat/static/20231211/55e8b7702babcaa954cb4a844e5ce05e/YECGwuTF4Z.png',
    bigBtn:
      'https://i0.hdslb.com/bfs/activity-plat/static/20231211/55e8b7702babcaa954cb4a844e5ce05e/aQEDwWEqiM.png',
    class: 'fragment',
  },
}

export const PURCHASE_AWARD = {
  [BUY_DURATION.YEAR]: [
    {
      ...AWARD['DLC'],
      name: '《命运拳台》收藏集2抽',
    },
    {
      ...AWARD['FRAGMENT'],
      name: '随机角色记忆碎片30枚',
    },
  ],
  [BUY_DURATION.SEASON]: [
    {
      ...AWARD['DLC'],
      name: '《命运拳台》收藏集1抽',
    },
    {
      ...AWARD['FRAGMENT'],
      name: '随机角色记忆碎片9枚',
    },
  ],
  [BUY_DURATION.MONTH]: [
    {
      ...AWARD['FRAGMENT'],
      name: '随机角色记忆碎片3枚',
    },
  ],
}
