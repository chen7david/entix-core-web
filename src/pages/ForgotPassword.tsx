import { Button, Form, Input, Card, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from 'aws-amplify/auth';

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string }) => {
    try {
      await resetPassword({ username: values.email });
      message.success('Recovery code sent! Please check your email.');
      navigate('/reset-password', { state: { email: values.email } });
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to send recovery code');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 font-light mt-2">
            Enter your email to receive a recovery code
          </p>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Send Recovery Code
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default ForgotPasswordPage;
