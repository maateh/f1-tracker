// context
import useDriverProfileContext from "../../../context/hooks/useDriverProfileContext"

// icons
import LooksOneIcon from '@mui/icons-material/LooksOne'
import EngineeringIcon from '@mui/icons-material/Engineering'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'

const useDriverAchievements = () => {
  const { standingsList, races, qualifyings } = useDriverProfileContext()

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

  const standingsRequiredAchievements = standingsList && standingsList.length ? [
    {
      label: 'First Team',
      data: firstTeam(standingsList),
      icon: <EngineeringIcon />
    },
    {
      label: 'Current/Last Team*',
      data: lastTeam(standingsList),
      icon: <EngineeringIcon />
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
      ...standingsRequiredAchievements
    ]
  }
}

// Data parsers
function parseWeekendData(weekend) {
  const sessionResults = weekend.results.race || weekend.results.qualifying
  const session = weekend.sessions.race || weekend.sessions.qualifying

  return {
    achieved: `#${sessionResults[0].position}`,
    name: weekend.name,
    link: `/results/${weekend.year}/rounds/${weekend.round}/race`,
    date: session.getFormattedDate('yyyy. MM. dd.'),
  }
}

function parseStandingsData(standings) {
  const constructor = standings[0].constructors[0]

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
  return parseWeekendData(weekend)
}

function bestQualifyingResult(qualifyings) {
  const weekend = qualifyings.reduce((prev, curr) => {
    const prevPos = +prev.results.qualifying[0].position
    const currPos = +curr.results.qualifying[0].position
    return currPos < prevPos ? curr : prev
  })
  return parseWeekendData(weekend)
}

function firstTeam(standingsList) {
  return parseStandingsData(standingsList[0].drivers)
}

function lastTeam(standingsList) {
  return parseStandingsData(standingsList[standingsList.length - 1].drivers)
}

export default useDriverAchievements
