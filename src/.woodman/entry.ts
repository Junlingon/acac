import React from 'react'
import ReactDOM from 'react-dom'
import Register from './register'

const getErrorBoundary = (name: string) => {
  return class ErrorBoundary extends React.Component<
    {},
    { hasError: boolean }
  > {
    constructor(props: {}) {
      super(props)
      this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
      return { hasError: true }
    }
    componentDidCatch(err: any, errinfo: any) {
      console.error(
        '[platc] fail to render react component => ' + name,
        err,
        errinfo
      )
    }
    render() {
      const { children } = this.props
      const { hasError } = this.state
      if (hasError) return null
      return React.createElement(React.Fragment, null, children)
    }
  }
}
function initialComponent() {
  const configList = (window as any).__initialState['dress-award-list']
  configList.forEach((config: any) => {
    try {
      const nodeId = config.id
      const mountNode = document.getElementById(nodeId) as HTMLDivElement
      if (mountNode) {
        const ErrorBoundary = getErrorBoundary('dress-award-list')
        ReactDOM.render(
          React.createElement(
            ErrorBoundary,
            null,
            React.createElement(Register as any, { ...config, config })
          ),
          mountNode
        )
      }
    } catch (err) {
      console.error('[platc] fail to render dress-award-list.', config.id, err)
      console.error(err.message, err.stack)
    }
  })
}

document.addEventListener('DOMContentLoaded', initialComponent)
