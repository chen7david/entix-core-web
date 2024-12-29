import { Card, Descriptions, Button, Form, Input, message, Tabs, Upload } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { updatePassword } from 'aws-amplify/auth';
import { useState } from 'react';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

const { TabPane } = Tabs;

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

function ProfilePage() {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const getSignedUrl = async (file: RcFile) => {
    try {
      const fileExtension = file.name.split('.').pop();
      const key = `${user?.username}.${fileExtension}`;

      const url = new URL(`${import.meta.env.VITE_S3_API_URL}/api/v1/sign-upload-url`);
      url.searchParams.append('contentType', file.type);
      url.searchParams.append('key', key);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
      });

      if (!response.ok) throw new Error('Failed to get signed URL');
      return await response.json();
    } catch (error) {
      message.error('Failed to get upload URL');
      throw error;
    }
  };

  const uploadToS3 = async (signedUrl: string, file: RcFile) => {
    try {
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) throw new Error('Failed to upload to S3');
      return response;
    } catch (error) {
      message.error('Failed to upload image');
      throw error;
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }

    return isImage && isLt2M;
  };

  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setLoading(false);
      setImageUrl(info.file.url);
      message.success('Profile picture updated successfully!');
    }
  };

  const customUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;

    try {
      const { signedUrl, fileUrl } = await getSignedUrl(file);
      await uploadToS3(signedUrl, file);
      onSuccess({ url: fileUrl });
    } catch (error) {
      onError(error);
    }
  };

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
              <div className="flex flex-col items-center mb-8">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={customUpload}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  accept="image/*"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover"
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      {loading ? <LoadingOutlined /> : <UserOutlined style={{ fontSize: 32 }} />}
                    </div>
                  )}
                </Upload>
                <p className="text-sm text-gray-500 mt-2">Drag an image here or click to upload</p>
              </div>

              <Descriptions bordered column={1}>
                <Descriptions.Item label="Email">{user?.username}</Descriptions.Item>
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
