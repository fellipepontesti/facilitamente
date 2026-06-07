class UseCaseError extends Error {
  constructor(message: string) {
    super()
    this.name = 'UseCaseError'
    this.message = message
  }
}

export default UseCaseError
