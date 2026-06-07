class UnauthorizedError extends Error {
  constructor() {
    super()
    this.name = 'UnauthorizedError'
    this.message = 'Unauthorized'
  }
}

export default UnauthorizedError
