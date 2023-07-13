class ContextError extends Error {
  constructor(context) {
    super(`${context} hook must be use inside the own ContextProvider!`)
  }
}

export default ContextError