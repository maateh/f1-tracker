import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages & components
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'

import ResultsPage from './pages/results/ResultsPage'
import ResultsListing from './pages/results/content/listing/ResultsListing'

import HistoryPage from './pages/history/HistoryPage'
import LapsHistory from './pages/history/content/laps/LapsHistory'
import DriversHistory from './pages/history/content/drivers/DriversHistory'
import ConstructorsHistory from './pages/history/content/constructors/ConstructorsHistory'
import PitsHistory from './pages/history/content/pits/PitsHistory'

import NotFound from './components/error/NotFound'

// loaders
import { seasonLoader } from './pages/results/content/listing/loader/races/SeasonLoader'
import { seasonSessionLoader } from './pages/results/content/listing/loader/races/SeasonSessionLoader'
import { weekendLoader } from './pages/results/content/listing/loader/races/WeekendLoader'
import { weekendSessionLoader } from './pages/results/content/listing/loader/races/WeekendSessionLoader'
import { driversLoader } from './pages/results/content/listing/loader/drivers/DriversLoader'
import { driverLoader } from './pages/results/content/listing/loader/drivers/DriverLoader'
import { constructorsLoader } from './pages/results/content/listing/loader/constructors/ConstructorsLoader'
import { constructorLoader } from './pages/results/content/listing/loader/constructors/ConstructorLoader'

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
            path: ":year/rounds/all",
            element: <ResultsListing />,
            loader: seasonLoader
          },
          {
            path: ":year/rounds/all/session/:session", // :session -> summary, qualifying, race, sprint
            element: <ResultsListing />,
            loader: seasonSessionLoader
          },
          {
            path: ":year/rounds/:id",
            element: <ResultsListing />,
            loader: weekendLoader
          },
          {
            path: ":year/rounds/:id/session/:session", // :session -> summary, qualifying, race, sprint
            element: <ResultsListing />,
            loader: weekendSessionLoader
          },
          {
            path: ":year/drivers/all",
            element: <ResultsListing />,
            loader: driversLoader
          },
          {
            path: ":year/drivers/:id",
            element: <ResultsListing />,
            loader: driverLoader
          },
          {
            path: ":year/constructors/all",
            element: <ResultsListing />,
            loader: constructorsLoader
          },
          {
            path: ":year/constructors/:id",
            element: <ResultsListing />,
            loader: constructorLoader
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

const App = () => <RouterProvider router={router} />

export default App
