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
import seasonLoader from './pages/results/content/listing/loader/rounds/SeasonLoader'
import weekendRaceLoader from './pages/results/content/listing/loader/rounds/WeekendRaceLoader'
import weekendQualifyingLoader from './pages/results/content/listing/loader/rounds/WeekendQualifyingLoader'
import driverStandingsLoader from './pages/results/content/listing/loader/drivers/DriverStandingsLoader'
import driverRacesLoader from './pages/results/content/listing/loader/drivers/DriverRacesLoader'
import constructorStandingsLoader from './pages/results/content/listing/loader/constructors/ConstructorStandingsLoader'
import constructorRacesLoader from './pages/results/content/listing/loader/constructors/ConstructorRacesLoader'

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
            // Season Results
            path: ":year/rounds/all",
            element: <ResultsListing />,
            loader: seasonLoader
          },
          {
            // Weekend Race Results
            path: ":year/rounds/:id/race",
            element: <ResultsListing />,
            loader: weekendRaceLoader
          },
          {
            // Weekend Qualifying Results
            path: ":year/rounds/:id/qualifying",
            element: <ResultsListing />,
            loader: weekendQualifyingLoader
          },
          {
            // Driver Standings
            path: ":year/drivers/all",
            element: <ResultsListing />,
            loader: driverStandingsLoader
          },
          {
            // Driver Results
            path: ":year/drivers/:id",
            element: <ResultsListing />,
            loader: driverRacesLoader
          },
          {
            // Constructor Standings
            path: ":year/constructors/all",
            element: <ResultsListing />,
            loader: constructorStandingsLoader
          },
          {
            // Constructor Results
            path: ":year/constructors/:id",
            element: <ResultsListing />,
            loader: constructorRacesLoader
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
