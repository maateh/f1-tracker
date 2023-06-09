import Session from "./Session";

class SessionList {
  practices = []
  qualifying = {}
  race = {}

  constructor(data) {
    this.practices = [
      new Session({ ...data.FirstPractice, key: 'fp1', title: 'Free Practice 1' }),
      new Session({ ...data.SecondPractice, key: 'fp2', title: 'Free Practice 2' }),
      new Session({ ...data.ThirdPractice, key: 'fp3', title: 'Free Practice 3' })
    ]
    this.qualifying = new Session({ ...data.Qualifying, key: 'qualifying', title: 'Qualifying' })
    this.race = new Session({ date: data.date, time: data.time, key: 'race', title: 'Race Time!' })
  }

  get relevantSession() {
    return this.currentSession ? this.currentSession : this.nextSession
  }

  get currentSession() {
    const practice = this.practices.find(p => p.active)
    // console.log('CURRENT_PRACTICE: ', practice)
		if (practice) {
			return practice
		}

		if (this.qualifying.active) {
			return this.qualifying
		}

		if (this.race.active) {
      return this.race
    }
    return null
  }

  get nextSession() {
		const practice = this.practices.find(p => !p.active && !p.over)
    // console.log('NEXT_PRACTICE: ', practice)
		if (practice) {
			return practice
		}

    const qualifying = this.qualifying
		if (!qualifying.active && !qualifying.over) {
			return this.qualifying
		}

		return this.race
	}
}

export default SessionList