import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'
import ResultsPage from './pages/results/ResultsPage'
import Seasons from './pages/results/content/listing/Seasons'
import Weekend from './pages/results/content/listing/Weekend'
import WeekendSession from './pages/results/content/listing/WeekendSession'
import History from './pages/history/History'
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
        element: <History />
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
