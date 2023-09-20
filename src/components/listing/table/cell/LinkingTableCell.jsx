// components
import Linking from "../../../linking/Linking"

// constants
import { SIZE_SMALL } from "../../../linking/LinkingConstants"

const LinkingTableCell = ({ value, link, launchIcon, style }) => {
  return (
    <Linking
      text={value}
      link={link}
      launchIcon={launchIcon}
      size={SIZE_SMALL}
      textStyles={style}
    />
  )
}

export default LinkingTableCell
