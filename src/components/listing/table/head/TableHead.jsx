import { flexRender } from '@tanstack/react-table'

// components
import TableSorting from './TableSorting'

// styles
import '../ListingTable.css'

const TableHead = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map(({ id, headers }) => (
        <tr key={id}>
          {headers.map(({ id, column, getContext }) => (
            <th key={id}>
              <div className="column-header">
                <span>{flexRender(column.columnDef.header, getContext())}</span>
                <TableSorting column={column} />
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default TableHead
