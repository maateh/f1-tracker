// constants
import { ERROR_THEME_RED } from "./constants/ErrorConstants"

const Error = ({
	headerIcon,
  oops = true,
	info,
	messages,
	onReset,
	resetLabel,
	resetIcon,
	size,
	color = ERROR_THEME_RED,
}) => {
	return (
		<div
			className={`error-fallback${size ? ` ${size}` : ''}${
				color ? ` ${color}` : ''
			}`}
		>
			{headerIcon}
		  {oops && <p className="error-title">Ooops!</p>}
			<p className="error-info">{info}</p>

			{messages.map((msg, index) => (
				<p key={index} className="error-msg">
					{msg}
				</p>
			))}

			<button className="btn icon__container" onClick={onReset}>
				{resetIcon}
				<span>{resetLabel}</span>
			</button>
		</div>
	)
}

export default Error
