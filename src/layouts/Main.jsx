import { Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

// components
import Navbar from "../components/navbar/Navbar"
import ErrorFallback from "../components/error/ErrorFallback"

const Main = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Navbar />
      <Outlet />
    </ErrorBoundary>
  )
}

export default Main
