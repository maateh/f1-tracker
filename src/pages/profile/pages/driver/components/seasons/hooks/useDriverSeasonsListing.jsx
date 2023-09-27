// components
import DriverSeasonCard from '../components/listing/components/card/DriverSeasonCard'

// context
import useDriverProfileContext from '../../../context/hooks/useDriverProfileContext'

// models
import TitleModel from '../../../../../../../model/listing/Title'
import CardsModel from '../../../../../../../model/listing/Cards'

const useDriverSeasonsListing = () => {
  const { standingsList } = useDriverProfileContext()

  if (!standingsList) return { title: null, cards: null }
  
  const cardsLayouts = standingsList.map(standings => (
    <DriverSeasonCard
      key={standings.year}
      standings={standings}
    />
  ))

  return {
    title: new TitleModel({
      main: "Driver's Participated Seasons"
    }),
    cards: new CardsModel({
      styles: CardsModel.GRID_STYLES,
      layouts: cardsLayouts
    })
  }
}

export default useDriverSeasonsListing
