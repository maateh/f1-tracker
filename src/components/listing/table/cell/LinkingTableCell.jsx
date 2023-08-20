import { Link } from "react-router-dom"

const LinkingTableCell = ({ value, link, style }) => {
  return (
    <Link style={style} to={link}>
      {value}
    </Link>
  )
}

export default LinkingTableCell
