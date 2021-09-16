import { ReactElement, useContext } from 'react';
import { Layout, Avatar } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import AuthContext from 'context/authContext';

const { Header: AntHeader } = Layout;

const Header = (): ReactElement => {
  const authContext = useContext(AuthContext);

  const { userInfo } = authContext;

  return (
    <AntHeader className='c-header'>
      <div className='ce-navigate-group'>
        <Link to="/">
          <div className='ce-navigate-group__site-logo'>
            The BiDu Family Blog Admin
          </div>
        </Link>
      </div>
      <div className='ce-user-info'>
        <div className='ce-user-info__user'>
          <Avatar src={userInfo.avatar} alt='avar' />
          <span className='ce-user-name'>
            {userInfo.name}
          </span>
          <DownOutlined className='ce-user-dropdown' />
        </div>
      </div>

    </AntHeader>
  );
};

export default Header;
