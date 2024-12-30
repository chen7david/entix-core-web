import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Link to="/">
        <button className="h-12 px-8">Home</button>
      </Link>
    </div>
  );
};
