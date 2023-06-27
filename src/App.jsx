import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'
import ResultsPage from './pages/results/ResultsPage'
import Seasons from './pages/results/content/listing/seasons/Seasons'
import Weekend from './pages/results/content/listing/Weekend'
import WeekendSession from './pages/results/content/listing/WeekendSession'
import HistoryPage from './pages/history/HistoryPage'
import LapsHistory from './pages/history/content/laps/LapsHistory'
import DriversHistory from './pages/history/content/drivers/DriversHistory'
import ConstructorsHistory from './pages/history/content/constructors/ConstructorsHistory'
import PitsHistory from './pages/history/content/pits/PitsHistory'
import NotFound from './pages/error/NotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "schedule",
        element: <SchedulePage />
      },
      {
        path: "results",
        element: <ResultsPage />,
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
        element: <HistoryPage />,
        children: [
          {
            path: "laps",
            element: <LapsHistory />
          },
          {
            path: "drivers",
            element: <DriversHistory />
          },
          {
            path: "constructors",
            element: <ConstructorsHistory />
          },
          {
            path: "pits",
            element: <PitsHistory />
          },
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
