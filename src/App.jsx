import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages & components
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'
import ScheduleListing from './pages/schedule/components/listing/ScheduleListing'
import ResultsPage from './pages/results/ResultsPage'
import HistoryPage from './pages/history/HistoryPage'
import LapsHistory from './pages/history/pages/laps/LapsHistory'
import PitsHistory from './pages/history/pages/pits/PitsHistory'
import DriversHistory from './pages/history/pages/drivers/DriversHistory'
import DriversListing from './pages/history/pages/drivers/components/listing/DriversListing'
import ConstructorsHistory from './pages/history/pages/constructors/ConstructorsHistory'
import ConstructorsListing from './pages/history/pages/constructors/components/listing/ConstructorsListing'
import CircuitsHistory from './pages/history/pages/circuits/CircuitsHistory'
import CircuitsListing from './pages/history/pages/circuits/components/listing/CircuitsListing'
import DriverProfile from './pages/profile/pages/driver/DriverProfile'
import ConstructorProfile from './pages/profile/pages/constructor/ConstructorProfile'
import CircuitProfile from './pages/profile/pages/circuit/CircuitProfile'

import Loader from './components/loader/Loader'
import NotFound from './components/error/NotFound'

// loaders
import { resultsLoader } from './pages/results/loader/ResultsLoader'
import { lapsLoader } from './pages/history/pages/laps/loader/LapsLoader'
import { pitsLoader } from './pages/history/pages/pits/loader/PitsLoader'

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
            element: <ScheduleListing />
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
            element: <DriversHistory />,
            children: [
              {
                path: ":year",
                element: <DriversListing />
              }
            ]
          },
          {
            path: "constructors",
            element: <ConstructorsHistory />,
            children: [
              {
                path: ":year",
                element: <ConstructorsListing />
              }
            ]
          },
          {
            path: "circuits",
            element: <CircuitsHistory />,
            children: [
              {
                path: ":year",
                element: <CircuitsListing />
              }
            ]
          },
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: "driver/:id",
            element: <DriverProfile />
          },
          {
            path: "constructor/:id",
            element: <ConstructorProfile />
          },
          {
            path: "circuit/:id",
            element: <CircuitProfile />
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
