class ProviderError extends Error {
  constructor(message: string) {
    super()
    this.name = 'ProviderError'
    this.message = message
  }
}

export default ProviderError
