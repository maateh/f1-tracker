// icons
import ImportExportIcon from '@mui/icons-material/ImportExport'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

const ListingTableSorting = ({ column }) => {
  const sortedby = {
    asc: <KeyboardDoubleArrowUpIcon onClick={column.getToggleSortingHandler()} />,
    desc: <KeyboardDoubleArrowDownIcon onClick={column.getToggleSortingHandler()} />,
    [false]: <ImportExportIcon onClick={column.getToggleSortingHandler()} />
  }

  return (
    <span className="listing-table-sorting__icon">
      {column.getCanSort() && sortedby[column.getIsSorted()]}
    </span>
  )
}

export default ListingTableSorting
