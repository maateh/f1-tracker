import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages & components
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'

import ResultsPage from './pages/results/ResultsPage'
import ResultsListing from './components/listing/Listing'

import HistoryPage from './pages/history/HistoryPage'
import HistoryListing from './components/listing/Listing'
import LapsHistory from './pages/history/content/laps/LapsHistory'
import DriversHistory from './pages/history/content/drivers/DriversHistory'
import ConstructorsHistory from './pages/history/content/constructors/ConstructorsHistory'
import PitsHistory from './pages/history/content/pits/PitsHistory'

import NotFound from './components/error/NotFound'

// results loaders
import seasonLoader from './pages/results/loader/rounds/SeasonLoader'
import weekendRaceLoader from './pages/results/loader/rounds/WeekendRaceLoader'
import weekendQualifyingLoader from './pages/results/loader/rounds/WeekendQualifyingLoader'
import driverStandingsLoader from './pages/results/loader/drivers/DriverStandingsLoader'
import driverRacesLoader from './pages/results/loader/drivers/DriverRacesLoader'
import driverQualifyingsLoader from './pages/results/loader/drivers/DriverQualifyingsLoader'
import constructorStandingsLoader from './pages/results/loader/constructors/ConstructorStandingsLoader'
import constructorRacesLoader from './pages/results/loader/constructors/ConstructorRacesLoader'

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
            // Driver Races Results
            path: ":year/drivers/:id/race",
            element: <ResultsListing />,
            loader: driverRacesLoader
          },
          {
            // Driver Qualifyings Results
            path: ":year/drivers/:id/qualifying",
            element: <ResultsListing />,
            loader: driverQualifyingsLoader
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
            element: <LapsHistory />,
            children: [
              {
                path: ":year/:round",
                // loader: ,
                element: <HistoryListing />
              },
              {
                path: ":year/:round/:driverId",
                // loader: ,
                element: <HistoryListing />
              },
            ]
          },
          {
            path: "pitstops",
            element: <PitsHistory />,
            children: [
              {
                path: ":year/:round",
                // loader: ,
                element: <HistoryListing /> 
              },
              {
                path: ":year/:round/:id", // :id -> driver/constructor
                // loader: ,
                element: <HistoryListing /> 
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
