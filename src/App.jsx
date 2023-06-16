import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages
import Home from './pages/home/Home'
import Schedule from './pages/schedule/Schedule'
import Results from './pages/results/Results'
import Seasons from './pages/results/listing/Seasons'
import Weekend from './pages/results/listing/Weekend'
import WeekendSession from './pages/results/listing/WeekendSession'
import History from './pages/history/History'
import Error from './pages/error/Error'

// context
import { WeekendContextProvider } from './context/WeekendContext'
import { ScheduleContextProvider } from './context/ScheduleContext'
import { ResultsFilterContextProvider } from './context/ResultsFilterContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <WeekendContextProvider>
            <Home />
          </WeekendContextProvider>
        )
      },
      {
        path: "schedule",
        element: (
          <ScheduleContextProvider>
            <Schedule />
          </ScheduleContextProvider>
        )
      },
      {
        path: "results",
        element: (
          <ResultsFilterContextProvider>
            <Results />
          </ResultsFilterContextProvider>
        ),
        children: [
          {
            path: ":year/all/summary",
            element: <Seasons />
          },
          {
            path: ":year/:weekend/summary",
            element: <Weekend />
          },
          {
            path: ":year/:weekend/:session",
            element: <WeekendSession />
          }
        ]
      },
      {
        path: "history",
        element: <History />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
