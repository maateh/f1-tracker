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
