// icons
import PublicIcon from '@mui/icons-material/Public'

// styles
import '../ConstructorCard.css'

const ConstructorNationality = ({ nationality }) => {
  return (
    <div className="constructor-nationality icon__container">
      <PublicIcon fontSize='small' />
      <span>{nationality}</span>
    </div>
  )
}

export default ConstructorNationality
