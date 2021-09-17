import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PAGES, PAGE_PATH } from 'constants/index'

import Layout from 'components/Layout'
import ProtectedRoute from 'components/ProtectedRoute';
import LoadingSpin from 'components/LoadingSpin';

import 'antd/dist/antd.css';
import './themes/global.scss';

const LoginPage = lazy(() => import('pages/LoginPage'))

const HomePage = lazy(() => import('pages/HomePage'))
const ArticleListing = lazy(() => import('pages/ArticleListing'))
const UserListing = lazy(() => import('pages/Users'))
const WriterListing = lazy(() => import('pages/Writers'))
const CreateArticle = lazy(() => import('pages/CreateArticle'))

const EditPage = lazy(() => import('pages/EditPage'))

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpin />}>
          <Switch>
            <ProtectedRoute path={PAGE_PATH[PAGES.ARTICLE_LISTING]} component={ArticleListing} />
            <ProtectedRoute path={PAGE_PATH[PAGES.USER]} component={UserListing} />
            <ProtectedRoute path={PAGE_PATH[PAGES.WRITER]} component={WriterListing} />
            <ProtectedRoute path={PAGE_PATH[PAGES.CREATE_ARTICLE]} component={CreateArticle} />
            <ProtectedRoute path={PAGE_PATH[PAGES.EDIT]} component={EditPage} />
            <ProtectedRoute path={PAGE_PATH[PAGES.HOMEPAGE]} component={HomePage} exact />
            <Route path={PAGE_PATH[PAGES.LOGIN]} component={LoginPage} />
            <Route path="*" />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
