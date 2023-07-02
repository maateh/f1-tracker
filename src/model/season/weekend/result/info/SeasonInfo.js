class SeasonInfo {
  constructor(season) {
    console.log('season-DATA: ', season)
    return [
      {
        category: 'How many different?',
        data: [
          // { title: 'Grand Prix Winners', desc: 'description', icon: <CircularProgress /> },
          { title: 'Grand Prix Winners', desc: this.grandPrixWinners(season) },
          { title: 'Pole Sitters', desc: this.poleSitters(season) },
          { title: 'Drivers on Podium', desc: this.driversOnPodium(season) },
          { title: 'Point Scorers', desc: this.pointScorers(season) },
        ]
      },
      {
        category: 'Drivers Races Status',
        data: [
          { title: 'Finished', desc: this.finished(season) },
          { title: 'Got a Lap in Race', desc: this.gotALap(season) },
          { title: 'Crashed', desc: this.crashed(season) },
          { title: 'Engine failure', desc: this.engineFailure(season) },
          { title: 'Brakes failure', desc: this.brakesFailure(season) },
          { title: 'Electrical failure', desc: this.electricalFailure(season) },
          { title: 'Other failure', desc: this.otherFailure(season) },
        ]
      },
      {
        category: 'Sprint Races',
        data: [
          { title: 'Amount of Sprints', desc: this.sprintsAmount(season) },
          { title: 'Sprint Race Winners', desc: this.sprintRaceWinners(season) },
          { title: 'Shootout Winners', desc: this.shootoutWinners(season) },
          { title: 'Drivers in TOP 3', desc: this.driversInTopThree(season) },
          { title: 'Point Scorers', desc: this.sprintPointScorers(season) },
        ]
      },
      {
        category: 'General Information',
        data: [
          { title: 'Drivers', desc: this.driversAmount(season) },
          { title: 'Constructors', desc: this.constructorsAmount(season) }
        ]
      }
    ]
  }

  // How many different?
  grandPrixWinners(season) {
    const winners = season.weekends.map(w => w.result.race[0].driver.code)
    return `${new Set(winners).size} different drivers`
  }

  poleSitters(season) {
    const poleSitters = season.weekends.map(w => w.result.qualifying[0].driver.code)
    return `${new Set(poleSitters).size} different drivers`
  }

  driversOnPodium(season) {
    const driversOnPodium = season.weekends.map(w => ([
      w.result.race[0].driver.code,
      w.result.race[1].driver.code,
      w.result.race[2].driver.code
    ])).flat(1)
    return`${new Set(driversOnPodium).size} different drivers`
  }

  pointScorers(season) {
    const pointScorers = season.weekends.map(w => {
      return w.result.race
        .filter(r => r.points > 0)
        .map(r => r.driver.code)
    }).flat(1)
    console.log('pointScorers: ', pointScorers)
    return`${new Set(pointScorers).size} different drivers`
  }


  // Drivers Races Status
  finished(season) { return 'test_data' } // 'finished'

  gotALap(season) { return 'test_data' } // '+x Laps'

  crashed(season) { return 'test_data' } // 'accident/collision'

  engineFailure(season) { return 'test_data' } // 'engine/overheating'

  brakesFailure(season) { return 'test_data' } // 'brakes'

  electricalFailure(season) { return 'test_data' } // 'electrical'

  otherFailure(season) { return 'test_data' } // '...'


  // Sprint Races
  sprintsAmount(season) { return 'test_data' }

  sprintRaceWinners(season) { return 'test_data' }

  shootoutWinners(season) { return 'test_data' }

  driversInTopThree(season) { return 'test_data' }

  sprintPointScorers(season) { return 'test_data' }


  // General information
  driversAmount(season) { return 'test_data' }

  constructorsAmount(season) { return 'test_data' }
}

export default SeasonInfo