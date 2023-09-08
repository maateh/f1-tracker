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
import './Table.css'

const Table = ({ table: { columns, data, pagination }}) => {
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: pagination && getPaginationRowModel(),
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
				isNaN(+b.getValue(id).value) ? 1 : -1,
			duration: (a, b, id) => {
				if (a.getValue(id).value.includes(':') && b.getValue(id).value.includes(':')) {
					return a.getValue(id).value < b.getValue(id).value ? 1 : -1
				}
				return a.getValue(id).value.includes(':') ? -1
					: b.getValue(id).value.includes(':') ? 1
					: a.getValue(id).value < b.getValue(id).value ? 1 : -1
			}
		}
	})

	return (
		<>
			<div className="table__container">
				<table>
					<TableHead headerGroups={table.getHeaderGroups()} />
					<TableBody rows={table.getRowModel().rows} />
				</table>
			</div>
			
			{pagination && <Pagination pages={pagination.pageQuantity} table={table} />}
		</>
	)
}

export default Table
