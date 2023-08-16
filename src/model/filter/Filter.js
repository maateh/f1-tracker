// api
import { constructorList, driverList, season, seasonList } from '../../api/season'

// model
import FilterOption from './FilterOption'
import QueryError from '../error/QueryError'

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
			.then(({ data }) => new Filter({
        key: 'years',
        label,
        options: data.Seasons
					.map(({ season }) => new FilterOption({ 
						value: season, 
						label: season 
					}))
					.reverse()
      }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryRounds({ year, label = 'Rounds' }) {
		return season(year)
			.then(({ data }) => new Filter({
				key: 'rounds',
				label,
				options: data.Races
					.map(({ round, raceName }) => new FilterOption({ 
						value: round, 
						label: raceName 
					}))
			}))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryDrivers({ year, label = 'Drivers' }) {
		return driverList(year)
			.then(({ data }) => new Filter({
        key: 'drivers',
        label,
				options: data.Drivers
					.map(({ driverId, givenName, familyName }) => new FilterOption({ 
						value: driverId, 
						label: `${givenName} ${familyName}` 
					}))
      }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryConstructors({ year, label = 'Constructors' }) {
		return constructorList(year)
			.then(({ data }) => new Filter({
        key: 'constructors',
        label,
				options: data.Constructors
					.map(({ constructorId, name }) => new FilterOption({ 
						value: constructorId, 
						label: name 
					}))
      }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}
}

export default Filter
