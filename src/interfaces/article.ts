import { IWriter } from './writer';

export interface IArticle {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  author: IWriter,
}

export type IArticleList = Array<IArticle>
