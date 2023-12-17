import setShareContent, {
  openShareScene,
  closeShareScene,
} from '@bilibili/fe-quick-share'
import drawImage from '@bilibili/generator-posters'
import { ShareConfig, GenerateImageConfig } from '@model/common'
import { currentEnv } from '@bilibili/h5-utils'
import {
  shareUrl,
  title,
  avatar,
  description,
  editContent,
  shareId,
  shareOrigin,
  business,
  pageId,
  shareScene,
} from '@constants/share'

// 设置分享信息
export const setShareContentFunc = () => {
  setShareContent({
    business,
    shareScene,
    pageId,
    defineBar: false,
    shareUrls: [shareUrl],
    share2Config: {
      oid: shareUrl,
      sid: '',
    },
    shareInfo: {
      DEFAULT: {
        type: 'link',
        title: title,
        url: shareUrl,
        desc: description,
        avatar: avatar,
        imageUrl: avatar,
      },
    },
  })
}

// 初始化导航
export const setDefineBar = ({ leftBarsActionFunc, rightBarsActionFunc }) => {
  setShareContent({
    business,
    shareScene,
    pageId,
    debug: true,
    defineBar: true,
    shareUrls: [shareUrl],
    share2Config: {
      oid: shareUrl,
      sid: '',
    },
    shareInfo: {
      DEFAULT: {
        type: 'link',
        title: title,
        url: shareUrl,
        desc: description,
        avatar: avatar,
        imageUrl: avatar,
      },
    },
    bars: {
      leftBars: [
        {
          action: () => {
            leftBarsActionFunc && leftBarsActionFunc()
          },
          icon: 'https://activity.hdslb.com/blackboard/static/No79Y1Pdci.png',
        },
      ],
      rightBars: [
        {
          action: () => {
            rightBarsActionFunc && rightBarsActionFunc()
            const { origin, pathname } = location || {}
            const shareUrl = `${origin}${pathname}?navhide=1&msource=dhlfx`
            openSharePanel({
              title,
              description,
              url: shareUrl,
              avatar: avatar,
              editContent: editContent,
              shareConfig: {
                nodeList: [],
                width: 100,
                height: 100,
              },
              shareImageUrl: avatar,
              callback: () => {
                console.log('callback')
              },
              share_id: shareId,
              share_origin: shareOrigin,
            })
          },
          icon: 'https://activity.hdslb.com/blackboard/static/vbNODVYw9A.png',
        },
      ],
    },
  })
}

export function openSharePanel(config: ShareConfig) {
  openShareScene({
    business,
    pageId,
    shareScene,
    shareUrls: [config.url],
    defineBar: true,
    share2Config: {
      share_id: config.share_id || shareId,
      share_origin: config.share_origin || shareOrigin,
      oid: config.url, // 分享对象id, 配合share_id使用, 对于h5, 传递的是url
      sid: '', // 辅助id, 当oid无法定位的时候, 使用oid+sid来关联
    },
    shareInfo: {
      DEFAULT: {
        type: config.type || 'link',
        title: config.title || title,
        url: config.url,
        desc: config.desc || description,
        avatar: config.avatar || avatar,
        imageUrl: config.imageUrl || avatar,
      },
      BILI_DYNAMIC: {
        description: config.desc || description,
        editContent: config.editContent || editContent,
        newTopicId: 1134286,
        pictureList: [
          {
            width: 636,
            height: 848,
            size: 1000,
            src: config.posterUrl,
          },
        ],
      },
    },
    onClick: () => {
      closeShareScene && closeShareScene()
      config.onClick && config.onClick()
    },
    onSuccess: () => {
      config.onSuccuss && config.onSuccuss()
    },
  })
}

/**
 * 生成分享图片
 * @param {*} shareConfig 分享配置
 * @returns
 */
export async function generateShareImage(shareConfig: GenerateImageConfig) {
  const { width, height, nodeList } = shareConfig || {}
  try {
    const data = await drawImage([
      {
        width: width,
        height: height,
        mode: 'nodeList',
        imgType: 'url',
        scale: 1,
        nodeList: nodeList,
      },
    ])
    // 生成结果位
    if (data.length && data.find((x: string) => x.indexOf('base64') !== -1)) {
      return
    }
    let url = data[0]
    url = currentEnv === 'pre' ? url.replace('://', '://pre-') : url
    return url
  } catch (err) {
    console.log('generateShareImage err', err)
    return ''
  }
}
