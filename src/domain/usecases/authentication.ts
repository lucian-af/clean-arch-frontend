import { AccountModel } from '../models/account-model';

type AuthenticationParams = {
  email: string
  senha: string
}

export interface IAuthentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
}