// styles
import './ListingTable.css'

const ListingTable = ({ header, table }) => {
	return (
		<div className="listing-table__container">
			<table>
				<thead>
					<tr>
						{header.map(elem => (
							<th key={elem.key}>{elem.placeholder}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{table.map(row => (
						<tr key={row.key}>
							{row.data.map(cell => (
								<td className={cell.key} key={cell.key}>
									{Array.isArray(cell.data)
										? cell.data.map(cd => (
												<p className={cd.key} key={cd.key}>
													{cd.data}
												</p>
										  ))
										: <p>{cell.data}</p>}
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
