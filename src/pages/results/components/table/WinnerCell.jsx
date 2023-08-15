const WinnerCell = ({ result: { driver, constructor } }) => {
	return (
		<>
			<p style={{ fontWeight: '600' }}>
        {driver.fullName}
      </p>

			<p style={{ fontWeight: '300', fontSize: '1rem' }}>
        {constructor.name}
      </p>
		</>
	)
}

export default WinnerCell
