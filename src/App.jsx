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

const PageNotFound = lazy(() => import('./components/error/fallbacks/PageNotFound'))

// loaders
const ResultsLoader = lazy(() => import('./pages/results/loader/ResultsLoader'))
const LapsLoader = lazy(() => import('./pages/history/pages/laps/loader/LapsLoader'))
const PitsLoader = lazy(() => import('./pages/history/pages/pits/loader/PitsLoader'))

// skeletons
import PageSkeleton from './components/skeletons/page/PageSkeleton'
import FilterSkeleton from './components/skeletons/filter/FilterSkeleton'
import ListingSkeleton from './components/skeletons/listing/ListingSkeleton'

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
              <Suspense fallback={
                <ListingSkeleton
                  titleRequired={true}
                  cardsCounter={9}
                />
              }>
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
              <Suspense fallback={
                <ListingSkeleton
                  titleRequired={true}
                  cardsCounter={3}
                  tableRequired={true}
                />
              }>
                <ResultsLoader />
              </Suspense>
            )
          },
          {
            path: ":year/:standings/:id/:session",
            element: (
              <Suspense fallback={
                <ListingSkeleton
                  titleRequired={true}
                  cardsCounter={3}
                  tableRequired={true}
                />
              }>
                <ResultsLoader />
              </Suspense>
            )
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
              <Suspense fallback={<FilterSkeleton counter={3} />}>
                <LapsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year/:round/:driverId",
                element: (
                  <Suspense fallback={
                    <ListingSkeleton
                      titleRequired={true}
                      cardsCounter={1}
                      tableRequired={true}
                    />
                  }>
                    <LapsLoader />
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
            path: "pits",
            element: (
              <Suspense fallback={<FilterSkeleton counter={3} />}>
                <PitsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year/:round/:driverId",
                element: (
                  <Suspense fallback={
                    <ListingSkeleton
                      titleRequired={true}
                      cardsCounter={1}
                      tableRequired={true}
                    />
                  }>
                    <PitsLoader />
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
            path: "drivers",
            element: (
              <Suspense fallback={<FilterSkeleton counter={1} />}>
                <DriversHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year",
                element: (
                  <Suspense fallback={
                    <ListingSkeleton
                      titleRequired={true}
                      cardsCounter={9}
                    />
                  }>
                    <DriversListing />
                  </Suspense>
                )
              }
            ]
          },
          {
            path: "constructors",
            element: (
              <Suspense fallback={<FilterSkeleton counter={1} />}>
                <ConstructorsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year",
                element: (
                  <Suspense fallback={
                    <ListingSkeleton
                      titleRequired={true}
                      cardsCounter={9}
                    />
                  }>
                    <ConstructorsListing />
                  </Suspense>
                )
              }
            ]
          },
          {
            path: "circuits",
            element: (
              <Suspense fallback={<FilterSkeleton counter={1} />}>
                <CircuitsHistory />
              </Suspense>
            ),
            children: [
              {
                path: ":year",
                element: (
                  <Suspense fallback={
                    <ListingSkeleton
                      titleRequired={true}
                      cardsCounter={9}
                    />
                  }>
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
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <PageNotFound />
          </Suspense>
        )
      }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
