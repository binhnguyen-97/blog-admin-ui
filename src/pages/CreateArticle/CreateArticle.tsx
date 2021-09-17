import { message } from 'antd';
import { useHistory } from 'react-router-dom';

import ArticleForm from 'components/ArticleForm';
import PageHeader from 'components/PageHeader';

import { PAGES, PAGE_PATH } from 'constants/index';
import { CreateArticlePayload } from 'interfaces';
import { createArticle as createArticleApi } from 'services/api/article';

import './CreateArticle.scss';


const CreateArticle = () => {
  const history = useHistory();

  const handleSubmitForm = async (articlePayload: CreateArticlePayload) => {
    try {
      await createArticleApi(articlePayload);
      message.success("Create article success")

      history.push(PAGE_PATH[PAGES.ARTICLE_LISTING])
    } catch (error: any) {
      message.error("Fail to create article with error: " + error.toString())
    }
  }

  return (
    <div className="page-create-article">
      <PageHeader
        title="Create new article"
      />
      <ArticleForm
        handleSubmitForm={handleSubmitForm}
      />
    </div>
  )
}

export default CreateArticle
