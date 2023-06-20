import { NavLink, useNavigate } from "react-router-dom"

// styles
import './Error.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page__container">
      <h2 className="not-found-page__title">Ooops!</h2>
      <h4 className="not-found-page__subtitle">Page not found!</h4>
      <p className="error-code">404</p>

      <p className="not-found-page__suggestion">Go to the <NavLink to="/">Homepage</NavLink></p>
      <button
        className="btn"
        onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default NotFound