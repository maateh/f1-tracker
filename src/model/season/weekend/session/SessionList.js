// models
import Session from './Session'
import ParseError from '../../../error/ParseError'

class SessionList {
	constructor({ practices, sprint, qualifying, race }) {
		this.practices = practices
		this.sprint = sprint
		this.qualifying = qualifying
		this.race = race
	}

	static parser({ Race }) {
		try {
			return new SessionList({
				practices: this.#parsePractices({ Race }),
				sprint: this.#parseSprint({ Race }),
				qualifying: this.#parseQualifying({ Race }),
				race: this.#parseRace({ Race })
			})
		} catch (err) {
			throw new ParseError(err.message)
		}
	}

	static #parsePractices({ Race }) {
		const practices = []

		if (Race.FirstPractice) {
			practices.push(
				new Session({
					key: Session.KEYS.FP1,
					title: 'Free Practice 1',
					...Race.FirstPractice,
				})
			)
		}

		if (Race.SecondPractice) {
			if (Race.Sprint) return practices

			practices.push(
				new Session({
					key: Session.KEYS.FP2,
					title: 'Free Practice 2',
					...Race.SecondPractice,
				})
			)
		}

		if (Race.ThirdPractice) {
			practices.push(
				new Session({
					key: Session.KEYS.FP3,
					title: 'Free Practice 3',
					...Race.ThirdPractice,
				})
			)
		}

		return practices
	}

	static #parseSprint({ Race }) {
		if (!Race.Sprint) return

    return {
      qualifying: new Session({
        key: Session.KEYS.SPRINT_QUALIFYING,
        title: 'Sprint Qualifying',
        ...Race.SecondPractice,
      }),
      race: new Session({
        key: Session.KEYS.RACE,
        title: 'Sprint Race',
        ...Race.Sprint,
      })
		}
	}

	static #parseQualifying({ Race }) {
		if (Race.Qualifying) {
			return new Session({
				key: Session.KEYS.QUALIFYING,
				title: 'Qualifying',
				...Race.Qualifying,
			})
		}

		return new Session({
			key: Session.KEYS.QUALIFYING,
			title: 'Qualifying',
		})
	}

	static #parseRace({ Race }) {
		if (Race.date && Race.time) {
			return new Session({
				key: Session.KEYS.RACE,
				title: 'Race Time!',
				date: Race.date,
				time: Race.time,
			})
		}

		return new Session({
			key: Session.KEYS.RACE,
			title: 'Race Time!',
			date: Race.date,
		})
	}

	get currentSession() {
		const practice = this.practices?.find(p => p.isActive())
		if (practice) {
			return practice
		}

		if (this.qualifying.isActive()) {
			return this.qualifying
		}

		const sprint =
			this.sprint && Object.values(this.sprint).find(s => s.isActive())
		if (sprint) {
			return sprint
		}

		if (this.race.isActive()) {
			return this.race
		}
	}

	get nextSession() {
		const practice = this.practices?.find(p => !p.isActive() && !p.isOver())
		if (practice) {
			return practice
		}

		const qualifying = this.qualifying
		if (!qualifying.isActive() && !qualifying.isOver()) {
			return qualifying
		}

		const sprint =
			this.sprint &&
			Object.values(this.sprint).find(s => !s.isActive() && !s.isOver())
		if (sprint) {
			return sprint
		}

		return this.race
	}

	get relevantSession() {
		return this.currentSession || this.nextSession
	}
}

export default SessionList
