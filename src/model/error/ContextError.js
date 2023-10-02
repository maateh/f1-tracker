class ContextError extends Error {
  constructor(context) {
    super(`${context} hook must be use inside their own ContextProvider!`)
  }
}

export default ContextError
