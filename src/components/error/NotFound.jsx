import { NavLink, useNavigate } from 'react-router-dom'

// styles
import './Error.css'

const NotFound = () => {
	const navigate = useNavigate()

	return (
		<div className="error-page__container not-found">
			<h2 className="error-page__title">Ooops!</h2>

			<p className="error-details">Page not found!</p>
			<p className="error-code">404</p>

			<p className="error-suggestion">
				Go to the <NavLink to="/">Homepage</NavLink>
			</p>
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
		</div>
	)
}

export default NotFound
