import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { siderConfig } from './Sider.config';

const { Sider: AntSider } = Layout

const Sider = () => {
  const location = useLocation();

  const selectedKeys = [location.pathname];

  return (
    <AntSider
      width={200}
      theme="dark"
      className="ce-sider"
      collapsible
    >
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedKeys}
        className="ce-sider__menu"
        style={{ height: '100%', borderRight: 0 }}
      >
        {
          siderConfig.map(({ Icon, label, path }) => (
            <Menu.Item key={path} icon={<Icon />}>
              <Link to={path}>
                {label}
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    </AntSider>
  )
}

export default Sider
