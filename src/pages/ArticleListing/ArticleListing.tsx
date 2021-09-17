import { useEffect, useState } from 'react';
import { Button, message, Modal, Table } from 'antd';
import { Link, useHistory } from "react-router-dom";
import qs from 'query-string';

import useLoadData from "hooks/useLoadData";

import ActionGroup from 'components/ActionGroup';
import PageHeader from 'components/PageHeader';

import { IArticleList, IArticle } from 'interfaces'
import { fetchArticles, deleteArticle } from 'services/api/article';
import emphasisText from 'services/utils/emphasisText';

import { articleColumnsCreator } from './ArticleListing.config'
import { PAGE_PATH, PAGES, EDIT_TYPES } from "constants/index";

import './ArticleListing.scss'

const ArticleListing = () => {
  const { loading, data: listArticle, fetchFail, fetchSuccess, fetchStart } = useLoadData<IArticleList>({
    initialState: [],
  });

  const history = useHistory();

  const [shouldReload, reload] = useState('')

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
  }, [fetchFail, fetchStart, fetchSuccess, limit, page, shouldReload])

  const handleDeleteArticle = async (articleId: string) => {
    try {
      await deleteArticle(articleId);
      message.success("Delete success !!!")
      reload(new Date().toISOString())
    } catch (error: any) {
      message.error("Fail to delete with error: " + error?.response?.data?.message)
    }
  }

  const renderTitle = (title: string, record: IArticle) => (
    <Link to={`/edit/${EDIT_TYPES[PAGES.ARTICLE_DETAIL]}/${record.id}`}>
      {emphasisText(title, 25)}
    </Link>
  )
  const renderAuthor = (text: any) => <span>{text.name}</span>
  const renderLastEdit = (text: string) => <span>{new Date(text).toLocaleDateString("vi")}</span>
  const renderDescription = (text: string) => <span>{emphasisText(text, 25)}</span>

  const renderActionGroup = (article: IArticle) => {
    const onDelete = () => {
      Modal.confirm({
        title: "Warning",
        content: "Article can not be restore when deleted. Do you want to keep this action ?",
        okText: "Confirm",
        cancelText: "Cancel",
        onOk: () => {
          handleDeleteArticle(article.id)
        }
      })
    }

    const onEdit = () => {
      history.push(`/edit/${EDIT_TYPES[PAGES.ARTICLE_DETAIL]}/${article.id}`)
    }
    return <ActionGroup handleDelete={onDelete} handleEdit={onEdit} />
  }

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
