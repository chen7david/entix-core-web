import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

const { Content } = Layout;

function RootLayout() {
  return (
    <Layout className="min-h-screen">
      <Navigation />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default RootLayout;
