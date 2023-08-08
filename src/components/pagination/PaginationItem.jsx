const PaginationItem = ({ current, page, setSearchParams, disabled }) => {
  return disabled || (
    <li 
      className={`pagination-item ${current === page ? 'active' : ''}`}
      onClick={() => setSearchParams({ page })}
    >
      <span>{page}</span>
    </li>
  )
}

export default PaginationItem