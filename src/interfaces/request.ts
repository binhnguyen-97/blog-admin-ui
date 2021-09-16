export interface ILoginRequest {
  email: string,
  password: string
}

export interface IArticlesRequest {
  limit?: number,
  page?: number
}
