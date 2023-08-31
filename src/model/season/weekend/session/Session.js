import { format } from "date-fns"

class Session {
  constructor({ key, title, date, time }) {
    this.key = key
    this.title = title
    this.date = date
		this.time = time
  }

	static KEYS = {
		RACE: 'race',
		QUALIFYING: 'qualifying',
		FP3: 'fp3',
		FP2: 'fp2',
		FP1: 'fp1',
		SPRINT_RACE: 'sprint_race',
		SPRINT_QUALIFYING: 'sprint_qualifying',
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
		const interval = this.key === Session.KEYS.RACE ? 5400000 : 3600000
		return this.start && this.start + interval
	}

	isActive() {
		const now = Date.now()
		return this.start && this.start < now && this.end > now
	}

	isOver() {
		return this.end && this.end < Date.now()
	}

	getCountdown() {
		return (this.isActive() ? this.end : this.start) - Date.now()
	}

	getFormattedDate(pattern) {
		return this.start ? format(this.start, pattern) : '-'
	}
}

export default Session
