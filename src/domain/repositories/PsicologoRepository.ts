export interface Psicologo {
  id: number
  uuid: string
  nome: string
  email: string
  cpf: string
  telefone: string
  crp: string
  especialidade: string | null
  abordagem: string | null
  ativo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreatePsicologoData {
  nome: string
  email: string
  senha: string
  cpf: string
  telefone: string
  crp: string
  especialidade?: string
  abordagem?: string
}

export interface UpdatePsicologoData {
  nome?: string
  email?: string
  senha?: string
  cpf?: string
  telefone?: string
  crp?: string
  especialidade?: string | null
  abordagem?: string | null
  ativo?: boolean
}

export interface PsicologoRepository {
  create(data: CreatePsicologoData): Promise<Psicologo>
  findMany(): Promise<Psicologo[]>
  findByUuid(uuid: string): Promise<Psicologo | null>
  findByEmail(email: string): Promise<Psicologo | null>
  findByCpf(cpf: string): Promise<Psicologo | null>
  update(uuid: string, data: UpdatePsicologoData): Promise<Psicologo>
  delete(uuid: string): Promise<void>
}
