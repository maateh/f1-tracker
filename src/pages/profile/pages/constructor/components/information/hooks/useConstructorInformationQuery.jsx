import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructor } from '../../../../../../../api/constructors/constructor'

// icons
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

const useConstructorInformationQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructor', id],
    queryFn: () => constructor(id)
      .then(({ constructor }) => {
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
  })
}

export default useConstructorInformationQuery
