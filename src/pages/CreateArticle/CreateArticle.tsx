import PageHeader from 'components/PageHeader'
import ArticleForm from 'components/ArticleForm';

import './CreateArticle.scss'

const CreateArticle = () => {
  return (
    <div className="page-create-article">
      <PageHeader
        title="Create new article"
      />
      <ArticleForm />
    </div>
  )
}

export default CreateArticle
