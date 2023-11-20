import React, { useContext, useMemo } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../interfaces/User';

const SignIn: React.FC = () => {
  const { login } = useContext(UserContext) as UserContextType;

  const Context = React.createContext({ name: 'Default' });
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    const resp = await login(values);
    if (resp.isError) {
      api.error({
        message: 'Error',
        description: (
          <Context.Consumer>{() => `${resp.message}`}</Context.Consumer>
        ),
        placement: 'topRight',
        duration: 2,
      });
    } else {
      navigate('/');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
  };

  let navigate = useNavigate();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className='form-center'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            className='signup__logo'
            src='https://cdn.dribbble.com/userupload/4738234/file/original-447a4c7fb766f8b3ac2bd0e18cdf700c.gif'
            alt='class_room_logo'
          />
          <h1 style={{ width: 500, marginLeft: 30 }}>
            Login to Google Classroom
          </h1>
        </div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 500 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
            <p>
              <span>
                If you don't have an account yet, please{' '}
                <Button type='default' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </Context.Provider>
  );
};

export default SignIn;
