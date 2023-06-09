import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages
import Home from './pages/home/Home'
import Schedule from './pages/schedule/Schedule'
import Results from './pages/results/Results'
import History from './pages/history/History'

// components
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/schedule'
          element={<Schedule />}
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
