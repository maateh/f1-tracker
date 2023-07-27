class FilterOption {
  constructor({ value, label }) {
    this.value = value
    this.label = label
  }

  static DEFAULT = new FilterOption({ value: 'all', label: 'ALL'})
}

export default FilterOption
