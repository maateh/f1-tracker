import { useParams } from "react-router-dom"
import { useInfiniteQuery } from "react-query"

// api
import { circuitList, circuitListFromSeason } from "../../../../../../../api/circuits/circuitList"

// components
import CircuitCard from "../components/card/CircuitCard"

// context
import useListingContext from "../../../../../../../components/listing/context/hooks/useListingContext"
import { ADD_CARDS_LAYOUTS, SET_CARDS, SET_TITLE } from "../../../../../../../components/listing/context/ListingContextActions"

// models
import SeasonModel from "../../../../../../../model/season/Season"
import TitleModel from "../../../../../../../model/listing/Title"
import CardsModel from "../../../../../../../model/listing/Cards"
import PaginationModel from "../../../../../../../model/listing/Pagination"
import FilterOptionModel from "../../../../../../../model/filter/FilterOption"
import QueryError from "../../../../../../../model/error/QueryError"

const useCircuitsQuery = () => {
  const { title, cards, dispatch } = useListingContext()
  const { year } = useParams()

  const call = pageParam => year === FilterOptionModel.ALL.value 
    ? circuitList({ offset: pageParam * 30, limit: 30 })
    : circuitListFromSeason(year, { offset: pageParam * 30, limit: 30 })

  return useInfiniteQuery({
    queryKey: ['listing', 'circuitList', year],
    getNextPageParam: ({ currentPage, pageQuantity }) => {
      return currentPage < pageQuantity - 1
        ? currentPage + 1
        : undefined
    },
    queryFn: ({ pageParam = 0 }) => call(pageParam)
      .then(({ info, data }) => {
        if (!data.Circuits || !data.Circuits.length) {
          throw new QueryError('No data found!', 404)
        }

        const circuits = SeasonModel.parseCircuits({ Circuits: data.Circuits })

        if (!title) {
          dispatch({
            type: SET_TITLE,
            payload: new TitleModel({
              main: `Formula 1 Circuits History (${year === FilterOptionModel.ALL.value ? 'since 1950' : `in ${year}`})`
            })
          })
        }

        const cardsLayouts = circuits.map(circuit => (
          <CircuitCard key={circuit.id} circuit={circuit} />
        ))
        
        dispatch({
          type: cards ? ADD_CARDS_LAYOUTS : SET_CARDS,
          payload: cards ? [...cards.layouts, ...cardsLayouts] 
            : new CardsModel({
              styles: {
                margin: '2rem 4rem',
                display: 'grid',
                gap: '4rem'
              },
              layouts: cardsLayouts
            })
        })

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

export default useCircuitsQuery
