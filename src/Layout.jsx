import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;