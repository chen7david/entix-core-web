import { Button, Form, Input, Card, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmResetPassword, resetPassword } from 'aws-amplify/auth';
import { AuthHeader } from '../components/auth/AuthHeader';

interface ResetForm {
  code: string;
  newPassword: string;
  confirmPassword: string;
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleResendCode = async () => {
    try {
      await resetPassword({ username: email });
      message.success('New recovery code sent! Please check your email.');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to send recovery code');
    }
  };

  const onFinish = async (values: ResetForm) => {
    if (!email) {
      message.error('Email not found. Please start the recovery process again.');
      navigate('/forgot-password');
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: values.code,
        newPassword: values.newPassword,
      });
      message.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to reset password');
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
        <AuthHeader />
        <Card className="w-full max-w-md shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Invalid Access</h1>
            <p className="text-gray-600 mt-2">Please start the recovery process again.</p>
            <Button type="link" onClick={() => navigate('/forgot-password')}>
              Go to Password Recovery
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
          <h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="text-gray-600 font-light mt-2">
            Enter the code sent to <br />
            <span className="font-medium">{email}</span>
          </p>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <div className="space-y-1">
            <Form.Item
              label="Recovery Code"
              name="code"
              rules={[{ required: true, message: 'Please input the recovery code!' }]}
            >
              <Input size="large" maxLength={6} />
            </Form.Item>

            <div className="flex items-center justify-between px-1 mb-6">
              <span className="text-sm text-gray-500">Didn't receive the code?</span>
              <Button
                type="link"
                onClick={handleResendCode}
                className="text-sm p-0 h-auto flex items-center"
              >
                Resend code
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6" />

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 8, message: 'Password must be at least 8 characters!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!',
              },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;
