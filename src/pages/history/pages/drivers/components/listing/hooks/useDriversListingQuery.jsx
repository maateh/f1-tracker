import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { driverList, driverListFromSeason } from "../../../../../../../api/drivers/driverList"

// components
import DriverCard from "../components/card/DriverCard"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"

// models
import SeasonModel from '../../../../../../../model/season/Season'
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
import QueryError from '../../../../../../../model/error/QueryError'

const useDriversListingQuery = () => {
  const { cards, setTitle, setCards, updateCardsLayouts } = useListingContext()
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? driverList({ offset: pageParam * 30, limit: 30 })
    : driverListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'driverList', year],
    getNextPageParam: ({ currentPage, pageQuantity }) => {
      return currentPage < pageQuantity - 1
        ? currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => call(pageParam)
      .then(({ info, data }) => {
        if (!data.Drivers || !data.Drivers.length) {
          throw new QueryError('No data found!', 404)
        }

        const drivers = SeasonModel.parseDrivers({ Drivers: data.Drivers })
        const cardsLayouts = drivers.map(driver => (
          <DriverCard
            key={driver.id}
            driver={driver}
          />
        ))

        setTitle({
          title: new TitleModel({
            main: `Formula 1 Drivers History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
          })
        })
        
        if (cards) {
          updateCardsLayouts({
            layouts: [...cards.layouts, ...cardsLayouts]
          })
        } else {
          setCards({
            cards: new CardsModel({ layouts: cardsLayouts })
          })
        }

        return new PaginationModel({
          total: info.total,
          limit: info.limit,
          pageQuantity: Math.ceil(info.total / info.limit),
          currentPage: pageParam
        })
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useDriversListingQuery
