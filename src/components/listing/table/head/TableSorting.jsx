// icons
import ImportExportIcon from '@mui/icons-material/ImportExport'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

const TableSorting = ({ column }) => {
  const sortedby = {
    asc: <KeyboardDoubleArrowUpIcon onClick={column.getToggleSortingHandler()} />,
    desc: <KeyboardDoubleArrowDownIcon onClick={column.getToggleSortingHandler()} />,
    [false]: <ImportExportIcon onClick={column.getToggleSortingHandler()} />
  }

  return (
    <span className="table-sorting__icon">
      {column.getCanSort() && sortedby[column.getIsSorted()]}
    </span>
  )
}

export default TableSorting
