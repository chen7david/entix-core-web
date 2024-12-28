import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="min-h-screen">
      {/* Add your header, navigation, etc. here */}
      <main>
        <Outlet />
      </main>
      {/* Add your footer here */}
    </div>
  );
}

export default RootLayout;
