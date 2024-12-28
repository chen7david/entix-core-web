import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your header, navigation, etc. here */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {/* Add your footer here */}
    </div>
  );
}

export default RootLayout;
