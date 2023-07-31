import { useState } from 'react'
import Select from 'react-select'

const FilterSelector = ({ selector, loading }) => {
  const [current, setCurrent] = useState(
    selector.param ? selector.filter.get(selector.param) : selector.filter.options[0]
  )

  const handleChange = option => {
    setCurrent(option)
    selector.onChange(option)
  }

  return (
    <div className="filter-selector">
      <label className={selector.filter.key}>
        <span>{selector.filter.label}</span>
        <Select
          onChange={handleChange}
          placeholder={current.label}
          value={current.value}
          options={selector.filter.options}
          isSearchable={true}
          isDisabled={loading}
          isLoading={loading}
        />
			</label>
    </div>
  )
}

export default FilterSelector
