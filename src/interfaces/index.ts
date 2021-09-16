import { Route } from 'antd/lib/breadcrumb/Breadcrumb';

export * from './user'
export * from './request'
export * from './response'
export * from './article'
export * from './writer'
export * from './image'
export * from './payload'

export type { ColumnsType } from 'antd/lib/table'

export type IEmptyObj = {}


export interface IBreadcrumb {
  routes: Array<Route>,
}
