import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventList from './pages/EventList'
import CreateEvent from './pages/CreateEvent'

function App() {
  // HMR test comment
  return (
    <div className="selection:bg-emerald-100 selection:text-emerald-900">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/:eventSlug" element={<EventList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
