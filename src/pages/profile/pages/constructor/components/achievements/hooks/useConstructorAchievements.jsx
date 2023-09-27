// context
import useConstructorProfileContext from "../../../context/hooks/useConstructorProfileContext"

// models


// icons
import LooksOneIcon from '@mui/icons-material/LooksOne'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import EventBusyIcon from '@mui/icons-material/EventBusy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'

const useConstructorAchievements = () => {
  const { standingsList } = useConstructorProfileContext()

  if (!standingsList) return {
    isLoading: true
  }

  const achievements = [
    {
      label: 'First Race Weekend',
      data: {
        name: 'Test Grand Prix',
        achieved: '#3 (+DRIVER_CODE) | #6 (+DRIVER_CODE)', // + drivers profile link
        date: 'xxxx.xx.',
      },
      icon: <LooksOneIcon />
    },
    {
      label: 'Recent/Last Race Weekend',
      data: {
        name: 'TestTestTest Grand Prix',
        achieved: '#2 (+DRIVER_CODE) | #13 (+DRIVER_CODE)', // + drivers profile link
        date: 'xxxx.xx.',
      },
      icon: <EventBusyIcon />
    },
    {
      label: 'First Drivers',
      data: {
        name: 'Driver Name1, Driver Name2', // + drivers profile link
      },
      icon: <SportsMotorsportsIcon />
    },
    {
      label: 'Current/Last Drivers',
      data: {
        name: 'Driver Name1, Driver Name2', // + drivers profile link
      },
      icon: <SportsMotorsportsIcon />
    },
    {
      label: 'Best Race Result',
      data: {
        name: 'TestTestTest Grand Prix',
        achieved: '#3 (+DRIVER_CODE)', // + driver profile link
        date: 'xxxx.xx.',
      },
      icon: <StarBorderIcon />
    },
    {
      label: 'Best Qualifying Result',
      data: {
        name: 'TestTestTestTest TestTest Grand Prix',
        achieved: '#1 (+DRIVER_CODE)', // + driver profile link
        date: 'xxxx.xx.',
      },
      icon: <AlarmOnIcon />
    }
  ]

  return {
    isLoading: false,
    isError: false,
    achievements
  }
}

export default useConstructorAchievements
