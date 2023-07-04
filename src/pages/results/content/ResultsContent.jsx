import { Outlet } from "react-router-dom"

// components
import FilterSelector from "./selector/FilterSelector"

// context
import { ResultsFilterContextProvider } from "./selector/context/ResultsFilterContext"

const ResultsContent = () => {
  return (
    <div className="results-content">
      {/* <ResultsFilterContextProvider>
        <FilterSelector />
      </ResultsFilterContextProvider> */}

      <Outlet />
    </div>
  )
}

export default ResultsContent