import { ConfigProvider } from 'antd';
import { HashRouter } from 'react-router-dom';
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
          controlHeight: 40,
          controlHeightLG: 48,
          controlHeightSM: 32,
          marginXS: 8,
          marginSM: 12,
          marginMD: 16,
          marginLG: 24,
          marginXL: 32,
        },
        components: {
          Button: {
            controlHeight: 48,
            paddingInline: 32,
          },
          Menu: {
            itemHeight: 48,
            itemHoverBg: 'rgba(0, 0, 0, 0.04)',
          },
          Upload: {
            actionsClassName: 'upload-actions',
          },
        },
        legacy: {
          targetContainer: false,
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
