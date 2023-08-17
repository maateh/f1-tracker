import { Link } from "react-router-dom"

const CircuitCell = ({
	circuit: {
		name,
		location: { country, locality },
		maps
	}
}) => {
	return (
		<>
			<Link
				style={{ fontWeight: '500', cursor: 'pointer' }}
				to={maps}
			>
				{name}
			</Link>

			<p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
				{country}, {locality}
			</p>
		</>
	)
}

export default CircuitCell
