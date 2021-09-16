import { IUserInfo } from './user'

export interface IAuthResponse extends IUserInfo {
  privateToken: string
}

export interface IResponse<T> {
  message: string,
  data: T
}

export interface IExternalAPIResponse<T> {
  data: T,
  status: number,
  success: boolean
}
