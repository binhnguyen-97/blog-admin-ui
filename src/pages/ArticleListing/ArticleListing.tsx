import { useEffect } from 'react';
import { Button, Table } from 'antd';
import { Link } from "react-router-dom";
import qs from 'query-string';

import useLoadData from "hooks/useLoadData";

import ActionGroup from 'components/ActionGroup';
import PageHeader from 'components/PageHeader';

import { IArticleList, IArticle } from 'interfaces'
import { fetchArticles } from 'services/api/article';
import emphasisText from 'services/utils/emphasisText';

import { articleColumnsCreator } from './ArticleListing.config'
import { PAGE_PATH, PAGES } from "constants/index";

import './ArticleListing.scss'

const ArticleListing = () => {
  const { loading, data: listArticle, fetchFail, fetchSuccess, fetchStart } = useLoadData<IArticleList>({
    initialState: [],
  })

  const { query } = qs.parseUrl(window.location.href)
  const { page = 0, limit = 10 } = query;

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        fetchStart()
        const result = await fetchArticles({
          page: page as number,
          limit: limit as number
        });
        fetchSuccess(result.data)
      } catch (error) {
        fetchFail()
      }
    }
    asyncFetch()
  }, [fetchFail, fetchStart, fetchSuccess, limit, page])


  const renderTitle = (title: string, record: IArticle) => (
    <Link to={PAGE_PATH[PAGES.ARTICLE_DETAIL] + record.id}>
      {emphasisText(title, 25)}
    </Link>
  )
  const renderAuthor = (text: any) => <span>{text.name}</span>
  const renderLastEdit = (text: string) => <span>{new Date(text).toLocaleDateString("vi")}</span>
  const renderDescription = (text: string) => <span>{emphasisText(text, 25)}</span>

  const renderActionGroup = () => <ActionGroup />

  const renderPageExtra = () => <Link to={PAGE_PATH[PAGES.CREATE_ARTICLE]}><Button type="primary">Add new article</Button></Link>

  const columns = articleColumnsCreator({
    renderTitle,
    renderAuthor,
    renderLastEdit,
    renderDescription,
    renderActionGroup
  })

  const pageExtra = renderPageExtra()

  return (
    <div className="page-article-listing">
      <PageHeader
        title="Article listing"
        extra={pageExtra}
      />
      <Table
        className='page-article-listing__table'
        columns={columns as any}
        dataSource={listArticle}
        loading={loading}
      />
    </div>
  )
}

export default ArticleListing
