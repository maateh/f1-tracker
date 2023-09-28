import { Suspense, lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import Main from './layouts/Main'

// pages & components
const Homepage = lazy(() => import('./pages/home/Homepage'))
const SchedulePage = lazy(() => import('./pages/schedule/SchedulePage'))
const ScheduleListing = lazy(() => import('./pages/schedule/components/listing/ScheduleListing'))
const ResultsPage = lazy(() => import('./pages/results/ResultsPage'))
const HistoryPage = lazy(() => import('./pages/history/HistoryPage'))
const LapsHistory = lazy(() => import('./pages/history/pages/laps/LapsHistory'))
const PitsHistory = lazy(() => import('./pages/history/pages/pits/PitsHistory'))
const DriversHistory = lazy(() => import('./pages/history/pages/drivers/DriversHistory'))
const DriversListing = lazy(() => import('./pages/history/pages/drivers/components/listing/DriversListing'))
const ConstructorsHistory = lazy(() => import('./pages/history/pages/constructors/ConstructorsHistory'))
const ConstructorsListing = lazy(() => import('./pages/history/pages/constructors/components/listing/ConstructorsListing'))
const CircuitsHistory = lazy(() => import('./pages/history/pages/circuits/CircuitsHistory'))
const CircuitsListing = lazy(() => import('./pages/history/pages/circuits/components/listing/CircuitsListing'))
const DriverProfile = lazy(() => import('./pages/profile/pages/driver/DriverProfile'))
const ConstructorProfile = lazy(() => import('./pages/profile/pages/constructor/ConstructorProfile'))
const CircuitProfile = lazy(() => import('./pages/profile/pages/circuit/CircuitProfile'))

const Loader = lazy(() => import('./components/loader/Loader'))
const NotFound = lazy(() => import('./components/error/NotFound'))

// loaders
import { resultsLoader } from './pages/results/loader/ResultsLoader'
import { lapsLoader } from './pages/history/pages/laps/loader/LapsLoader'
import { pitsLoader } from './pages/history/pages/pits/loader/PitsLoader'
import CircularProgressIcon from '@mui/material/CircularProgress'

// skeletons
import PageSkeleton from './components/skeletons/page/PageSkeleton'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <Homepage />
          </Suspense>
        )
      },
      {
        path: "schedule",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <SchedulePage />
          </Suspense>
        ),
        children: [
          {
            path: ":year",
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <ScheduleListing />
              </Suspense>
            )
          },
          {
            path: "*",
            element: <Navigate to="./" />
          }
        ]
      },
      {
        path: "results",
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ResultsPage />
          </Suspense>
        ),
        children: [
          {
            path: ":year/:standings/:id",
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <Loader />
              </Suspense>
            ),
            loader: resultsLoader
          },
          {
            path: ":year/:standings/:id/:session",
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <Loader />
              </Suspense>
            ),
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
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <HistoryPage />
          </Suspense>
        ),
        children: [
          {
            path: "laps",
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <LapsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year/:round/:driverId",
                element: (
                  <Suspense fallback={<CircularProgressIcon />}>
                    <Loader />
                  </Suspense>
                ),
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
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <PitsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year/:round/:driverId",
                element: (
                  <Suspense fallback={<CircularProgressIcon />}>
                    <Loader />
                  </Suspense>
                ),
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
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <DriversHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year",
                element: (
                  <Suspense fallback={<CircularProgressIcon />}>
                    <DriversListing />
                  </Suspense>
                )
              }
            ]
          },
          {
            path: "constructors",
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <ConstructorsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year",
                element: (
                  <Suspense fallback={<CircularProgressIcon />}>
                    <ConstructorsListing />
                  </Suspense>
                )
              }
            ]
          },
          {
            path: "circuits",
            element: (
              <Suspense fallback={<CircularProgressIcon />}>
                <CircuitsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year",
                element: (
                  <Suspense fallback={<CircularProgressIcon />}>
                    <CircuitsListing />
                  </Suspense>
                )
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
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <DriverProfile />
              </Suspense>
            )
          },
          {
            path: "constructor/:id",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <ConstructorProfile />
              </Suspense>
            )
          },
          {
            path: "circuit/:id",
            element: (
              <Suspense fallback={<PageSkeleton />}>
                <CircuitProfile />
              </Suspense>
            )
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
