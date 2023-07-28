import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'

// context
import { useLapsFilterContext } from "../context/hooks/useLapsFilterContext"

// models
import FilterOption from '../../../../../../model/filter/FilterOption'

const LapsFilterSelector = ({ loading }) => {
  const { seasons, rounds, drivers } = useLapsFilterContext()
  const { year, round, driverId } = useParams()
  const navigate = useNavigate()

  const [filter, setFilter] = useState({
		year: year ? seasons.get(year) : seasons.options[0],
		round: round ? rounds.get(round) : rounds.options[0],
		driver: driverId ? drivers.get(driverId) : drivers.options[0],
  })

  useEffect(() => {
    const route = `./${filter.year.value}/${filter.round.value}/${filter.driver.value}`
    navigate(route, { replace: true })
  }, [navigate, filter, driverId])

  return (
    <div className="filter-selector">
      <label className={seasons.key}>
        <span>{seasons.label}</span>
        <Select
          onChange={option => setFilter(prev => ({ ...prev, year: option, driver: FilterOption.DEFAULT }))}
          placeholder={filter.year.label}
          value={filter.year.value}
          options={seasons.options}
          isSearchable={true}
          isDisabled={loading}
          isLoading={loading}
        />
			</label>

      <label className={rounds.key}>
        <span>{rounds.label}</span>
        <Select
          onChange={option => setFilter(prev => ({ ...prev, round: option }))}
          placeholder={filter.round.label}
          value={filter.round.value}
          options={rounds.options}
          isSearchable={true}
          isDisabled={loading}
          isLoading={loading}
        />
			</label>

      <label className={drivers.key}>
        <span>{drivers.label}</span>
        <Select
          onChange={option => setFilter(prev => ({ ...prev, driver: option }))}
          placeholder={filter.driver.label}
          value={filter.driver.value}
          options={drivers.options}
          isSearchable={true}
          isDisabled={loading}
          isLoading={loading}
        />
			</label>
    </div>
  )
}

export default LapsFilterSelector
