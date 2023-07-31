class FilterSelector {
  constructor({ filter, param, searchable, setParam, onChange }) {
    this.filter = filter
    this.param = param
    this.searchable = searchable
    
    this.setParam = setParam
    this.onChange = onChange
  }

  get current() {
    return this.filter.get(this.param)
  }
}

export default FilterSelector
