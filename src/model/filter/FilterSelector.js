class FilterSelector {
  constructor({ filter, param, searchable, onChange, enabled }) {
    this.filter = filter
    this.param = param
    this.searchable = searchable
    this.onChange = onChange
    this.enabled = enabled
  }

  get current() {
    return this.filter.get(this.param)
  }

  updateParam(param) {
    this.param = param
    return this
  }

  static TYPES = {
		SEASONS: { seasons: null },
		STANDINGS: { standings: null },
		ROUNDS: { rounds: null },
		DRIVERS: { drivers: null },
		CONSTRUCTORS: { constructors: null },
		SESSIONS: { sessions: null },
	}
}

export default FilterSelector
