// api
import { fetchData } from '../../api/fetchData'

// model
import FilterOption from './FilterOption'

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
      new FilterOption('races', 'Races'),
      new FilterOption('drivers', 'Drivers'),
      new FilterOption('constructors', 'Constructors'),
    ]
  )


	static async fetchYears() {
		console.log('fetchYears()')
		return fetchData('/seasons', 'SeasonTable', '?limit=100')
			.then(data => new FilterOptions(
        'years',
        'Years',
        data.Seasons.map(d => ({ value: d.season, label: d.season })).reverse()
      ))
			.catch(err => {
				throw new Error(err)
			})
	}

	static async fetchRounds(year) {
		console.log('fetchRounds()')
		return fetchData(`/${year}`, 'RaceTable')
			.then(data => new FilterOptions(
        'rounds',
        'Rounds',
        data.Races.map(w => ({ value: w.round, label: w.raceName }))
      ))
			.catch(err => {
				throw new Error(err)
			})
	}

	static async fetchDrivers(year) {
		console.log('fetchDrivers()')
		return fetchData(`/${year}/driverStandings`, 'StandingsTable')
			.then(data => new FilterOptions(
        'drivers',
        'Drivers',
        data.StandingsLists[0].DriverStandings.map(standings => ({
          value: standings.Driver.driverId,
          label: `${standings.Driver.givenName} ${standings.Driver.familyName}`,
        }))
      ))
			.catch(err => {
				throw new Error(err)
			})
	}

	static async fetchConstructors(year) {
		console.log('fetchConstructors()')
		return fetchData(`/${year}/constructorStandings`, 'StandingsTable')
			.then(data => new FilterOptions(
        'constructors',
        'Constructors',
        data.StandingsLists[0].ConstructorStandings.map(standings => ({
          value: standings.Constructor.constructorId,
          label: standings.Constructor.name
        }))
      ))
			.catch(err => {
				throw new Error(err)
			})
	}

  static async fetchIds(key, year) {
    if (key === 'races') {
      return FilterOptions.fetchRounds(year)
    }

    if (key === 'drivers') {
      return FilterOptions.fetchDrivers(year)
    }

    if (key === 'constructors') {
      return FilterOptions.fetchConstructors(year)
    }
  }
}

export default FilterOptions
