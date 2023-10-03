// model
import FastestLap from '../fastest-lap/FastestLap'
import Driver from '../driver/Driver'
import Constructor from '../constructor/Constructor'
import ParseError from '../../../../error/ParseError'

class Race {
	constructor({
		number,
		position,
		points,
		grid,
		laps,
		status,
		raceTime,
		fastestLap,
		driver,
		constructor
	}) {
		this.number = number
		this.position = position
		this.points = points
		this.grid = grid
		this.laps = laps
		this.status = status
		this.raceTime = raceTime
		this.fastestLap = fastestLap
		this.driver = driver
		this.constructor = constructor
	}

	static parser({ Result: result }) {
		try {
			return new Race({
				number: result.number,
				position: result.position,
				points: result.points,
				grid: result.grid != 0 ? result.grid : 'PIT LANE',
				laps: result.laps,
				status: result.status,
				raceTime: this.#parseRaceTime({ Time: result.Time, status: result.status }),
				fastestLap: this.#parseFastestLap({ FastestLap: result.FastestLap }),
				driver: Driver.parser({ Driver: result.Driver }),
				constructor: Constructor.parser({ Constructor: result.Constructor })
			})
		} catch (err) {
			throw new ParseError(err.message)
		}
	}

	static #parseRaceTime({ Time: raceTime, status }) {
		if (raceTime?.time) return raceTime.time
		if (status.includes('+')) return status
		return 'DNF'
	}

	static #parseFastestLap({ FastestLap: fastestLap }) {
		if (fastestLap) {
			return FastestLap.parser({ FastestLap: fastestLap })
		}
		
		return new FastestLap({ time: '-' })
	}
}

export default Race
