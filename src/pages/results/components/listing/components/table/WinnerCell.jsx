import { useParams } from "react-router-dom"

// components
import Linking from "../../../../../../components/linking/Linking"

// constants
import { SIZE_SMALL } from "../../../../../../components/linking/LinkingConstants"

const WinnerCell = ({ result: { driver, constructor } }) => {
	const { year } = useParams()

	return (
		<>
			<Linking
				text={driver.fullName}
				link={`/results/${year}/drivers/${driver.id}/race`}
				launchIcon={false}
				size={SIZE_SMALL}
				textStyles={{
					fontSize: '1.1rem',
					fontWeight: '600'
				}}
			/>

			<Linking
				text={constructor.name}
				link={`/results/${year}/constructors/${constructor.id}`}
				launchIcon={false}
				size={SIZE_SMALL}
				textStyles={{
					fontSize: '1rem',
					fontWeight: '300'
				}}
			/>
		</>
	)
}

export default WinnerCell
