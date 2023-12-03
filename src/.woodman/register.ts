// @ts-ignore
import Component from '../index'

declare global {
  interface IComponentMeta {
    framework: string
    component: any
    tag: string
  }
  interface Window {
    BILI_PLAT_COMPONENTS: {
      [key: string]: IComponentMeta
    }
  }
}

!window.BILI_PLAT_COMPONENTS && (window.BILI_PLAT_COMPONENTS = {})

// disable module exist check for furture hmr
window.BILI_PLAT_COMPONENTS['dress-award-list'] = {
  framework: 'react@16',
  component: Component,
  tag: 'dress-award-list',
}

export default Component
