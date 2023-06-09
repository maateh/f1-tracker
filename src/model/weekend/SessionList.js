import Session from "./Session";

class SessionList {
  sessions = {
    practices: [],
    qualifying: {},
    race: {}
  }

  constructor(raceInfo) {
    this.sessions = {
      practices: [
        new Session({ ...raceInfo.FirstPractice, key: 'fp1', title: 'Free Practice 1' }),
        new Session({ ...raceInfo.SecondPractice, key: 'fp2', title: 'Free Practice 2' }),
        new Session({ ...raceInfo.ThirdPractice, key: 'fp3', title: 'Free Practice 3' })
      ],
      qualifying: new Session({ ...raceInfo.Qualifying, key: 'qualifying', title: 'Qualifying' }),
      race: new Session({ date: raceInfo.date, time: raceInfo.time, key: 'race', title: 'Race Time!' })
    }
  }

  get relevantSession() {
    return this.currentSession ? this.currentSession : this.nextSession
  }

  get currentSession() {
    const practice = this.sessions.practices.find(p => p.active)
    // console.log('CURRENT_PRACTICE: ', practice)
		if (practice) {
			return practice
		}

		if (this.sessions.qualifying.active) {
			return this.sessions.qualifying
		}

		if (this.sessions.race.active) {
      return this.sessions.race
    }
    return null
  }

  get nextSession() {
		const practice = this.sessions.practices.find(p => !p.active && !p.over)
    // console.log('NEXT_PRACTICE: ', practice)
		if (practice) {
			return practice
		}

    const qualifying = this.sessions.qualifying
		if (!qualifying.active && !qualifying.over) {
			return this.sessions.qualifying
		}

		return this.sessions.race
	}
}

export default SessionList