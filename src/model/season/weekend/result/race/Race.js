// model
import Constructor from '../constructor/Constructor'
import Driver from '../driver/Driver'
import FastestLap from '../fastest/FastestLap'

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
			this.fastestLap = new FastestLap({
				time: data.FastestLap.Time.time,
				avgSpeed: {
					speed: data.FastestLap.AverageSpeed.speed,
					units: data.FastestLap.AverageSpeed.units,
				},
				rank: data.FastestLap.rank,
				lap: data.FastestLap.lap,
			})
			return
		}
		
		this.fastestLap = new FastestLap({
			time: '-'
		})
	}
}

export default Race
