import Session from "./Session";

class SessionList {
  practices = []
  qualifying = {}
  race = {}

  constructor(data) {
    this.practices = [
      new Session({ ...data.FirstPractice, key: 'fp1', title: 'Free Practice 1' }),
    ]
    if (data.Sprint) {
      this.sprint = [
        new Session({ ...data.SecondPractice, key: 'sq', title: 'Sprint Qualifying' }),
        new Session({ ...data.Sprint, key: 'sr', title: 'Sprint Race' })
      ]
    } else {
      this.practices.push(
        new Session({ ...data.SecondPractice, key: 'fp2', title: 'Free Practice 2' }),
        new Session({ ...data.ThirdPractice, key: 'fp3', title: 'Free Practice 3' })
      )
    }
    this.qualifying = new Session({ ...data.Qualifying, key: 'qualifying', title: 'Qualifying' })
    this.race = new Session({ date: data.date, time: data.time, key: 'race', title: 'Race Time!' })
  }

  get relevantSession() {
    return this.currentSession ? this.currentSession : this.nextSession
  }

  get currentSession() {
    const practice = this.practices.find(p => p.active)
		if (practice) {
			return practice
		}

		if (this.qualifying.active) {
			return this.qualifying
		}

    const sprint = this.sprint?.find(s => s.active)
    if (sprint) {
      return sprint
    }

		if (this.race.active) {
      return this.race
    }
    return null
  }

  get nextSession() {
		const practice = this.practices.find(p => !p.active && !p.over)
		if (practice) {
			return practice
		}

    const qualifying = this.qualifying
		if (!qualifying.active && !qualifying.over) {
			return this.qualifying
		}

    const sprint = this.sprint.find(s => !s.active && !s.over)
    if (sprint) {
      return sprint
    }

		return this.race
	}
}

export default SessionList