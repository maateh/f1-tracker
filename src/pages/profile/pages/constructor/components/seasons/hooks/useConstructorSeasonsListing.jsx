// components
import ConstructorSeasonCard from '../components/listing/components/card/ConstructorSeasonCard'

// context
import useConstructorProfileContext from '../../../context/hooks/useConstructorProfileContext'

// models
import TitleModel from '../../../../../../../model/listing/Title'
import CardsModel from '../../../../../../../model/listing/Cards'

const LISTING_TITLE = new TitleModel({
  main: "Constructor's participated seasons"
})

const useConstructorSeasonsListing = () => {
  const { standingsList } = useConstructorProfileContext()

  if (!standingsList) return {
    title: LISTING_TITLE,
    cards: null
  }
  
  const cardsLayouts = standingsList.map(standings => (
    <ConstructorSeasonCard
      key={standings.year}
      standings={standings}
    />
  ))

  return {
    title: LISTING_TITLE,
    cards: new CardsModel({
      styles: CardsModel.GRID_STYLES,
      layouts: cardsLayouts
    })
  }
}

export default useConstructorSeasonsListing
