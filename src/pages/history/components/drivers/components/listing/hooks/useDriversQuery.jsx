import { useInfiniteQuery } from "react-query"

// api
import { driverList } from "../../../../../../../api/drivers/driverList"

// components
import DriverCard from "../components/card/DriverCard"

// models
import SeasonModel from '../../../../../../../model/season/Season'
import ListingModel from '../../../../../../../model/listing/Listing'
import ListingTitleModel from "../../../../../../../model/listing/ListingTitle"
import ListingCards from "../../../../../../../model/listing/ListingCards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import QueryError from '../../../../../../../model/error/QueryError'

const useDriversQuery = () => {
  return useInfiniteQuery({
    queryKey: ['listing', 'driverList'],
    getNextPageParam: ({ pagination }) => {
      return pagination.currentPage < pagination.pageQuantity - 1
        ? pagination.currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => driverList({ offset: pageParam * 30 })
      .then(({ info, data }) => {
        if (!data.Drivers || !data.Drivers.length) {
          throw new QueryError('No data found!', 404)
        }

        const drivers = SeasonModel.parseDrivers({ Drivers: data.Drivers })
        
        return new ListingModel({
          title: new ListingTitleModel({
            main: 'Formula 1 Drivers History (1950-)'
          }),
          cards: new ListingCards({
            layouts: drivers.map(driver => <DriverCard key={driver.id} driver={driver} />)
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
