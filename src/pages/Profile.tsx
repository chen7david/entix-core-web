import { Card, Descriptions } from 'antd';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <Card title="Profile Information" className="max-w-2xl mx-auto">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Email">{user?.username}</Descriptions.Item>
          {/* Add more user information as needed */}
        </Descriptions>
      </Card>
    </div>
  );
}

export default ProfilePage;
