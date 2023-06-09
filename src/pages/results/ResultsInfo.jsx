// model
import Schedule from "../../model/schedule/Schedule"

// styles
import './ResultsInfo.css'

const ResultsInfo = ({ data }) => {
  const schedule = new Schedule(data)
  console.log('SCHEDULE: ', schedule)

  return (
    <div className="results-info">
      ResultsInfo
    </div>
  )
}
export default ResultsInfo