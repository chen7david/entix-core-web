import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { RouterContent } from './routes';

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
        <HashRouter>
          <RouterContent />
        </HashRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
