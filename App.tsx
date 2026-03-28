import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
        }
      `}</style>
      <Router>
        <Routes>
          {/* 1. Página Inicial */}
          <Route path="/" element={<Home />} />
          
          {/* 2. Página de Criação */}
          <Route path="/create" element={<CreateEvent />} />
          
          {/* 3. Painel de Administração (Tem que vir ANTES da lista comum) */}
          <Route path="/:eventSlug/admin" element={<AdminPanel />} />
          
          {/* 4. Lista Pública do Evento */}
          <Route path="/:eventSlug" element={<EventList />} />

          {/* 5. Caso o link esteja errado, volta para a Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
