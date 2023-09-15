// components
import CircuitInformation from './components/information/CircuitInformation'

// context
import CircuitProfileContextProvider from './context/CircuitProfileContext'

// styles
import './CircuitProfile.css'

const CircuitProfile = () => {
  return (
    <div className="circuit-profile__container">
      <CircuitProfileContextProvider>
        <CircuitInformation />
      </CircuitProfileContextProvider>
    </div>
  )
}

export default CircuitProfile
