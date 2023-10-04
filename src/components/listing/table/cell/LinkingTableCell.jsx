// components
import Linking from "../../../linking/Linking"

// constants
import { LINKING_SIZE_SMALL } from "../../../linking/constants/LinkingConstants"

const LinkingTableCell = ({ value, link, launchIcon, style }) => {
  return (
    <Linking
      text={value}
      link={link}
      launchIcon={launchIcon}
      size={LINKING_SIZE_SMALL}
      textStyles={style}
    />
  )
}

export default LinkingTableCell
