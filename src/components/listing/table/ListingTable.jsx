import { useMemo, useState } from 'react'
import {
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

// components
import TableHead from './head/TableHead'
import TableBody from './body/TableBody'

// styles
import './ListingTable.css'

const ListingTable = ({ table: { columns, data } }) => {
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		columns: useMemo(() => columns, [columns]),
		data: useMemo(() => data, [data]),
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: { sorting },
		onSortingChange: setSorting,
		sortingFns: {
			default: (a, b, id) =>
				a.getValue(id).value < b.getValue(id).value ? 1 : -1,
			time: (a, b, id) =>
				a.getValue(id).value === '-' ? -1
					: b.getValue(id).value === '-' ? 1
					: a.getValue(id).value < b.getValue(id).value ? 1 : -1,
			grid: (a, b, id) =>
				+a.getValue(id).value < +b.getValue(id).value ||
				isNaN(+b.getValue(id).value) ? 1 : -1
		}
	})

	return (
		<div className="listing-table__container">
			<table>
				<TableHead headerGroups={table.getHeaderGroups()} />
				<TableBody rows={table.getRowModel().rows} />
			</table>
		</div>
	)
}

export default ListingTable
