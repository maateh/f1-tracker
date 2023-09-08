import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { driverList, driverListFromSeason } from "../../../../../../../api/drivers/driverList"

// components
import DriverCard from "../components/card/DriverCard"

// models
import SeasonModel from '../../../../../../../model/season/Season'
import ListingModel from '../../../../../../../model/listing/Listing'
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
import QueryError from '../../../../../../../model/error/QueryError'

const useDriversQuery = () => {
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? driverList({ offset: pageParam * 30, limit: 30 })
    : driverListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'driverList', year],
    getNextPageParam: ({ pagination }) => {
      return pagination.currentPage < pagination.pageQuantity - 1
        ? pagination.currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => call(pageParam)
      .then(({ info, data }) => {
        if (!data.Drivers || !data.Drivers.length) {
          throw new QueryError('No data found!', 404)
        }

        const drivers = SeasonModel.parseDrivers({ Drivers: data.Drivers })
        
        return new ListingModel({
          title: new TitleModel({
            main: `Formula 1 Drivers History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
          }),
          cards: new CardsModel({
            styles: {
              margin: '2rem 4rem',
              display: 'grid',
              gap: '4rem'
            },
            layouts: drivers.map(driver => (
              <DriverCard
                key={driver.id}
                driver={driver}
              />
            ))
          }),
          pagination: new PaginationModel({
            total: info.total,
            limit: info.limit,
            pageQuantity: Math.ceil(info.total / info.limit),
            currentPage: pageParam
          })
        })
      })
      .catch(err => {
        throw new QueryError(err.message)
      })
  })
}

export default useDriversQuery
