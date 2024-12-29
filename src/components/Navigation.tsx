import { Button, Layout, Menu } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Logo } from './common/Logo';

const { Header } = Layout;

export function Navigation() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) return null;

  return (
    <Header className="bg-white border-b border-gray-200 px-4 flex justify-between items-center">
      <div className="flex items-center">
        <Logo />
        <Menu mode="horizontal" className="border-none">
          <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
            Profile
          </Menu.Item>
        </Menu>
      </div>
      <Button icon={<LogoutOutlined />} onClick={handleLogout} type="text">
        Logout
      </Button>
    </Header>
  );
}
