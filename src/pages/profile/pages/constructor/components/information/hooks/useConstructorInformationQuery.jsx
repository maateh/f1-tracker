import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructor } from '../../../../../../../api/constructors/constructor'

// models
import ConstructorModel from "../../../../../../../model/season/weekend/results/constructor/Constructor"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

const useConstructorInformationQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructor', id],
    queryFn: () => constructor(id)
      .then(({ data }) => {
        if (!data.Constructors || !data.Constructors.length) {
          throw new QueryError('No data found!', 404)
        }

        const constructor = ConstructorModel.parser({ Constructor: data.Constructors[0] })
        return {
          title: constructor.name,
          informations: [{
            data: constructor.nationality,
            icon: <FlagIcon />
          }],
          links: [{
            url: constructor.wiki,
            text: 'Wikipedia page',
            tooltipText: 'Go to the Wikipedia page',
            icon: <PublicIcon />
          }]
        }
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorInformationQuery
