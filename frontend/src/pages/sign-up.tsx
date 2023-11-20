import React, { useContext, useMemo } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../interfaces/User';

const SignUp: React.FC = () => {
  const { register } = useContext(UserContext) as UserContextType;

  const Context = React.createContext({ name: 'Default' });
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const onFinish = async (values: any) => {
    const resp = await register(values);
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
      navigate('/login');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    fullName?: string;
  };

  let navigate = useNavigate();
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
            Welcome to Google Classroom
          </h1>
        </div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Full Name'
            name='fullName'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

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
              Register
            </Button>
            <p>
              <span>
                Already have an account?{' '}
                <Button type='default' onClick={() => navigate('/login')}>
                  Login
                </Button>
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </Context.Provider>
  );
};

export default SignUp;
