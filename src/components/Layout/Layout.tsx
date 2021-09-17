import { Layout as AntLayout } from 'antd';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext, { DEFAULT_AUTH_VALUE } from 'context/authContext';
import { identifyUser } from 'services/api/auth';

import { IUserInfo } from 'interfaces';

import { PAGE_PATH, PAGES } from 'constants/index';

import Header from './Header/Header';
import Sider from './Sider/Sider';

import './layout.scss';
interface IProps {
  className?: string,
  children: ReactNode
};

const { Content } = AntLayout;

const Layout = (props: IProps): ReactElement => {
  const { children, className } = props;

  const history = useHistory();
  const [auth, setAuth] = useState(DEFAULT_AUTH_VALUE);

  useEffect(() => {
    const asyncLoadUserInfo = async () => {
      try {
        const userData = await identifyUser();

        setAuth({
          loaded: true,
          authenticated: true,
          userInfo: userData.data,
        });
      } catch (error) {
        setAuth({
          loaded: true,
          authenticated: false,
          userInfo: {} as IUserInfo
        })
      }
    };

    asyncLoadUserInfo();
  }, [history]);

  const shouldHideDefaultLayout = window.location.pathname === PAGE_PATH[PAGES.LOGIN]


  return (
    <AntLayout className='l-layout'>
      <AuthContext.Provider value={auth}>
        {!shouldHideDefaultLayout && <Header />}
        <AntLayout className="l-layout__content">
          {!shouldHideDefaultLayout && <Sider />}
          <AntLayout className="l-layout__main-content">
            <Content id='main' className={className}>
              {children}
            </Content>
          </AntLayout>
        </AntLayout>
      </AuthContext.Provider>
    </AntLayout>
  );
};

export default Layout;
