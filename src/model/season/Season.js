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

	static parseList({ Seasons: seasons }) {
		if (seasons && seasons.length) {
		  return seasons.map(season => this.parser({ Season: season }))
		}
	}

	static parser({ Season: season }) {
		return new Season({
			year: season.season,
			wiki: this.#parseWiki({ Url: season.url }),
			weekends: Weekend.parseList({ Races: season.Races }),
			standings: Standings.parseList({ StandingsLists: season.StandingsLists }),
			drivers: Driver.parseList({ Drivers: season.Drivers }),
			constructors: Constructor.parseList({ Constructors: season.Constructors }),
			circuits: Circuit.parseList({ Circuits: season.Constructors }),
		})
	}

	static #parseWiki({ Url: url }) {
		if (url) return url
	}
}

export default Season
