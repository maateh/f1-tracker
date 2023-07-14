// model
import Constructor from '../constructor/Constructor'
import Driver from '../driver/Driver'

class Race {
	constructor(data) {
		this.number = data.number
		this.position = data.position
		this.points = data.points
		this.grid = data.grid != 0 ? data.grid : 'PIT LANE'
		this.laps = data.laps
		this.status = data.status

		this.parseRaceTime(data)
		this.parseFastestLap(data)

		this.driver = new Driver(data.Driver)
		this.constructor = new Constructor(data.Constructor)
	}

	parseRaceTime(data) {
		if (data.Time?.time) {
			this.raceTime = data.Time.time
			return
		}

		if (this.status.includes('+')) {
			this.raceTime = this.status
			return
		}

		this.raceTime = 'DNF'
	}

	parseFastestLap(data) {
		if (data.FastestLap) {
			this.fastestLap = {
				rank: data.FastestLap.rank,
				lap: data.FastestLap.lap,
				time: data.FastestLap.Time.time,
				avgSpeed: `${data.FastestLap.AverageSpeed.speed} ${data.FastestLap.AverageSpeed.units}`,
			}
			return
		}
		
		this.fastestLap = {
			time: '-'
		}
	}
}

export default Race
