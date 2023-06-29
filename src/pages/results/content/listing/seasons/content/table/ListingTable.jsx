// context
import { useResultsListingContext } from '../../../context/hooks/useResultsListingContext'

const info = [
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
	const { season: { weekends } } = useResultsListingContext()

	return (
		<div className="seasons-listing-table">
      <table>
        <thead>
          <tr>
            {info.map(i => (
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

              <td className="pole">{weekend.pole}</td>
              <td className="winner">
                <p className='winner-driver'>{weekend.winningDriver}</p>
                <p className="winner-constructor">{`(${weekend.winningConstructor})`}</p>
              </td>
              <td className="fl">
                <p className='fl-time'>{weekend.fastestLapTime}</p>
                <p className='fl-driver'>{` (${weekend.fastestDriver.driver.code})`}</p>
              </td>
              <td className="laps">{weekend.laps}</td>
              <td className="duration">{weekend.raceDuration}</td>
            </tr>
          ))}
        </tbody>
      </table>
		</div>
	)
}

export default ListingTable
