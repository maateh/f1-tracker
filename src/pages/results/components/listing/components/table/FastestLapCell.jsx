const FastestLapCell = ({ lap, driver, speed }) => {
  return (
    <>
      <p style={{ fontWeight: '500' }}>
        {lap?.time || '-'}
      </p>

      {driver?.code && (
        <p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
          {driver.code}
        </p>
      )}
      
      {speed && (
        <p style={{ fontWeight: '300', fontSize: '0.9rem' }}>
          {speed}
        </p>
      )}
    </>
  )
}

export default FastestLapCell
