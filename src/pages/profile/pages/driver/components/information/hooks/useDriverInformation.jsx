// context
import useDriverProfileContext from '../../../context/hooks/useDriverProfileContext'

// icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import FlagIcon from '@mui/icons-material/Flag'
import CakeIcon from '@mui/icons-material/Cake'
import PublicIcon from '@mui/icons-material/Public'

const useDriverInformation = () => {
  const { driver: {
    data: driver, isLoading
  }} = useDriverProfileContext()

  if (isLoading || !driver) {
    return {
      data: null,
      isLoading
    }
  }

  return {
    data: {
      title: driver.fullName,
      informations: [
        {
          data: `${driver.code} ${driver.formattedNumber}`,
          icon: <AlternateEmailIcon />,
          styles: { fontWeight: 800 }
        },
        {
          data: driver.formattedDateOfBirth,
          icon: <CakeIcon />
        },
        {
          data: driver.nationality,
          icon: <FlagIcon />
        }
      ],
      links: [{
        url: driver.wiki,
        text: 'Wikipedia page',
        tooltipText: 'Go to the Wikipedia page',
        icon: <PublicIcon />
      }]
    },
    isLoading
  }
}

export default useDriverInformation
