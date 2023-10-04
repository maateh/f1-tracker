import { Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

// components
import Navbar from "../components/navbar/Navbar"
import ApplicationErrorFallback from "../components/error/ApplicationErrorFallback"

const Main = () => {
  return (
    <ErrorBoundary FallbackComponent={ApplicationErrorFallback}>
      <Navbar />
      <Outlet />
    </ErrorBoundary>
  )
}

export default Main
