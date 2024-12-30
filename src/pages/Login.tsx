import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/profile">
        <button className="h-12 px-8">profile</button>
      </Link>
    </div>
  );
};
