import React, { useState, useContext } from 'react';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, Avatar, Space, Dropdown, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { UserContextType } from './interfaces/User';
import EditUser from './pages/edit-user';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const { logout } = useContext(UserContext) as UserContextType;
  const [collapsed, setCollapsed] = useState(false);
  const [content, setContent] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => setContent('profile')}>My Profile</div>,
      key: '0',
    },
    {
      label: (
        <div
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </div>
      ),
      key: '1',
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: '100vh' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            marginTop: '20px',
          }}
        >
          {!collapsed ? (
            <>
              <img
                src='https://www.gstatic.com/classroom/logo_square_rounded.svg'
                className='UAJaRc'
                alt='Google Classroom'
                data-iml='1866.0999999046326'
              />
              <span className='rpo4wf-J3yWx'>Classroom</span>
            </>
          ) : (
            <></>
          )}
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Calendar',
            },
            {
              key: '3',
              icon: <LoginOutlined />,
              label: 'Enrolled',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginLeft: '20px',
            }}
          />
          <Space
            direction='vertical'
            size={16}
            style={{ paddingRight: '20px' }}
          >
            <Dropdown menu={{ items }}>
              <Space wrap size={16}>
                <Avatar size='large' icon={<UserOutlined />} />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {content === 'profile' ? (
            <EditUser />
          ) : (
            <h2>Welcome to Google Classroom!</h2>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
