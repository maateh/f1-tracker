import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages
import Homepage from './pages/home/Homepage'
import SchedulePage from './pages/schedule/SchedulePage'
import ResultsPage from './pages/results/ResultsPage'
import SeasonListing from './pages/results/content/listing/season/SeasonListing'
import SeasonSessionListing from './pages/results/content/listing/season-session/SeasonSessionListing'
import WeekendListing from './pages/results/content/listing/weekend/WeekendListing'
import WeekendSessionListing from './pages/results/content/listing/weekend-session/WeekendSessionListing'
import HistoryPage from './pages/history/HistoryPage'
import LapsHistory from './pages/history/content/laps/LapsHistory'
import DriversHistory from './pages/history/content/drivers/DriversHistory'
import ConstructorsHistory from './pages/history/content/constructors/ConstructorsHistory'
import PitsHistory from './pages/history/content/pits/PitsHistory'
import NotFound from './pages/error/NotFound'

// context
import { SeasonListingContextProvider } from './pages/results/content/listing/season/context/SeasonListingContext'
import { SeasonSessionListingContextProvider } from './pages/results/content/listing/season-session/context/SeasonSessionListingContext'
import { WeekendListingContextProvider } from './pages/results/content/listing/weekend/context/WeekendListingContext'
import { WeekendSessionListingContextProvider } from './pages/results/content/listing/weekend-session/context/WeekendSessionListingContext'

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
            element:
              <SeasonListingContextProvider>
                <SeasonListing />
              </SeasonListingContextProvider>
          },
          {
            path: ":year/all/:session",
            element: 
              <SeasonSessionListingContextProvider>
                <SeasonSessionListing />
              </SeasonSessionListingContextProvider>
          },
          {
            path: ":year/:weekend/summary",
            element: 
              <WeekendListingContextProvider>
                <WeekendListing />
              </WeekendListingContextProvider>
          },
          {
            path: ":year/:weekend/:session",
            element: 
              <WeekendSessionListingContextProvider>
                <WeekendSessionListing />
              </WeekendSessionListingContextProvider>
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
