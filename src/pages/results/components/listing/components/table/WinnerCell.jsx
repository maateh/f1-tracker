import { Link, useParams } from "react-router-dom"

const WinnerCell = ({ result: { driver, constructor } }) => {
	const { year } = useParams()

	return (
		<>
			<Link 
				style={{ display: 'block', fontWeight: '600' }}
				to={`/results/${year}/drivers/${driver.id}/race`}
			>
        {driver.fullName}
      </Link>

			<Link 
				style={{ display: 'block', fontWeight: '300', fontSize: '1rem' }}
				to={`/results/${year}/constructors/${constructor.id}`}
			>
        {constructor.name}
      </Link>
		</>
	)
}

export default WinnerCell
