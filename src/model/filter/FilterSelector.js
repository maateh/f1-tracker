class FilterSelector {
  constructor({ filter, param, searchable, onChange }) {
    this.filter = filter
    this.param = param
    this.searchable = searchable
    this.onChange = onChange
  }

  get current() {
    return this.filter.get(this.param)
  }
}

export default FilterSelector
