import { toast } from 'sonner'

// constants
import {
	TOAST_ERROR_CLASSES,
	TOAST_SUCCESS_CLASSES,
	TOAST_WARNING_CLASSES,
} from '../constants/ToasterConstants'

// icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ErrorIcon from '@mui/icons-material/Error'

const useToaster = () => {
	const successToast = (text) => {
		return toast(text, {
			className: TOAST_SUCCESS_CLASSES,
			icon: <CheckCircleIcon />,
		})
	}

	const errorToast = (text) => {
		return toast(text, {
			className: TOAST_ERROR_CLASSES,
			icon: <CancelIcon />,
		})
	}

	const warningToast = (text) => {
		return toast(text, {
			className: TOAST_WARNING_CLASSES,
			icon: <ErrorIcon />,
		})
	}

	return { successToast, errorToast, warningToast }
}

export default useToaster
