import { Card, Descriptions, Button, Form, Input, message, Tabs } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword } from 'aws-amplify/auth';

const { TabPane } = Tabs;

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ProfilePage() {
  const { user } = useAuth();
  const [form] = Form.useForm();

  const handlePasswordUpdate = async (values: PasswordForm) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        message.error('New passwords do not match!');
        return;
      }

      await updatePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      message.success('Password updated successfully!');
      form.resetFields();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to update password');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <Tabs defaultActiveKey="profile">
          <TabPane tab="Profile Information" key="profile">
            <Card>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Email">{user?.username}</Descriptions.Item>
                {/* Add more user information as needed */}
              </Descriptions>
            </Card>
          </TabPane>

          <TabPane tab="Security" key="security">
            <Card title="Update Password">
              <Form
                form={form}
                layout="vertical"
                onFinish={handlePasswordUpdate}
                className="max-w-md"
              >
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                  <Input.Password />
                </Form.Item>

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
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
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
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default ProfilePage;
