import { getRequest, postRequest } from "./base";

import { IArticlesRequest, IResponse, IArticleList, CreateArticlePayload } from "interfaces";

export const fetchArticles = (params: IArticlesRequest) => {
  return getRequest<IResponse<IArticleList>, IArticlesRequest>('/v1/public/articles', params)
}

export const createArticle = (payload: CreateArticlePayload) => {
  return postRequest('/v1/private/article', payload)
}
