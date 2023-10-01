// components
import Linking from "../../../../../../../components/linking/Linking";

// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// icons
import LooksOneIcon from '@mui/icons-material/LooksOne'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import EventBusyIcon from '@mui/icons-material/EventBusy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'

const useConstructorAchievements = () => {
  const { races, qualifyings } = useConstructorProfileContext()

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
        label: 'First Drivers',
        data: firstDrivers(races),
        icon: <SportsMotorsportsIcon />
      },
      {
        label: 'Current/Last Drivers',
        data: lastDrivers(races),
        icon: <SportsMotorsportsIcon />
      }
    ]
  }
}

// Data parsers
function parseWeekendData(weekend, parseOnlyBest = false) {
  const results = weekend.results.race || weekend.results.qualifying
  const session = weekend.sessions.race || weekend.sessions.qualifying

  const achievedInfo = parseOnlyBest
    ? <Linking
      link={`/profile/driver/${results[0].driver.id}`}
      text={`#${results[0].position} place (with ${results[0].driver.code})`}
      tooltipText="Open Driver's profile page"
    />
    : results.map(result => `#${result.position}`).join(', ')

  return {
    achieved: achievedInfo,
    name: <Linking
      link={`/results/${weekend.year}/rounds/${weekend.round}/race`}
      text={weekend.name}
      tooltipText="Open Race Results"
    />,
    nameLink: `/results/${weekend.year}/rounds/${weekend.round}/race`,
    date: session.getFormattedDate('yyyy. MM. dd.'),
  }
}

function parseDriversData(drivers) {
  const driversNames = drivers.map(d => (
    <Linking
      key={d.id}
      link={`/profile/driver/${d.id}`}
      text={`${d.code}${d.number ? ` #${d.number}` : ''}`}
      tooltipText="Open Driver's profile page"
      linkStyles={{ marginLeft: '1rem' }}
    />
  ))

  return {
    name: driversNames,
    nameLink: `/profile/constructors/${constructor.id}`
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

function firstDrivers(races) {
  const drivers = races[0].results.race.map(result => result.driver)
  return parseDriversData(drivers)
}

function lastDrivers(races) {
  const drivers = races[races.length - 1].results.race.map(result => result.driver)
  return parseDriversData(drivers)
}

export default useConstructorAchievements
