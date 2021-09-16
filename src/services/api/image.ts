import { IImage, IExternalAPIResponse } from 'interfaces'

import { postRequestWithoutAuth } from './base'


export const uploadImage = (image: File) => {
  const formData = new FormData();

  formData.append("image", image)
  formData.append("name", image.name)

  return postRequestWithoutAuth<IExternalAPIResponse<IImage>, FormData>(`${process.env.REACT_APP_IMAGE_API_ENDPOINT}?key=${process.env.REACT_APP_IMAGE_API_KEY}`, formData)
}
