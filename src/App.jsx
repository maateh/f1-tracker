import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages & components
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'
import ResultsPage from './pages/results/ResultsPage'
import HistoryPage from './pages/history/HistoryPage'
import LapsHistory from './pages/history/components/laps/LapsHistory'
import PitsHistory from './pages/history/components/pits/PitsHistory'
import DriversHistory from './pages/history/components/drivers/DriversHistory'
import ConstructorsHistory from './pages/history/components/constructors/ConstructorsHistory'

import Loader from './components/loader/Loader'
import NotFound from './components/error/NotFound'

// loaders
import { scheduleLoader } from './pages/schedule/loader/ScheduleLoader'
import { resultsLoader } from './pages/results/loader/ResultsLoader'
import { lapsLoader } from './pages/history/components/laps/loader/LapsLoader'
import { pitsLoader } from './pages/history/components/pits/loader/PitsLoader'

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
        element: <SchedulePage />,
        children: [
          {
            path: ":year",
            element: <Loader />,
            loader: scheduleLoader
          },
          {
            path: "*",
            element: <Navigate to="./" />
          }
        ]
      },
      {
        path: "results",
        element: <ResultsPage />,
        children: [
          {
            path: ":year/:standings/:id",
            element: <Loader />,
            loader: resultsLoader
          },
          {
            path: ":year/:standings/:id/:session",
            element: <Loader />,
            loader: resultsLoader
          },
          {
            path: "*",
            element: <Navigate to="./" />
          }
        ],
      },
      {
        path: "history",
        element: <HistoryPage />,
        children: [
          {
            path: "laps",
            element: <LapsHistory />,
            children: [
              {
                path: ":year/:round/:driverId",
                element: <Loader />,
                loader: lapsLoader
              },
              {
                path: "*",
                element: <Navigate to="./" />
              }
            ]
          },
          {
            path: "pits",
            element: <PitsHistory />,
            children: [
              {
                path: ":year/:round/:driverId",
                element: <Loader />,
                loader: pitsLoader
              },
              {
                path: "*",
                element: <Navigate to="./" />
              }
            ]
          },
          {
            path: "drivers",
            element: <DriversHistory />
          },
          {
            path: "constructors",
            element: <ConstructorsHistory />
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

const App = () => <RouterProvider router={router} />

export default App
