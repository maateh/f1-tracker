import { Toaster } from "sonner"

// constants
import { TOASTER_CLASSES } from "./constants/ToasterConstants"

const ToasterSetup = () => {
  return (
    <Toaster
      className={TOASTER_CLASSES}
      position="bottom-right"
      visibleToasts={3}
      closeButton={true}
    />
  )
}
export default ToasterSetup