class ForbiddenError extends Error {
  constructor(message?: string) {
    super()
    this.name = 'ForbiddenError'
    this.message = message ?? 'Forbidden'
  }
}

export default ForbiddenError
