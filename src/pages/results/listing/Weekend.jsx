import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// model
import ResultListModel from "../../../model/result/ResultList"

const Weekend = () => {
  const params = useParams()
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    ResultListModel.fetchWeekend(`/${params.year}/${params.weekend}/results`)
      .then(data => setResults(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [params.year, params.weekend])

  // Ehelyett a React router beépített errorElement részét kéne majd használni
  return loading ? 'loading' : error ? 'error' : results && (
    <div className="results-listing__seasons">
      <div key={results.round}>
        <span>Round: {results.round} - </span>
        <span>Weekend: {results.name}</span>
      </div>
    </div>
  )
}

export default Weekend