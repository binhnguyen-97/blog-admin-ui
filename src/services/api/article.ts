import { getRequest, postRequest, deleteRequest, putRequest } from "./base";

import { IArticlesRequest, IResponse, IArticleList, IArticle, CreateArticlePayload } from "interfaces";

export const fetchArticles = (params: IArticlesRequest) => {
  return getRequest<IResponse<IArticleList>, IArticlesRequest>('/v1/public/articles', params)
}

export const createArticle = (payload: CreateArticlePayload) => {
  return postRequest('/v1/private/article', payload)
}

export const deleteArticle = (articleId: string) => {
  return deleteRequest(`/v1/private/article/${articleId}`)
}

export const fetchArticleDetail = (articleId: string) => {
  return getRequest<IResponse<IArticle>, unknown>(`/v1/public/article/${articleId}`)
}

export const updateArticle = (id: string, payload: CreateArticlePayload) => {
  return putRequest(`/v1/private/article/${id}`, payload)
}
