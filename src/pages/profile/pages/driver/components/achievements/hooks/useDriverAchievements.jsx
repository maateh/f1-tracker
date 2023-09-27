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

  if (!standingsList || !races || !qualifyings) {
    return { achievements: null }
  }

  const achievements = [
    {
      label: 'First Race Weekend',
      data: {
        name: 'Test Grand Prix',
        achieved: '#10',
        date: 'xxxx.xx.',
      },
      icon: <LooksOneIcon />
    },
    {
      label: 'Recent/Last Race Weekend',
      data: {
        name: 'TestTestTest Grand Prix',
        achieved: '#3',
        date: 'xxxx.xx.',
      },
      icon: <EventBusyIcon />
    },
    {
      label: 'Best Race Result',
      data: {
        name: 'TestTestTest Grand Prix',
        achieved: '#3',
        date: 'xxxx.xx.',
      },
      icon: <StarBorderIcon />
    },
    {
      label: 'Best Qualifying Result',
      data: {
        name: 'TestTestTestTest TestTest Grand Prix',
        achieved: '#1',
        date: 'xxxx.xx.',
      },
      icon: <AlarmOnIcon />
    },
    {
      label: 'First Team',
      data: {
        name: 'Mercedes',
      },
      icon: <EngineeringIcon />
    },
    {
      label: 'Current/Last Team',
      data: {
        name: 'Ferrari',
      },
      icon: <EngineeringIcon />
    }
  ]

  return {
    isLoading: false,
    isError: false,
    achievements
  }
}

export default useDriverAchievements
