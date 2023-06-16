const CURRENT_YEAR = new Date().getFullYear()

class CurrentFilters {
	defaultYear = { value: CURRENT_YEAR, label: CURRENT_YEAR }
	defaultWeekend = { value: 'all', label: 'ALL' }
	defaultSession = { value: 'summary', label: 'SUMMARY' }

	constructor(year, weekend, session) {
		this.year = year ? year : this.defaultYear
		this.weekend = weekend ? weekend : this.defaultWeekend
		this.session = session ? session : this.defaultSession
	}

	get() {
		return { year: this.year, weekend: this.weekend, session: this.session }
	}

	getRoute() {
		return `/results/${this.year.value}/${this.weekend.value}/${this.session.value}`
	}
}

export default CurrentFilters
