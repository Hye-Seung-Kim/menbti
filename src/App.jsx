import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-pink-200 text-gray-800 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Tailwind 작동 테스트</h1>
      <button
        onClick={() => setCount((count) => count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        count is {count}
      </button>
      <p className="mt-4">이 화면이 분홍색이면 Tailwind CSS 적용 성공!</p>
    </div>
  )
}

export default App
