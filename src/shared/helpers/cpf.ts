export function validarCPF(cpf: string): boolean {
  const limpo = cpf.replace(/\D/g, '')
  if (limpo.length !== 11 || /^(\d)\1{10}$/.test(limpo)) return false

  let soma = 0
  let resto = 0

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(limpo.substring(i - 1, i), 10) * (11 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(limpo.substring(9, 10), 10)) return false

  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(limpo.substring(i - 1, i), 10) * (12 - i)
  }

  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(limpo.substring(10, 11), 10)) return false

  return true
}
