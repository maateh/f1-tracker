import Session from "./Session";

class SessionList {
  sessions = {
    practices: [],
    qualifying: {},
    race: {},
    current: {},
    next: {}
  }

  constructor(raceInfo) {
    this.sessions = {
      practices: [
        new Session({ ...raceInfo.FirstPractice, key: 'fp1', title: 'Free Practice 1' }),
        new Session({ ...raceInfo.SecondPractice, key: 'fp2', title: 'Free Practice 2' }),
        new Session({ ...raceInfo.ThirdPractice, key: 'fp3', title: 'Free Practice 3' })
      ],
      qualifying: new Session({ ...raceInfo.Qualifying, key: 'qualifying', title: 'Qualifying' }),
      race: new Session({ date: raceInfo.date, time: raceInfo.time, key: 'race', title: 'Race Time!' }),
      current: '',
      next: ''
    }
  }
}

export default SessionList