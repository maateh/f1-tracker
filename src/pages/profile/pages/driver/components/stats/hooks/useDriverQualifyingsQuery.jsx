import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driverQualifyingsResults } from '../../../../../../../api/results/qualifying/driverQualifyingsResults'

// models
import SeasonModel from "../../../../../../../model/season/Season"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import AvTimerIcon from '@mui/icons-material/AvTimer'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const useDriverQualifyingsQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['driverQualifyingsResults', id],
    queryFn: () => driverQualifyingsResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const weekends = SeasonModel.parseWeekends({ Races: data.Races })
        const winsAmount = qualifyingsWon(weekends)
        const frontRowsAmount = frontRows(weekends)
        const q3Amount = reachedQ3(weekends)
        const q2Amount = reachedQ2(weekends)

        // INFO
        // The current qualification system was introduced in 2006.
        // Before that there were no Q2 and Q3 sessions in qualifyings.
        const additionalStats = weekends.some(w => w.year >= 2006) ? [
          {
            label: "Reached Q3",
            data: q3Amount
              ? `x${q3Amount} | ${calculateRate(weekends, q3Amount)}`
              : '-',
            icon: <StarHalfIcon />
          },
          {
            label: "Reached Q2",
            data: q2Amount
              ? `x${q2Amount} | ${calculateRate(weekends, q2Amount)}`
              : '-',
            icon: <StarBorderIcon />
          }
        ] : []

        return [
          {
            label: "Qualifyings participations",
            data: participations(weekends),
            icon: <AvTimerIcon />
          },
          {
            label: "Best qualifying result",
            data: bestResult(weekends),
            icon: <AlarmOnIcon />
          },
          {
            label: "Qualifyings won",
            data: winsAmount
              ? `x${winsAmount} | ${calculateRate(weekends, winsAmount)}`
              : '-',
            icon: <WorkspacePremiumIcon />
          },
          {
            label: "Reached the front row",
            data: frontRowsAmount
              ? `x${frontRowsAmount} | ${calculateRate(weekends, frontRowsAmount)}`
              : '-',
            icon: <UnfoldLessDoubleIcon />
          },
          ...additionalStats
        ]
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

function participations(weekends) {
  return `x${weekends.length}`
}

function bestResult(weekends) {
  return '#' + weekends.reduce((prevPos, curr) => {
    const currPos = curr.results.qualifying[0].position
    return Math.min(prevPos, currPos)
  }, weekends[0].results.qualifying[0].position)
}

function qualifyingsWon(weekends) {
  return weekends.reduce((acc, curr) => {
    return +curr.results.qualifying[0].position === 1
      ? acc + 1
      : acc
  }, 0)
}

function frontRows(weekends) {
  return weekends.reduce((acc, curr) => {
    return +curr.results.qualifying[0].position <= 2
      ? acc + 1
      : acc
  }, 0)
}

function reachedQ3(weekends) {
  return weekends.reduce((acc, curr) => {
    return curr.results.qualifying[0].q3 !== '-'
      ? acc + 1
      : acc
  }, 0)
}

function reachedQ2(weekends) {
  return weekends.reduce((acc, curr) => {
    return curr.results.qualifying[0].q2 !== '-'
      ? acc + 1
      : acc
  }, 0)
}

function calculateRate(weekends, amount) {
  return (+amount / +weekends.length * 100).toFixed(2) + '%'
}

export default useDriverQualifyingsQuery
