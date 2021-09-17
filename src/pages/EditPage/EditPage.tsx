import { useEffect } from 'react';
import { useParams } from "react-router"
import { message, Spin } from 'antd';

import useLoadData from 'hooks/useLoadData';

import { CreateArticlePayload, IArticle, IWriter } from 'interfaces'
import { fetchArticleDetail, updateArticle } from 'services/api/article'
import ArticleForm, { ArticleFormProps } from 'components/ArticleForm';

import { PAGES, EDIT_TYPES } from 'constants/index'

import './EditPage.scss';

const getFetchMethodByType = (type: string) => {
  switch (type) {
    case EDIT_TYPES[PAGES.ARTICLE_DETAIL]:
      return fetchArticleDetail
    default:
      return fetchArticleDetail
  }
}

const getFormByType = (type: string) => {
  switch (type) {
    case EDIT_TYPES[PAGES.ARTICLE_DETAIL]:
      return ArticleForm
    default:
      return ArticleForm
  }
}

const getPropsByType = (type: string, data: AcceptType) => {
  switch (type) {
    case EDIT_TYPES[PAGES.ARTICLE_DETAIL]:
      {
        const handleSubmitForm = async (values: CreateArticlePayload) => {
          try {
            await updateArticle(data.id, values)
            message.success("Update article success !!!")
          } catch (error: any) {
            message.error("Update fail with error: " + error.toString())
          }
        }
        return {
          handleSubmitForm,
          initValues: data as IArticle
        }
      }
    default:
      {
        return {

        }
      }
  }
}

type AcceptType = IArticle | IWriter
type CombineFormType = ArticleFormProps;

const EditPage = () => {
  const params = useParams();
  const { loading, fetchStart, fetchSuccess, fetchFail, data } = useLoadData<AcceptType>({ initialState: {} as AcceptType })

  const { id, type } = params as any;

  useEffect(() => {
    const fetchData = async () => {
      const fetchFunc = getFetchMethodByType(type)
      try {
        fetchStart()
        const result = await fetchFunc(id)
        fetchSuccess(result.data)
      } catch (error) {
        console.error(error)
        fetchFail()
      }
    }
    fetchData()
  }, [fetchFail, fetchStart, fetchSuccess, id, type])


  const Form = getFormByType(type);

  const formProps = getPropsByType(type, data) as CombineFormType

  return (
    <div className="page-edit">
      <Spin spinning={loading}>
        <Form
          {...formProps}
        />
      </Spin>
    </div>
  )
}

export default EditPage
