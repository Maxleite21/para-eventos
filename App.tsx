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
        }
      `}</style>
      <Router>
        <Routes>
          {/* 1. Rota de Criação (Prioridade 1) */}
          <Route path="/create" element={<CreateEvent />} />

          {/* 2. Rota de Administração (Prioridade 2 - PRECISA VIR ANTES DA LISTA) */}
          <Route path="/:eventSlug/admin" element={<AdminPanel />} />

          {/* 3. Rota da Lista Pública (Prioridade 3) */}
          <Route path="/:eventSlug" element={<EventList />} />

          {/* 4. Rota da Home (Prioridade 4) */}
          <Route path="/" element={<Home />} />

          {/* 5. Rota de Erro (Caso nada combine) */}
          <Route path="*" element={
            <div className="p-20 text-center font-bold text-black bg-white min-h-screen">
              Página não encontrada!<br/>
              Endereço tentado: {window.location.pathname}
            </div>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
