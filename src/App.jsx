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

// loaders
import { resultsLoader } from './pages/results/loader/ResultsLoader'

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
            path: ":year/:standings/:id",
            element: <ResultsListing />,
            loader: resultsLoader
          },
          {
            path: ":year/:standings/:id/:session",
            element: <ResultsListing />,
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
