// components
import ConstructorInformation from './components/information/ConstructorInformation'

// context
import ConstructorProfileContextProvider from './context/ConstructorProfileContext'

// styles
import './ConstructorProfile.css'

const ConstructorProfile = () => {
  return (
    <div className="constructor-profile__container">
      <ConstructorProfileContextProvider>
        <ConstructorInformation />
      </ConstructorProfileContextProvider>
    </div>
  )
}

export default ConstructorProfile
