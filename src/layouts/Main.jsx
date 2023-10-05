import { Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

// components
import Navbar from "../components/navbar/Navbar"
import ComponentErrorFallback from "../components/error/fallbacks/ComponentErrorFallback"

const Main = () => {
  return (
    <ErrorBoundary FallbackComponent={ComponentErrorFallback}>
      <Navbar />
      <Outlet />
    </ErrorBoundary>
  )
}

export default Main
