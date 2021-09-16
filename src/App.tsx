import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PAGES, PAGE_PATH } from 'constants/index'

import Layout from 'components/Layout'

import 'antd/dist/antd.css';
import './themes/global.scss';

const ArticleListing = lazy(() => import('pages/ArticleListing'))
const UserListing = lazy(() => import('pages/Users'))
const WriterListing = lazy(() => import('pages/Writers'))
const CreateArticle = lazy(() => import('pages/CreateArticle'))

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={PAGE_PATH[PAGES.ARTICLE_LISTING]} component={ArticleListing} />
            <Route path={PAGE_PATH[PAGES.USER]} component={UserListing} />
            <Route path={PAGE_PATH[PAGES.WRITER]} component={WriterListing} />
            <Route path={PAGE_PATH[PAGES.CREATE_ARTICLE]} component={CreateArticle} />
            <Route path="*" />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
