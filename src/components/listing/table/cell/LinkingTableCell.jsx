import { Link } from "react-router-dom"

const LinkingTableCell = ({ data, link, style }) => {
  return (
    <Link style={style} to={link}>
      {data}
    </Link>
  )
}

export default LinkingTableCell
