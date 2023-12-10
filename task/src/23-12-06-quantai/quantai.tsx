import { useState } from 'react'
import './style/quantai.css'

function App() {
    const [count, setCount] = useState(48)

    return (
        <>
            <div className="bubble" onClick={() => { setCount(count + 1) }}>
                <div className="text">asdad</div>
            </div>

            <div className="btn">
                {count > 50 ? '50连抽' : '开碎片'}
            </div>
        </>
    )
}

export default App
