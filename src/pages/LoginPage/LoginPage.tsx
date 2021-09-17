import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parseUrl } from 'query-string'
import { Form, Input, Typography, Button, Alert } from 'antd'

import AuthContext from 'context/authContext';

import { loginApi } from 'services/api/auth'
import { setCookie } from 'services/utils/cookies';

import './LoginPage.scss'

const LoginPage = () => {
  const history = useHistory()
  const { authenticated } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (authenticated) {
      const { query } = parseUrl(window.location.href)
      const { continue: targetUrl } = query

      window.location.href = targetUrl as string || '/';
    }
  }, [authenticated, history])

  const handleLogin = async (values: any) => {
    try {
      const result = await loginApi(values)

      console.info(result)

      setCookie('privateToken', result.data.privateToken)

      const { query } = parseUrl(window.location.href);
      const { continue: targetUrl } = query;

      window.location.href = targetUrl as string || '/';
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || error.toString())
    }
  }

  return (
    <div className="page-login">
      <Form layout="vertical" className="page-login__form" onFinish={handleLogin}>
        <Typography.Title>Login</Typography.Title>
        <Form.Item label="Email" name="email" rules={[{
          required: true,
          pattern: /\S+@\S+\.\S+/,
          message: "Email is invalid"
        }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{
            required: true,
            min: 8,
            message: "Password is invalid"
          }]}
        >
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
        {errorMessage && <Alert
          showIcon
          message={errorMessage}
          type="error"
          className="page-login__alert"
        />}
      </Form>
    </div>
  )
}

LoginPage.propTypes = {

}

export default LoginPage
