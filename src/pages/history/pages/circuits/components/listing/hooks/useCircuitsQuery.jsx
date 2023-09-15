import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { circuitList, circuitListFromSeason } from "../../../../../../../api/circuits/circuitList"

// components
import CircuitCard from "../components/card/CircuitCard"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import ListingModel from "../../../../../../../model/listing/Listing"
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
import QueryError from "../../../../../../../model/error/QueryError"

const useCircuitsQuery = () => {
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? circuitList({ offset: pageParam * 30, limit: 30 })
    : circuitListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'circuitList', year],
    getNextPageParam: ({ pagination }) => {
      return pagination.currentPage < pagination.pageQuantity - 1
        ? pagination.currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => call(pageParam)
      .then(({ info, data }) => {
        if (!data.Circuits || !data.Circuits.length) {
          throw new QueryError('No data found!', 404)
        }

        const circuits = SeasonModel.parseCircuits({
          Circuits: data.Circuits,
        })

        return new ListingModel({
          title: new TitleModel({
            main: `Formula 1 Circuits History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
          }),
          cards: new CardsModel({
            styles: {
              margin: '2rem 4rem',
              display: 'grid',
              gap: '4rem'
            },
            layouts: circuits.map(circuit => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
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

export default useCircuitsQuery
