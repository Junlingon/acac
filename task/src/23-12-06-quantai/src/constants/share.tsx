/***
 * shareUrl： 分享url
 * title: 标题（短文案,微信、微博、qq 等渠道均显示）
 * description: 描述（长文案,微信、微博、qq 等渠道均显示）
 * editContent: 动态文案：显示到 bilibili 动态的文案
 * avatar： 分享方图（正方形图片：一般在微信分享卡片上）
 * shareId + shareOrigin : 用于降级
 */
const { origin, pathname } = location || {}
export const shareUrl = `${origin}${pathname}?navhide=1&msource=homeShare`
export const title = '命运拳台计划'
export const description = '集碎片拼阿肝，得角色动态典藏卡！'
export const avatar =
  'https://i0.hdslb.com/bfs/activity-plat/static/20231211/b88c479976ac33162f658d12959a2111/WYEtTYiT4G.jpg'
export const editContent =
  '#命运拳台不向命运低头#我正在合成命运拳台记忆碎片，旁友们快来加入我~解锁角色动态典藏卡'
export const shareId = '666.145.0.0'
export const shareOrigin = ''
export const business = 'OGV'
export const pageId = 'quantai-2023'
export const shareScene = 'top-right-share'
