import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// model
import ResultListModel from '../../../model/result/ResultList'

const Seasons = () => {
  const params = useParams()
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    ResultListModel.fetchWeekends(`/${params.year}/results`)
      .then(data => setResults(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [params.year])

  // Ehelyett a React router beépített errorElement részét kéne majd használni
  return loading ? 'loading' : error ? 'error' : results && (
    <div className="results-listing__seasons">
      {results.weekends.map(weekend => (
        <div key={weekend.round}>
          <span>Round: {weekend.round} - </span>
          <span>Weekend: {weekend.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Seasons