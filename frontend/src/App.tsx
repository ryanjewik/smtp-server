// src/App.tsx
import './App.css'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import ConfirmPage from './pages/ConfirmPage'
import ResetPage from './pages/ResetPage'

function HomePage() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-white to-purple-50 py-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce delay-100">⚡</div>
      <div className="absolute top-20 right-20 text-3xl animate-pulse delay-300">🔥</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-bounce delay-500">💧</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-700">🍃</div>
      
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-300 relative z-10">
        {/* Pokéball decoration */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full border-2 border-gray-800"></div>
        </div>
        
        <div className="text-center pt-4 mb-8">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-4xl font-bold text-purple-600 mb-2 font-mono">POKÉMON CENTER</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">SMTP Email Services</h2>
          
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-purple-700 font-medium">💬 "Welcome, trainer! How can I help heal your email needs today?"</p>
            <p className="text-xs text-purple-500 mt-1">- Nurse Joy</p>
          </div>
          
          <div className="bg-gray-100 border-2 border-gray-200 rounded-xl p-3 mb-6">
            <p className="text-xs text-gray-600 font-mono">
              Current Location: <span className="bg-yellow-200 px-2 py-1 rounded font-bold text-gray-800">{location.pathname}</span>
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-700 text-center font-mono uppercase tracking-wide mb-4">
            🎯 Available Services
          </h3>
          
          <Link 
            to="/confirm" 
            className="block w-full group transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 shadow-lg border-3 border-blue-300 hover:shadow-2xl">
              <div className="flex items-center justify-center space-x-3">
                <div className="text-3xl group-hover:animate-bounce">📧</div>
                <div className="text-left">
                  <h4 className="text-white font-bold font-mono text-lg">EMAIL CONFIRMATION</h4>
                  <p className="text-blue-100 text-sm">Heal your unverified email status!</p>
                </div>
                <div className="text-2xl text-white group-hover:animate-pulse">⚡</div>
              </div>
            </div>
          </Link>
          
          <Link 
            to="/reset" 
            className="block w-full group transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-xl p-4 shadow-lg border-3 border-pink-300 hover:shadow-2xl">
              <div className="flex items-center justify-center space-x-3">
                <div className="text-3xl group-hover:animate-bounce">🔐</div>
                <div className="text-left">
                  <h4 className="text-white font-bold font-mono text-lg">PASSWORD RESET</h4>
                  <p className="text-pink-100 text-sm">Restore your password to full HP!</p>
                </div>
                <div className="text-2xl text-white group-hover:animate-pulse">✨</div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-3">
            <p className="text-xs text-yellow-800 font-medium">
              💡 "Remember, trainer: A healthy password is a happy password!"
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">Powered by Pokémon Center Technology™</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-red-400 rounded-full animate-bounce"></div>
        <div className="absolute top-4 right-4 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/confirm" element={<ConfirmPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
