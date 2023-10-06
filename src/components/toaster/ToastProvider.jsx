import { Toaster } from "sonner"

// constants
import { TOASTER_CLASS, TOAST_CLASS } from "./constants/ToasterConstants"

// styles
import './Toaster.css'

const ToastProvider = () => {
  return (
    <Toaster
      className={TOASTER_CLASS}
      position="bottom-right"
      visibleToasts={3}
      closeButton={true}
      toastOptions={{
        className: TOAST_CLASS
      }}
    />
  )
}

export default ToastProvider
