class FilterOption {
  constructor(value, label) {
    this.value = value
    this.label = label
  }

  static DEFAULT = new FilterOption('all', 'ALL')
}

export default FilterOption