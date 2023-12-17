import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'

import App from '@client/App'

const rootElement = document.getElementById('root') as HTMLElement

const root = createRoot(rootElement)
root.render(<App />)

if (module.hot) {
  module.hot.accept()
}
