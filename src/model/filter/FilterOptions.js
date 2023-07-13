// api
import { season, seasonList } from '../../api/season'
import { constructorStandings, driverStandings } from '../../api/standings'

// model
import FilterOption from './FilterOption'
import QueryError from '../error/QueryError'

class FilterOptions {
	constructor(key, label, data) {
		this.key = key
		this.label = label
		this.data = this.parseData(data)
	}

	get(value) {
		return this.data?.find(option => option.value === value)
	}

	parseData(data) {
		if (this.key === 'years' || this.key === 'standings') {
			return data.map(option => new FilterOption(option.value, option.label))
		}

		return [
			new FilterOption('all', 'ALL'),
			...data.map(option => new FilterOption(option.value, option.label)),
		]
	}

	static STANDINGS = new FilterOptions(
    'standings',
    'Standings',
    [
      new FilterOption('rounds', 'Rounds'),
      new FilterOption('drivers', 'Drivers'),
      new FilterOption('constructors', 'Constructors'),
    ]
  )

	static async querySeasons() {
		return seasonList()
			.then(data => new FilterOptions(
        'years',
        'Years',
        data.Seasons.map(d => ({ value: d.season, label: d.season })).reverse()
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryRounds(year) {
		return season(year)
			.then(data => new FilterOptions(
        'rounds',
        'Rounds',
        data.Races.map(w => ({ value: w.round, label: w.raceName }))
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryDrivers(year) {
		return driverStandings(year)
			.then(data => new FilterOptions(
        'drivers',
        'Drivers',
        data.StandingsLists[0].DriverStandings.map(standings => ({
          value: standings.Driver.driverId,
          label: `${standings.Driver.givenName} ${standings.Driver.familyName}`,
        }))
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryConstructors(year) {
		return constructorStandings(year)
			.then(data => new FilterOptions(
        'constructors',
        'Constructors',
        data.StandingsLists[0].ConstructorStandings.map(standings => ({
          value: standings.Constructor.constructorId,
          label: standings.Constructor.name
        }))
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}
}

export default FilterOptions
