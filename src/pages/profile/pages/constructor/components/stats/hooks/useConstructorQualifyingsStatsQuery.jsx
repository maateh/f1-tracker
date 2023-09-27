import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { constructorQualifyingsResults } from '../../../../../../../api/results/qualifying/constructorQualifyingsResults'

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// models
import WeekendModel from '../../../../../../../model/season/weekend/Weekend'
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import AvTimerIcon from '@mui/icons-material/AvTimer'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'

const useConstructorQualifyingsStatsQuery = () => {
  const { setQualifyings } = useConstructorProfileContext()
  const { id } = useParams()

  return useQuery({
    queryKey: ['constructorQualifyingsResults', id],
    queryFn: () => constructorQualifyingsResults(id)
      .then(({ data }) => {
        if (!data.Races || !data.Races.length) {
          throw new QueryError('No data found!', 404)
        }

        const weekends = WeekendModel.parseList({ Races: data.Races })
        setQualifyings({ qualifyings: weekends })

        const winsAmount = qualifyingsWon(weekends)
        const frontRowsAmount = frontRows(weekends, true)
        const occupiedfrontRowsAmount = frontRows(weekends)
        const q3Amount = reachedQ3(weekends, true)
        const q2Amount = reachedQ2(weekends, true)
        const bothQ3Amount = reachedQ3(weekends)
        const bothQ2Amount = reachedQ2(weekends)

        // INFO
        // The current qualification system was introduced in 2006.
        // Before that there were no Q2 and Q3 sessions in qualifyings.
        const additionalStats = weekends.some(w => w.year >= 2006) ? [
          {
            label: "Reached Q3 (at least 1 driver)",
            data: q3Amount 
              ? ` x${q3Amount} | ${calculateRate(weekends, q3Amount)}`
              : '-',
            icon: <StarHalfIcon />
          },          
          {
            label: "Reached Q3 rate (both drivers)",
            data: bothQ3Amount 
              ? ` x${bothQ3Amount} | ${calculateRate(weekends, bothQ3Amount)}`
              : '-',
            icon: <StarHalfIcon />
          },
          {
            label: "Reached Q2 (at least 1 driver)",
            data: q2Amount
              ? ` x${q2Amount} | ${calculateRate(weekends, q2Amount)}`
              : '-',
            icon: <StarBorderIcon />
          },
          {
            label: "Reached Q2 rate (both drivers)",
            data: bothQ2Amount 
              ? ` x${bothQ2Amount} | ${calculateRate(weekends, bothQ2Amount)}`
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
            label: "Occupied the front row (both drivers in front)",
            data: occupiedfrontRowsAmount 
            ? `x${occupiedfrontRowsAmount} | ${calculateRate(weekends, occupiedfrontRowsAmount)}` 
            : '-',
            icon: <DoneAllIcon />
          },
          {
            label: "Reached the front row (at least 1 driver)",
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

function frontRows(weekends, atLeastOne = false) {
  return weekends.reduce((acc, curr) => {
    const results = atLeastOne
      ? curr.results.qualifying.some(result => +result.position <= 2)
      : curr.results.qualifying.every(result => +result.position <= 2)
    return results ? acc + 1 : acc
  }, 0)
}

function reachedQ3(weekends, atLeastOne = false) {
  return weekends.reduce((acc, curr) => {
    const results = atLeastOne
      ? curr.results.qualifying.some(result => result.q3 !== '-')
      : curr.results.qualifying.every(result => result.q3 !== '-')
    return results ? acc + 1 : acc
  }, 0)
}

function reachedQ2(weekends, atLeastOne = false) {
  return weekends.reduce((acc, curr) => {
    const results = atLeastOne
      ? curr.results.qualifying.some(result => result.q2 !== '-')
      : curr.results.qualifying.every(result => result.q2 !== '-')
    return results ? acc + 1 : acc
  }, 0)
}

function calculateRate(weekends, amount) {
  return (+amount / +weekends.length * 100).toFixed(2) + '%'
}

export default useConstructorQualifyingsStatsQuery
