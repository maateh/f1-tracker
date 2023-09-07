import { flexRender } from '@tanstack/react-table'

// styles
import '../Table.css'

const TableBody = ({ rows }) => {
  return (
    <tbody>
      {rows.map(({ id, getVisibleCells }) => (
        <tr key={id}>
          {getVisibleCells().map(({
              id,
              column: { columnDef: { accessorKey, cell }},
              getContext,
            }) => (
              <td key={id} className={accessorKey}>
                <span>{flexRender(cell, getContext())}</span>
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody
