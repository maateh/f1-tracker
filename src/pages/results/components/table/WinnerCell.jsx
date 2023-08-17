import { Link } from "react-router-dom"

const WinnerCell = ({ result: { driver, constructor } }) => {
	return (
		<>
			<Link 
				style={{ display: 'block', fontWeight: '600' }}
				to={`${driver.wiki}`}
			>
        {driver.fullName}
      </Link>

			<Link 
				style={{ display: 'block', fontWeight: '300', fontSize: '1rem' }}
				to={`${constructor.wiki}`}
			>
        {constructor.name}
      </Link>
		</>
	)
}

export default WinnerCell
