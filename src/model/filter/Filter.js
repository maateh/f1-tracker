// api
import { constructorList, driverList, season, seasonList } from '../../api/season'

// model
import FilterOption from './FilterOption'
import QueryError from '../error/QueryError'

class Filter {
	constructor(key, label, options) {
		this.key = key
		this.label = label
		this.options = this.parseOptions(options)
	}

	get(value) {
		return this.options?.find(option => option.value === value)
	}

	parseOptions(options) {
		if (this.key === 'years' || this.key === 'standings' || this.key === 'sessions') {
			return options.map(option => new FilterOption(option.value, option.label))
		}

		return [
			FilterOption.DEFAULT,
			...options.map(option => new FilterOption(option.value, option.label)),
		]
	}

	static STANDINGS = new Filter(
    'standings',
    'Standings',
    [
      new FilterOption('rounds', 'Rounds'),
      new FilterOption('drivers', 'Drivers'),
      new FilterOption('constructors', 'Constructors'),
    ]
  )

	static SESSIONS = new Filter(
		'sessions',
		'Sessions',
		[
			new FilterOption('race', 'Race'),
			new FilterOption('qualifying', 'Qualifying'),
		]
	)

	static async querySeasons() {
		return seasonList()
			.then(data => new Filter(
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
			.then(data => new Filter(
        'rounds',
        'Rounds',
        data.Races.map(w => ({ value: w.round, label: w.raceName }))
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryDrivers(year) {
		return driverList(year)
			.then(data => new Filter(
        'drivers',
        'Drivers',
				data.Drivers.map(d => ({ value: d.driverId, label: `${d.givenName} ${d.familyName}` }))
        // data.StandingsLists[0].DriverStandings.map(standings => ({
        //   value: standings.Driver.driverId,
        //   label: `${standings.Driver.givenName} ${standings.Driver.familyName}`,
        // }))
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}

	static async queryConstructors(year) {
		return constructorList(year)
			.then(data => new Filter(
        'constructors',
        'Constructors',
				data.Constructors.map(c => ({ value: c.constructorId, label: c.name }))
        // data.StandingsLists[0].ConstructorStandings.map(standings => ({
        //   value: standings.Constructor.constructorId,
        //   label: standings.Constructor.name
        // }))
      ))
			.catch(err => {
				throw new QueryError(err.message)
			})
	}
}

export default Filter
