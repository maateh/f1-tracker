import { Outlet } from "react-router-dom"

// components
import FilterSelector from "./selector/FilterSelector"

// context
import { ResultsFilterContextProvider } from "./selector/context/ResultsFilterContext"
import { ResultsListingContextProvider } from "./listing/context/ResultsListingContext"

const ResultsContent = () => {
  return (
    <div className="results-content">
      <ResultsFilterContextProvider>
        <FilterSelector />
      </ResultsFilterContextProvider>

      <ResultsListingContextProvider>
        <Outlet />
      </ResultsListingContextProvider>
    </div>
  )
}

export default ResultsContent