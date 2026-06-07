class RepositoryError extends Error {
  constructor(message: string) {
    super()
    this.name = 'RepositoryError'
    this.message = message
  }
}

export default RepositoryError
