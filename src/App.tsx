import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EventList from './pages/EventList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:eventSlug" element={<EventList />} />
      </Routes>
    </Router>
  )
}

export default App
