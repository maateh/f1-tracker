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

	get(value) {
		return this.options?.find(option => option.value === value)
	}

	static async querySeasons() {
		return seasonList()
			.then(data => new Filter({
        key: 'years',
        label: 'Years',
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

	static async queryRounds(year) {
		return season(year)
			.then(data => new Filter({
				key: 'rounds',
				label: 'Rounds',
				options: [
					FilterOption.DEFAULT,
					...data.Races
						.map(({ round, raceName }) => new FilterOption({ 
							value: round, 
							label: raceName 
						}))
				]
			}))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryDrivers(year) {
		return driverList(year)
			.then(data => new Filter({
        key: 'drivers',
        label: 'Drivers',
				options: [
					FilterOption.DEFAULT,
					...data.Drivers
						.map(({ driverId, givenName, familyName }) => new FilterOption({ 
							value: driverId, 
							label: `${givenName} ${familyName}` 
						}))
				]
      }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryConstructors(year) {
		return constructorList(year)
			.then(data => new Filter({
        key: 'constructors',
        label: 'Constructors',
				options: [
					FilterOption.DEFAULT,
					...data.Constructors
						.map(({ constructorId, name }) => new FilterOption({ 
							value: constructorId, 
							label: name 
						}))
				]
      }))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}
}

export default Filter
