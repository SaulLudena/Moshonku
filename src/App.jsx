import { useEffect } from 'react'
import './App.css'
import Header from './components/header'
import Left_side from './components/left_side'
import Right_side from './components/right_side'

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault()
      event.returnValue = '' // Necesario para que el mensaje de confirmación se muestre
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  return (
    <div className="w-[90%] m-auto max-w-[1700px] h-screen ">
      <Header />
      <div className="grid grid-cols-12  h-full ">
        <Left_side />
        <Right_side />
      </div>
    </div>
  )
}

export default App
