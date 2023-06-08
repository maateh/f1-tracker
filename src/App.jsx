import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages
import Home from './pages/home/Home'
import Schedule from './pages/schedule/Schedule'
import Results from './pages/results/Results'
import History from './pages/history/History'

// components
import Navbar from './components/Navbar'

// context
import { ScheduleContextProvider } from './context/ScheduleContext'
import { WeekendContextProvider } from './context/WeekendContext'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <WeekendContextProvider>
              <Home />
            </WeekendContextProvider>
          }
        />
        <Route
          path='/schedule'
          element={
            <ScheduleContextProvider>
              <Schedule />
            </ScheduleContextProvider>
          }
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
