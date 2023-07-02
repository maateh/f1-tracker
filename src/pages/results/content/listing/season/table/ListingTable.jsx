// context
import { useSeasonListingContext } from '../context/hooks/useSeasonListingContext'

// styles
import './ListingTable.css'

const header = [
	{ key: 'round', placeholder: 'Round' },
	{ key: 'weekend', placeholder: 'Weekend' },
	{ key: 'circuit', placeholder: 'Circuit name' },
	{ key: 'pole', placeholder: 'Pole Lap' },
	{ key: 'winner', placeholder: 'Winner' },
	{ key: 'fl', placeholder: 'Fastest Lap' },
	{ key: 'laps', placeholder: 'Laps' },
	{ key: 'duration', placeholder: 'Race duration' },
]

const ListingTable = () => {
	const { data: { weekends } } = useSeasonListingContext()

	return (
		<div className="season listing-table__container">
      <table>
        <thead>
          <tr>
            {header.map(i => (
              <th key={i.key}>{i.placeholder}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekends.map(weekend => (
            <tr key={weekend.round}>
              <td className="round">{`#${weekend.round}`}</td>
              <td className="weekend">{weekend.name}</td>
              <td className="circuit">{weekend.circuit.name}</td>

              <td className="pole">
                <p className="pole-time">{weekend.result.pole.time}</p>
                <p className="pole-driver">{`(${weekend.result.pole.driver.code})`}</p>
              </td>
              <td className="winner">
                <p className='winner-driver'>{weekend.result.raceWinner}</p>
                <p className="winner-constructor">{`(${weekend.result.raceWinnerConstructor})`}</p>
              </td>
              <td className="fl">
                <p className='fl-time'>{weekend.result.fastestDriver?.fastestLap.Time.time}</p>
                <p className='fl-driver'>{` (${weekend.result.fastestDriver?.driver.code})`}</p>
              </td>
              <td className="laps">{weekend.result.laps}</td>
              <td className="duration">{weekend.result.raceDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>
		</div>
	)
}

export default ListingTable
