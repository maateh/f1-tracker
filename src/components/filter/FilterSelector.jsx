import { useParams } from 'react-router-dom'
import Select from 'react-select'

const FilterSelector = ({ selector, loading }) => {
  const params = useParams()
  
  const handleChange = option => {
    selector.setParam(selector, option)
    selector.onChange(option, params)
  }

  return (
    <div className="filter-selector">
      <label className={selector.filter.key}>
        <span>{selector.filter.label}</span>
        <Select
          onChange={handleChange}
          placeholder={selector.current.label}
          value={selector.current.value}
          options={selector.filter.options}
          isSearchable={selector.searchable}
          isDisabled={loading}
          isLoading={loading}
        />
			</label>
    </div>
  )
}

export default FilterSelector
