// styles
import './TableSkeleton.css'
import '../../Skeleton.css'

const TableSkeleton = ({ columnsCounter, rowsCounter }) => {
  return (
    <table className="table-skeleton__container">
      <thead>
      {Array(1)
        .fill()
        .map((_row, index) => (
          <tr key={index}>
            {Array(3)
              .fill()
              .map((_col, colIndex) => (
                <th className="table-header-cell-skeleton skeleton" key={colIndex}></th>
              ))
            }
          </tr>
        ))
      }
      </thead>
      <tbody>
        {Array(6)
          .fill()
          .map((_row, index) => (
          <tr key={index}>
            {Array(3)
              .fill()
              .map((_col, colIndex) => (
                <td className="table-body-cell-skeleton skeleton" key={colIndex}></td>
              ))
            }
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableSkeleton
