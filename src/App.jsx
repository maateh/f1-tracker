import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages
import Home from './pages/home/Home'
import Calendar from './pages/calendar/Calendar'
import Results from './pages/results/Results'
import History from './pages/history/History'

// components
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/calendar'
          element={<Calendar />}
        />
        <Route
          path='/results'
          element={<Results />}
        />
        <Route
          path='/history'
          element={<History />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
