import { useState } from 'react'
import {
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

// components
import TableHead from './head/TableHead'
import TableBody from './body/TableBody'
import Pagination from '../pagination/Pagination'

// styles
import './ListingTable.css'

const ListingTable = ({ table: { columns, data, pages }}) => {
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: pages && getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		initialState: {
			pagination: {
				pageSize: 20
			}
		},
		state: {
			sorting
		},
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
		<>
			<div className="listing-table__container">
				<table>
					<TableHead headerGroups={table.getHeaderGroups()} />
					<TableBody rows={table.getRowModel().rows} />
				</table>
			</div>
			
			{pages && <Pagination pages={pages} table={table} />}
		</>
	)
}

export default ListingTable
