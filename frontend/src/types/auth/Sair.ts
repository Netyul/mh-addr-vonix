export interface SairParams {
  count_login: number
  created_at: string
  id: number
  last_login: string
  password: string
  status: number
  type_admin: string
  updated_at: string
  user: number
  username: string
  uuid: string
}
export declare type Sair = (params: SairParams) => void
