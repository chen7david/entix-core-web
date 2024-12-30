import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/profile">
        <button className="h-12 px-8">Profile</button>
      </Link>
    </div>
  );
};
