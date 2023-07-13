// styles
import './Error.css'

const Error = ({ error }) => {
	return (
		<div className="error-page__container">
			<h2 className="error-page__title">Ooops!</h2>

			<p className="error-details">{error?.details}</p>
			<p className="error-code">{error?.code}</p>

      <button className="btn" onClick={() => window.location.reload()}>
        Refresh Page
      </button>
		</div>
	)
}

export default Error
