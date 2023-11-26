import { useState } from 'react'
import TabButton from './TabButton';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/* tab按钮 */}
            <TabButton></TabButton>
        </>
    )
}

export default App
