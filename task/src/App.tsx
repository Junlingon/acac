import { useState } from 'react'
import './App.css'
import Scj from './23-11-25-收藏集榜单/index';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Scj></Scj>
    </>
  )
}

export default App
