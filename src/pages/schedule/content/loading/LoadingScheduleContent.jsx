// skeleton loading component
import Loading from "../../../../components/Loading"

// styles
import './LoadingScheduleContent.css'

const LoadingScheduleContent = () => {
  return (
    <div className="loading-schedule-content__wrapper">
      <div className="loading-title">
        <Loading type="title" />
      </div>
      {[0, 1, 2, 3, 4, 5].map(elem => (
        <div key={elem} className="loading-element">
          <Loading type="title" />
          <Loading type="text" />
          <Loading type="title" />
        </div>
      ))}
    </div>
  )
}

export default LoadingScheduleContent