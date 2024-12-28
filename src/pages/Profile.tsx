import { Card, Tabs, Avatar, Button, Form, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function ProfilePage() {
  const onFinish = (values: any) => {
    message.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <div className="text-center mb-8">
          <Avatar size={96} icon={<UserOutlined />} className="bg-indigo-600" />
          <h1 className="text-2xl font-bold mt-4 text-gray-900">John Doe</h1>
          <p className="text-gray-600 font-light">john.doe@example.com</p>
        </div>

        <Tabs
          items={[
            {
              key: '1',
              label: 'Profile Settings',
              children: (
                <Form layout="vertical" onFinish={onFinish} initialValues={{ name: 'John Doe' }}>
                  <Form.Item label="Full Name" name="name">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Bio" name="bio">
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: '2',
              label: 'Learning Progress',
              children: (
                <div className="space-y-4">
                  <Card size="small" title="Current Courses">
                    <p>No active courses</p>
                  </Card>
                  <Card size="small" title="Completed Courses">
                    <p>No completed courses</p>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

export default ProfilePage;
