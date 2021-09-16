import { getRequest } from './base'

import { IResponse, IUserList } from 'interfaces'

export const fetchAllUser = async () => {
  return getRequest<IResponse<IUserList>, unknown>('/v1/private/users')
}
