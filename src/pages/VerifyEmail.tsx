import { Button, Form, Input, Card, message } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { AuthHeader } from '../components/auth/AuthHeader';

function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onFinish = async (values: { code: string }) => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: values.code,
      });
      message.success('Email verified successfully!');
      navigate('/login');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Verification failed!');
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      message.success('Verification code resent!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to resend code!');
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
        <AuthHeader />
        <Card className="w-full max-w-md shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Invalid Access</h1>
            <p className="text-gray-600 mt-2">Please sign up first.</p>
            <Button type="link" onClick={() => navigate('/register')}>
              Go to Sign Up
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <AuthHeader />
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 font-light mt-2">
            We've sent a verification code to <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Verification Code"
            name="code"
            rules={[{ required: true, message: 'Please input the verification code!' }]}
          >
            <Input size="large" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Verify Email
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Button type="link" onClick={handleResendCode}>
              Resend verification code
            </Button>
          </div>
        </Form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Wrong email?{' '}
            <Link to="/register" className="text-blue-600">
              Sign up again
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default VerifyEmailPage;
