class NotAcceptableError extends Error {
  constructor() {
    super()
    this.name = 'NotAcceptableError'
    this.message = 'NotAcceptableError'
  }
}

export default NotAcceptableError
