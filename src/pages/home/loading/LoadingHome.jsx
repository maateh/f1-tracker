// skeleton loading component
import Loading from "../../../components/loading/Loading"

// styles
import './LoadingHome.css'

const LoadingHome = () => {
  return (
    <div className="loading-home__wrapper">
      {[0, 1].map(elem => (
        <div key={elem} className="loading-element">
          <Loading type="title" />
          <Loading type="text" />
          <Loading type="title" />
          <Loading type="thumbnail" />
        </div>
      ))}
    </div>
  )
}

export default LoadingHome