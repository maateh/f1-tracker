class FilterOption {
  constructor({ value, label }) {
    this.value = value
    this.label = label
  }

  static ALL = new FilterOption({ value: 'all', label: 'ALL' })
}

export default FilterOption
