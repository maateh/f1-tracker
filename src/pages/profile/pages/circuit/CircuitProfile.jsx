// components
import Information from '../../components/information/Information'
import CircuitRaces from './components/races/CircuitRaces'

// hooks
import useCircuitInformationQuery from './components/information/hooks/useCircuitInformationQuery'

// styles
import './CircuitProfile.css'

const CircuitProfile = () => {
  return (
    <main className="circuit-profile__container page__container">
      <Information useInformationQuery={useCircuitInformationQuery} />
      <CircuitRaces />
    </main>
  )
}

export default CircuitProfile
