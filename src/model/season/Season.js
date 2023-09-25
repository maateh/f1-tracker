// model
import Weekend from './weekend/Weekend'
import Standings from './standings/Standings'
import Driver from './weekend/results/driver/Driver'
import Constructor from './weekend/results/constructor/Constructor'
import Circuit from './weekend/circuit/Circuit'

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

	static parser({ Season: season }) {
		return new Season({
			year: season.season,
			wiki: this.#parseWiki({ Url: season.url }),
			weekends: this.parseWeekends({ Races: season.Races }),
			standings: this.parseStandings({ StandingsLists: season.StandingsLists }),
			drivers: this.parseDrivers({ Drivers: season.Drivers }),
			constructors: this.parseConstructors({ Constructors: season.Constructors }),
			circuits: this.parseCircuits({ Circuits: season.Constructors }),
		})
	}

	static #parseWiki({ Url: url }) {
		if (url) return url
	}

	static parseWeekends({ Races: weekends }) {
		if (weekends && weekends.length) {
		  return weekends.map(weekend => Weekend.parser({ Race: weekend }))
		}
	}

	static parseStandings({ StandingsLists: standingsList }) {
    if (standingsList && standingsList.length) {
      return standingsList.map(standings => Standings.parser({ StandingsList: standings }))
    }
	}

	static parseDrivers({ Drivers: drivers }) {
		if (drivers && drivers.length) {
			return drivers.map(driver => Driver.parser({ Driver: driver }))
		}
	}

	static parseConstructors({ Constructors: constructors }) {
		if (constructors && constructors.length) {
			return constructors.map(constructor => Constructor.parser({ Constructor: constructor }))
		}
	}

	static parseCircuits({ Circuits: circuits }) {
		if (circuits && circuits.length) {
			return circuits.map(circuit => Circuit.parser({ Circuit: circuit }))
		}
	}
}

export default Season
