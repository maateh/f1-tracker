// context
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"

// icons
import LooksOneIcon from '@mui/icons-material/LooksOne'
import EngineeringIcon from '@mui/icons-material/Engineering'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'

const useDriverAchievements = () => {
  const { races, qualifyings } = useDriverProfileContext()

  if (!races) {
    return { achievements: null }
  }

  const qualifyingsRequiredAchievements = qualifyings && qualifyings.length ? [
    {
      label: 'Best Qualifying Result',
      data: bestQualifyingResult(qualifyings),
      icon: <AlarmOnIcon />
    }
  ] : []

  return {
    achievements: [
      {
        label: 'First Race Weekend',
        data: firstRace(races),
        icon: <LooksOneIcon />
      },
      {
        label: 'Recent/Last Race Weekend',
        data: lastRace(races),
        icon: <EventBusyIcon />
      },
      {
        label: 'Best Race Result',
        data: bestRaceResult(races),
        icon: <StarBorderIcon />
      },
      ...qualifyingsRequiredAchievements,
      {
        label: 'First Team',
        data: firstTeam(races),
        icon: <EngineeringIcon />
      },
      {
        label: 'Current/Last Team',
        data: lastTeam(races),
        icon: <EngineeringIcon />
      }
    ]
  }
}

// Data parsers
function parseWeekendData(weekend, displayConstructor = false) {
  const results = weekend.results.race || weekend.results.qualifying
  const session = weekend.sessions.race || weekend.sessions.qualifying

  const achievedInfo = displayConstructor
    ? `#${results[0].position} (with ${results[0].constructor.name})`
    : `#${results[0].position}`

  return {
    achieved: achievedInfo,
    name: weekend.name,
    link: `/results/${weekend.year}/rounds/${weekend.round}/race`,
    date: session.getFormattedDate('yyyy. MM. dd.'),
  }
}

function parseTeamData(constructor) {
  return {
    name: constructor.name,
    link: `/profile/constructors/${constructor.id}`
  }
}

// Obtaining data for each achievements
function firstRace(races) {
  return parseWeekendData(races[0])
}

function lastRace(races) {
  return parseWeekendData(races[races.length - 1])
}

function bestRaceResult(races) {
  const weekend = races.reduce((prev, curr) => {
    const prevPos = +prev.results.race[0].position
    const currPos = +curr.results.race[0].position
    return currPos < prevPos ? curr : prev
  })
  return parseWeekendData(weekend, true)
}

function bestQualifyingResult(qualifyings) {
  const weekend = qualifyings.reduce((prev, curr) => {
    const prevPos = +prev.results.qualifying[0].position
    const currPos = +curr.results.qualifying[0].position
    return currPos < prevPos ? curr : prev
  })
  return parseWeekendData(weekend, true)
}

function firstTeam(races) {
  return parseTeamData(races[0].results.race[0].constructor)
}

function lastTeam(races) {
  return parseTeamData(races[races.length - 1].results.race[0].constructor)
}

export default useDriverAchievements
