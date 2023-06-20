// skeleton loading component
import Loading from "../../../../../components/Loading"

// styles
import './LoadingSelector.css'

const LoadingSelector = () => {
  return (
    <div className="loading-selector__wrapper">
      <Loading type="text" />
      <Loading type="title" />
    </div>
  )
}

export default LoadingSelector