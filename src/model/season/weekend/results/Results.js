// models
import Qualifying from './qualifying/Qualifying'
import Race from './race/Race'

class Results {
	constructor({
		qualifying,
		race
	}) {
		this.qualifying = qualifying
		this.race = race
	}

	static parser({ Race }) {
		return new Results({
			qualifying: this.#parseQualifying({ QualifyingResults: Race.QualifyingResults }),
			race: this.#parseRace({ Results: Race.Results })
		})
	}

	static #parseQualifying({ QualifyingResults: qualifying }) {
		if (qualifying && qualifying.length) {
			return qualifying.map(result => Qualifying.parser({ QualifyingResult: result }))
		}
	}

	static #parseRace({ Results: race }) {
		if (race && race.length) {
			return race.map(result => Race.parser({ Result: result }))
		}
	}
}

export default Results
