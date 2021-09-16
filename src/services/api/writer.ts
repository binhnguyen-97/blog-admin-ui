import { getRequest } from './base'

import { IResponse, IWriterList } from 'interfaces'

export const fetchAllWriter = async () => {
  return getRequest<IResponse<IWriterList>, unknown>('/v1/private/writers')
}
