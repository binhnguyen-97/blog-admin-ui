export interface IUserInfo {
  email: string,
  name?: string,
  avatar: string,
  role: string,
  id: string
}

export type IUserList = Array<IUserInfo>
