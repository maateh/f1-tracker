// models
import Session from './Session'

class SessionList {
  constructor(data) {
    this.parsePractices(data)
    this.parseSprints(data)
    this.parseQualifying(data)
    this.parseRace(data)
  }

  parsePractices(data) {
    if (data.FirstPractice) {
      this.practices = [
        new Session({
          key: 'fp1',
          title: 'Free Practice 1',
          ...data.FirstPractice,
        })
      ]
    }

    if (data.SecondPractice) {
      if (data.Sprint) return

      this.practices.push(
        new Session({
          key: 'fp2',
          title: 'Free Practice 2',
          ...data.SecondPractice,
        })
      )
    }

    if (data.ThirdPractice) {
      this.practices.push(
        new Session({
          key: 'fp3',
          title: 'Free Practice 3',
          ...data.ThirdPractice,
        })
      )
    }
  }

  parseSprints(data) {
    if (data.Sprint) {
      this.sprint = {
        qualifying: new Session({
          key: 'sq',
          title: 'Sprint Qualifying',
          ...data.SecondPractice
        }),
        race: new Session({
          key: 'sr',
          title: 'Sprint Race',
          ...data.Sprint
        })
      }
    }
  }

  parseQualifying(data) {
    if (data.Qualifying) {
      this.qualifying = new Session({
        key: 'qualifying',
        title: 'Qualifying',
        ...data.Qualifying
      })
      return
    }

    this.qualifying = new Session({
      key: 'qualifying',
      title: 'Qualifying'
    })
  }

  parseRace(data) {
    if (data.date && data.time) {
      this.race = new Session({
        key: 'race', 
        title: 'Race Time!',
        date: data.date, 
        time: data.time
      })
      return
    }

    this.race = new Session({
      key: 'race', 
      title: 'Race Time!',
      date: data.date
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

    const sprint = this.sprint && Object.values(this.sprint).find(s => s.isActive())
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

    const sprint = this.sprint && Object.values(this.sprint).find(s => !s.isActive() && !s.isOver())
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
