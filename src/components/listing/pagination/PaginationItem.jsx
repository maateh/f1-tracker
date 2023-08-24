const PaginationItem = ({ current, page, setPage, disabled }) => {
  return disabled || (
    <li 
      className={`pagination-item ${current === page ? 'active' : ''}`}
      onClick={setPage}
    >
      <span>{page}</span>
    </li>
  )
}

export default PaginationItem
