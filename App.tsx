import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventList from './pages/EventList'
import CreateEvent from './pages/CreateEvent'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <div className="selection:bg-emerald-100 selection:text-emerald-900">
      <style>{`
        input, textarea, select {
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          background-color: #ffffff !important;
          opacity: 1 !important;
          font-weight: bold !important;
        }
        input::placeholder {
          color: #999999 !important;
          -webkit-text-fill-color: #999999 !important;
        }
      `}</style>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/:eventSlug" element={<EventList />} />
          <Route path="/:eventSlug/admin" element={<AdminPanel />} />
          {/* Rota de segurança para quando o link estiver errado */}
          <Route path="*" element={<div className="p-10 text-center font-bold">Página não encontrada. Verifique o link!</div>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
