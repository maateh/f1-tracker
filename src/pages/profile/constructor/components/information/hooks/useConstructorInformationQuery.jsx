import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructor } from '../../../../../../api/constructors/constructor'

// context
import useConstructorProfileContext from '../../../context/hooks/useConstructorProfileContext'
import { SET_CONSTRUCTOR } from "../../../context/ConstructorProfileContextActions"

// models
import ConstructorModel from "../../../../../../model/season/weekend/results/constructor/Constructor"
import QueryError from "../../../../../../model/error/QueryError"

const useConstructorInformationQuery = () => {
  const { dispatch } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructor', id],
    queryFn: () => constructor(id)
      .then(({ data }) => {
        if (!data.Constructors || !data.Constructors.length) {
          throw new QueryError('No data found!', 404)
        }

        dispatch({
          type: SET_CONSTRUCTOR,
          payload: ConstructorModel.parser({ Constructor: data.Constructors[0] })
        })
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorInformationQuery
