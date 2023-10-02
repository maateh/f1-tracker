// api
import { seasonList } from '../../api/season/seasonList'
import { season } from '../../api/season/season'
import { driverListFromRound, driverListFromSeason } from '../../api/drivers/driverList'
import { constructorListFromSeason } from '../../api/constructors/constructorList'

// model
import FilterOption from './FilterOption'

class Filter {
	constructor({ key, label, options }) {
		this.key = key
		this.label = label
		this.options = options
	}

	addOption(option) {
		this.options.unshift(option)
		return this
	}

	get(value) {
		return this.options?.find(option => option.value === value)
	}

	static async querySeasons({ label = 'Years' }) {
		return seasonList()
			.then(({ seasons }) => new Filter({
        key: 'years',
        label,
        options: seasons
					.map(({ year }) => new FilterOption({ 
						value: year, 
						label: year 
					}))
					.reverse()
      }))
	}

	static async queryRounds({ year, label = 'Rounds' }) {
		return season(year)
			.then(({ season }) => new Filter({
				key: 'rounds',
				label,
				options: season.weekends
					.map(({ round, name }) => new FilterOption({ 
						value: round, 
						label: name 
					}))
			}))
	}

	static async queryDrivers({ year, round, label = 'Drivers' }) {
		const call = round 
			? () => driverListFromRound(year, round)
			: () => driverListFromSeason(year)

		return call()
			.then(({ drivers }) => new Filter({
        key: 'drivers',
        label,
				options: drivers
					.map(({ id, fullName }) => new FilterOption({ 
						value: id, 
						label: fullName
					}))
      }))
	}

	static async queryConstructors({ year, label = 'Constructors' }) {
		return constructorListFromSeason(year)
			.then(({ constructors }) => new Filter({
        key: 'constructors',
        label,
				options: constructors
					.map(({ id, name }) => new FilterOption({ 
						value: id, 
						label: name 
					}))
      }))
	}
}

export default Filter
