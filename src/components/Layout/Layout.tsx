import { Layout as AntLayout } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext, { DEFAULT_AUTH_VALUE } from 'context/authContext';
import { identifyUser } from 'services/api/auth';

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
      const userData = await identifyUser();

      if (isEmpty(userData)) {
        history.push(`/login?continue=${encodeURIComponent(window.location.href)}`)
      }

      setAuth({
        loaded: true,
        authenticated: true,
        userInfo: userData.data,
      });
    };

    asyncLoadUserInfo();
  }, [history]);

  return (
    <AntLayout className='l-layout'>
      <AuthContext.Provider value={auth}>
        <Header />
        <AntLayout className="l-layout__content">
          <Sider />
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
