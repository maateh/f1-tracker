// components
import CircuitInformation from './components/information/CircuitInformation'
import CircuitRaces from './components/races/CircuitRaces'

// context
import CircuitProfileContextProvider from './context/CircuitProfileContext'

// styles
import './CircuitProfile.css'

const CircuitProfile = () => {
  return (
    <div className="circuit-profile__container">
      <CircuitProfileContextProvider>
        <CircuitInformation />
        <CircuitRaces />
      </CircuitProfileContextProvider>
    </div>
  )
}

export default CircuitProfile
