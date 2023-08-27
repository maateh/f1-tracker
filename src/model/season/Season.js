// model
import Weekend from './weekend/Weekend'
import StandingsLists from './standings/StandingsList'
import Driver from './weekend/result/driver/Driver'
import Constructor from './weekend/result/constructor/Constructor'

class Season {
	constructor({
		year,
		wiki,
		weekends,
		standings,
		drivers,
		constructors
	}) {
		this.year = year
		this.wiki = wiki
		this.weekends = weekends
		this.standings = standings
		this.drivers = drivers
		this.constructors = constructors
	}

	static parser({ data }) {
		return new Season({
			year: data.season,
			wiki: this.#parseWiki({ url: data.url }),
			weekends: this.#parseWeekends({ weekends: data.Races }),
			standings: this.#parseStandings({ standings: data.StandingsLists }),
			drivers: this.#parseDrivers({ drivers: data.Drivers }),
			constructors: this.#parseConstructors({ constructors: data.Constructors }),
		})
	}

	static #parseWiki({ url }) {
		if (url) {
			return url
		}
	}

	static #parseWeekends({ weekends }) {
		if (weekends && weekends.length) {
		  return weekends.map(weekend => new Weekend(weekend))
		}
	}

	static #parseStandings({ standings }) {
    if (standings && standings.length) {
      return new StandingsLists(standings[0])
    }
	}

	static #parseDrivers({ drivers }) {
		if (drivers && drivers.length) {
			return drivers.map(driver => new Driver(driver))
		}
	}

	static #parseConstructors({ constructors }) {
		if (constructors && constructors.length) {
			return constructors.map(constructor => new Constructor(constructor))
		}
	}
}

export default Season
