import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4f46e5',
          colorPrimaryHover: '#4338ca',
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        components: {
          Button: {
            controlHeight: 48,
            paddingInline: 32,
          },
        },
      }}
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
