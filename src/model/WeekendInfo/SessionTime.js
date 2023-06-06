import format from "date-fns/format";

class SessionTime {
	constructor(sessionInfo) {
		this.date = sessionInfo.date
		this.time = sessionInfo.time
	}

	get datetime() {
		return new Date(`${this.date}T${this.time}`)
	}

	isOver() {
		return this.datetime.getTime() > new Date('2023-06-16T19:00:00Z').getTime() - 3600000
		// return this.datetime.getTime() > new Date().getTime() - 3600000
	}

	getFormattedDate(pattern) {
		return format(this.datetime, pattern)
	}
}

export default SessionTime
