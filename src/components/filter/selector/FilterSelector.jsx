import { useParams } from 'react-router-dom'
import Select from 'react-select'

// styles
import './FilterSelector.css'

const FilterSelector = ({ selector, loading }) => {
  const params = useParams()
  
  const handleChange = ({ value }) => {
    selector.param = value
    selector.onChange(value, params)
  }

  return (
    <div className="filter-selector">
      <label className={selector.filter.key}>
        <span>{selector.filter.label}</span>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          unstyled={true}
          
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
