import { toast } from 'sonner'

// constants
import {
	TOAST_CLASS_SUCCESS,
	TOAST_CLASS_ERROR,
	TOAST_CLASS_WARNING
} from '../constants/ToasterConstants'

// icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ErrorIcon from '@mui/icons-material/Error'

const useToaster = () => {
	const successToast = (text) => {
		return toast(text, {
			className: TOAST_CLASS_SUCCESS,
			icon: <CheckCircleIcon />
		})
	}

	const errorToast = (text) => {
		return toast(text, {
			className: TOAST_CLASS_ERROR,
			icon: <CancelIcon />
		})
	}

	const warningToast = (text) => {
		return toast(text, {
			className: TOAST_CLASS_WARNING,
			icon: <ErrorIcon />
		})
	}

	return { successToast, errorToast, warningToast }
}

export default useToaster
