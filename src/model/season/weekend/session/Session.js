import { format } from "date-fns"

class Session {
  constructor({ key, title, date, time }) {
    this.key = key
    this.title = title
    this.date = date
		this.time = time
  }

  get start() {
		if (this.date && this.time) {
      return new Date(`${this.date}T${this.time}`).getTime()
    }

    if (this.date) {
      return new Date(this.date).getTime()
    }
	}

	get end() {
		return this.start && this.start + 3600000
	}

	isActive() {
		const now = Date.now()
		return this.start && this.start < now && this.end > now
	}

	isOver() {
		return this.end && this.end < Date.now()
	}

	getFormattedDate(pattern) {
		return this.start ? format(this.start, pattern) : '-'
	}
}

export default Session
