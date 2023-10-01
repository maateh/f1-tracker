import { useParams } from "react-router-dom"
import { useQuery } from "react-query"

// api
import { circuit } from "../../../../../../../api/circuits/circuit"
import { circuitRaces } from "../../../../../../../api/circuits/races/circuitRaces"

// models
import CircuitModel from "../../../../../../../model/season/weekend/circuit/Circuit"
import QueryError from "../../../../../../../model/error/QueryError"

// icons
import InfoIcon from '@mui/icons-material/Info'
import MapIcon from '@mui/icons-material/Map'
import PublicIcon from '@mui/icons-material/Public'

const useCircuitInformationQuery = () => {
  const { id } = useParams()

  return useQuery({
    queryKey: ['circuit', 'circuitRaces', id],
    queryFn: () => Promise.all([
      circuit(id), 
      circuitRaces(id, { offset: 0, limit: 0 })
    ])
      .then(([{ data }, { info }]) => {
        if (!data.Circuits || !data.Circuits.length) {
          throw new QueryError('No data found!', 404)
        }

        const circuit = CircuitModel.parser({ Circuit: data.Circuits[0] })
        return {
          title: circuit.name,
          informations: [{
            data: <>
              Total of <span className="highlight">{info.total}</span> races at this track so far!
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
        }
      })
      .catch(err => {
        throw new QueryError(err.message, err.code)
      })
  })
}

export default useCircuitInformationQuery
