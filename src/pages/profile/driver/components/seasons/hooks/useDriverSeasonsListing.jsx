// components
import DriverSeasonCard from '../components/listing/components/card/DriverSeasonCard'

// context
import useDriverProfileContext from '../../../context/hooks/useDriverProfileContext'

// models
import CardsModel from '../../../../../../model/listing/Cards'

const useDriverSeasonsListing = () => {
  const { standings: standingsLists } = useDriverProfileContext()

  if (!standingsLists) return { cards: null }
  
  const cardsLayouts = standingsLists.map(standings => (
    <DriverSeasonCard
      key={standings.year}
      standings={standings}
    />
  ))

  return {
    cards: new CardsModel({
      styles: CardsModel.GRID_STYLES,
      layouts: cardsLayouts
    })
  }
}

export default useDriverSeasonsListing
