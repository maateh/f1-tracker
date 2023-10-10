// context
import useProfileContext from '../../../../../context/hooks/useProfileContext'

// icons
import InfoIcon from '@mui/icons-material/Info'
import MapIcon from '@mui/icons-material/Map'
import PublicIcon from '@mui/icons-material/Public'

const useCircuitInformation = () => {
  const { info: {
    data: circuit, infoIsLoading
  }, weekends: {
    data: weekends, weekendsIsLoading
  }} = useProfileContext()

  if (infoIsLoading || weekendsIsLoading || !circuit || !weekends) {
    return {
      data: null,
      isLoading: infoIsLoading || weekendsIsLoading
    }
  }

  return {
    data: {
      title: circuit.name,
      informations: [{
        data: <>
          Total of <span className="highlight">{weekends.length}</span> races at this track so far!
        </>,
        icon: <InfoIcon style={{ fontSize: '2.5rem' }} />,
        styles: { fontSize: '2rem', fontWeight: 600 }
      }],
      links: [
        {
        url: circuit.getLocality(),
        text: 'Wikipedia page',
        tooltipText: 'Open on Maps',
        icon: <MapIcon />
        },
        {
          url: circuit.wiki,
          text: 'Wikipedia page',
          tooltipText: 'Go to the Wikipedia page',
          icon: <PublicIcon />
        }
      ]
    },
    isLoading: infoIsLoading || weekendsIsLoading
  }
}

export default useCircuitInformation
