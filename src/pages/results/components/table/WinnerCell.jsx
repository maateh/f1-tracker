const WinnerCell = ({
	result: {
		driver: { fullName },
		constructor: { name },
	},
}) => {
	return (
		<>
			<p style={{ fontWeight: '600' }}>
        {fullName}
      </p>

			<p style={{ fontWeight: '300', fontSize: '1rem' }}>
        {name}
      </p>
		</>
	)
}

export default WinnerCell
