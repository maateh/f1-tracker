import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { driver } from '../../../../../../../api/drivers/driver'

// icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import FlagIcon from '@mui/icons-material/Flag'
import CakeIcon from '@mui/icons-material/Cake'
import PublicIcon from '@mui/icons-material/Public'

const useDriverInformationQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['driver', id],
    queryFn: () => driver(id)
      .then(({ driver }) => {
        return {
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
        }
      })
  })
}

export default useDriverInformationQuery
