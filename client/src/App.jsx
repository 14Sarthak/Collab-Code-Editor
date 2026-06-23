import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Session from './pages/session'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session/:roomId" element={<Session />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App