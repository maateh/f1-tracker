// styles
import './ListingTable.css'

const header = [
	{ key: 'pos', placeholder: 'Position' },
]

const ListingTable = () => {
  return (
    <div className="weekend-session listing-table__container">
      <table>
        <thead>
          <tr>
            {header.map(i => (
              <th key={i.key}>{i.placeholder}</th>
            ))}
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default ListingTable