// components
import CircuitRacesListing from './components/listing/CircuitRacesListing'

// context
import ListingContextProvider from '../../../../../components/listing/context/ListingContext'

// styles
import './CircuitRaces.css'

const CircuitRaces = () => {
  return (
    <section className="circuit-races__container">
      <ListingContextProvider>
        <CircuitRacesListing />
      </ListingContextProvider>
    </section>
  )
}

export default CircuitRaces
