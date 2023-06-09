import { useEffect, useState } from "react"
import Select from "react-select"

// hooks
import { useFetch } from "../../hooks/useFetch"

// model
import SeasonList from "../../model/season/SeasonList"

// styles
import './ScheduleSelector.css'

const ScheduleSelector = ({ setYear }) => {
  const { data, loading, error } = useFetch('/seasons', 'SeasonTable', '?limit=100')
  const [seasons, setSeasons] = useState(null)
  // console.log('SEASONS: ', seasons)

  useEffect(() => {
    if (data) {
      setSeasons(new SeasonList(data))
    }
  }, [data])

  return (
    <div className="schedule-selector">

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {seasons && (
        <label className="season-picker">
          <span>Select a Season</span>
          <Select
            onChange={(season) => setYear(season.value)}
            options={seasons.getForSelect()}
            isSearchable={false}
          />
        </label>
      )}
    </div>
  )
}

export default ScheduleSelector