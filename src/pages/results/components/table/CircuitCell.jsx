const CircuitCell = ({
	circuit: {
		name,
		location: { country, locality }
	}
}) => {
	return (
    <>
      <p style={{ fontWeight: '500' }}>
        {name}
      </p>

      <p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
        {country}, {locality}
      </p>
    </>
  )
}

export default CircuitCell
