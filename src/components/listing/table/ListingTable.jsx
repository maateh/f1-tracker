import { useState } from 'react'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

// components
import ListingTableSorting from './ListingTableSorting'

// styles
import './ListingTable.css'

const ListingTable = ({ table: { columns, data } }) => {
	const [sorting, setSorting] = useState([])
 
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: { sorting },
		onSortingChange: setSorting
	})

	return (
		<div className="listing-table__container">
			<table>
				<thead>
					{table.getHeaderGroups().map(({ id, headers }) => (
						<tr key={id}>
							{headers.map(({ id, column, getContext }) => (
								<th key={id}>
									{flexRender(column.columnDef.header, getContext())}
									<ListingTableSorting column={column} />
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(({ id, getVisibleCells }) => (
						<tr key={id}>
							{getVisibleCells().map(({ id, column, getContext }) => (
								<td key={id}>
									{flexRender(column.columnDef.cell, getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default ListingTable
