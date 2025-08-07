import './App.css'
import { Routes, Route } from 'react-router-dom'
import ConfirmPage from './pages/ConfirmPage.tsx'
import ResetPage from './pages/ResetPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/reset" element={<ResetPage />} />
    </Routes>
  )
}

export default App
