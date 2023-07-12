import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'

import ResultsPage from './pages/results/ResultsPage'
import ResultsListing from './pages/results/content/listing/ResultsListing'
import ListingError from './pages/results/content/listing/error/ListingError'

import HistoryPage from './pages/history/HistoryPage'
import LapsHistory from './pages/history/content/laps/LapsHistory'
import DriversHistory from './pages/history/content/drivers/DriversHistory'
import ConstructorsHistory from './pages/history/content/constructors/ConstructorsHistory'
import PitsHistory from './pages/history/content/pits/PitsHistory'

import NotFound from './pages/error/NotFound'

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
            path: ":year/races/all",
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: seasonLoader
          },
          {
            path: ":year/races/all/session/:session", // :session -> summary, qualifying, race, sprint
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: seasonSessionLoader
          },
          {
            path: ":year/races/:id",
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: weekendLoader
          },
          {
            path: ":year/races/:id/session/:session", // :session -> summary, qualifying, race, sprint
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: weekendSessionLoader
          },
          {
            path: ":year/drivers/all",
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: driversLoader
          },
          {
            path: ":year/drivers/:id",
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: driverLoader
          },
          {
            path: ":year/constructors/all",
            element: <ResultsListing />,
            errorElement: <ListingError />,
            loader: constructorsLoader
          },
          {
            path: ":year/constructors/:id",
            element: <ResultsListing />,
            errorElement: <ListingError />,
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

const App = () => {
  return <RouterProvider router={router} />
}

export default App
