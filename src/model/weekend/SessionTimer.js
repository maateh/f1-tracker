import format from "date-fns/format";

class SessionTimer {
	constructor(sessionInfo) {
		this.date = sessionInfo.date
		this.time = sessionInfo.time
	}

	get start() {
		// return new Date('2023-06-07T13:00:00Z').getTime()
		return new Date(`${this.date}T${this.time}`).getTime()
	}

	get end() {
		return this.start + 3600000
	}

	get active() {
		const now = Date.now()
		return this.start < now && this.end > now
	}

	get over() {
		return this.end < Date.now()
	}

	compareSessions(session) {
		return this.start > session.start
	}

	getFormattedDate(pattern) {
		return format(this.start, pattern)
	}
}

export default SessionTimer
