import { getRequest, postRequest } from "./base";

import { ILoginRequest, IAuthResponse, IResponse } from 'interfaces'

export const loginApi = async (params: ILoginRequest) => {
  return postRequest<IAuthResponse, ILoginRequest>('/v1/public/user', params)
}

export const identifyUser = async () => {
  return getRequest<IResponse<IAuthResponse>, unknown>('/v1/private/user/me')
}
