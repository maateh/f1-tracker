import { useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()

  return (
    <div>
      <p>Error Page</p>
      <p>Error: {error.message}</p>
    </div>
  )
}

export default Error