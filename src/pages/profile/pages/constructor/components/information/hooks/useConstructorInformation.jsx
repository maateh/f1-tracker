// context
import useConstructorProfileContext from '../../../context/hooks/useConstructorProfileContext'

// icons
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'

const useConstructorInformation = () => {
  const { constructor: {
    data: constructor, isLoading
  }} = useConstructorProfileContext()

  if (isLoading || !constructor) {
    return {
      data: null,
      isLoading
    }
  }

  return {
    data: {
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
    },
    isLoading
  }
}

export default useConstructorInformation
