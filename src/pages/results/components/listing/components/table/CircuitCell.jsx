import { Link } from "react-router-dom"

const CircuitCell = ({ circuit }) => {
	return (
		<>
			<Link
				style={{ fontWeight: '500', cursor: 'pointer' }}
				to={`/profile/circuit/${circuit.id}`}
			>
				{circuit.name}
			</Link>

			<p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
				{circuit.getLocality()}
			</p>
		</>
	)
}

export default CircuitCell
