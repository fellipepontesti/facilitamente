class ValidationError extends Error {
  constructor(
    message: string,
    public errors?: string[],
  ) {
    super()
    this.name = 'ValidationError'
    this.message = message
  }
}

export default ValidationError
