const PoleCell = ({ pole }) => {
  return (
    <>
      <p style={{ fontWeight: '500' }}>
        {pole?.time || '-'}
      </p>

      {pole?.driver?.code && (
        <p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
          {pole.driver.code}
        </p>
      )}
    </>
  )
}

export default PoleCell
