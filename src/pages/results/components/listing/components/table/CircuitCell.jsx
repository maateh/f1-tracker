// components
import Linking from "../../../../../../components/linking/Linking"

// constants
import { SIZE_SMALL } from "../../../../../../components/linking/LinkingConstants"

const CircuitCell = ({ circuit }) => {
	return (
		<>
			<Linking
				text={circuit.name}
				link={`/profile/circuit/${circuit.id}`}
				launchIcon={true}
				size={SIZE_SMALL}
				textStyles={{
					fontSize: '1.05rem',
					fontWeight: '500'
				}}
			/>

			<p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
				{circuit.getLocality()}
			</p>
		</>
	)
}

export default CircuitCell
