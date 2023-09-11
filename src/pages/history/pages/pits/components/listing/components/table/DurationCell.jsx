const DurationCell = ({ duration, gap }) => {
  const durationStyle = gap.includes('Reference') ? {
    fontSize: '1.15rem',
    fontWeight: 700
  } : gap.includes('RED') ? {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--accent-red)'
  } : {
    fontSize: '1.1rem',
    fontWeight: 500
  }

  const gapStyle = gap.includes('Reference') ? {
    fontSize: '0.9rem',
    fontWeight: 700
  } : gap.includes('RED') ? {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--accent-red)'
  } : {
    fontSize: '0.95rem',
    fontWeight: 300
  }

  return (
    <>
      <p style={durationStyle}>
        {duration}
      </p>


      <p style={gapStyle}>
        {gap}
      </p>
    </>
  )
}

export default DurationCell
