import React, { useContext, useMemo } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../interfaces/User';

const EditUser: React.FC = () => {
  const {
    update,
    userState: { userId, fullName },
  } = useContext(UserContext) as UserContextType;

  const Context = React.createContext({ name: 'Default' });
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
  const onFinish = async (values: any) => {
    const resp = await update({ ...values, userId });
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
      api.success({
        message: 'Success',
        description: (
          <Context.Consumer>
            {() => `Your account information has been updated`}
          </Context.Consumer>
        ),
        placement: 'topRight',
        duration: 2,
      });
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    password?: string;
    fullName?: string;
  };
  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType> label='Your Name' name='fullName'>
          <Input placeholder={fullName} />
        </Form.Item>

        <Form.Item<FieldType> label='Password' name='password'>
          <Input placeholder={'******'} type='password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Context.Provider>
  );
};

export default EditUser;
