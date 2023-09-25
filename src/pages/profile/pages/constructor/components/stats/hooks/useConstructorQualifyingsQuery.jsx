import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorQualifyingsResults } from '../../../../../../../api/results/qualifying/constructorQualifyingsResults'

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const useConstructorQualifyingsQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorQualifyingsResults', id],
    queryFn: () => constructorQualifyingsResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const qualifyings = SeasonModel.parseWeekends({ Races: data.Races })

        return [
          {
            label: "Best qualifying result",
            data: "#x",
            icon: <AlarmOnIcon />
          },
          {
            label: "Qualifyings won",
            data: "x times",
            icon: <WorkspacePremiumIcon />
          },
          {
            label: "Reached the front row",
            data: "x times",
            icon: <UnfoldLessDoubleIcon />
          },
          {
            label: "Occupied the front row (2 drivers)",
            data: "x times",
            icon: <DoneAllIcon />
          },
          {
            label: "Reached Q3",
            data: "x times",
            icon: <StarHalfIcon />
          },
          {
            label: "Reached Q2",
            data: "x times",
            icon: <StarBorderIcon />
          }
        ]
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useConstructorQualifyingsQuery
