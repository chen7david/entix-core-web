import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

function NotFoundPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl mb-4">
          {isRouteErrorResponse(error) ? 'Page not found!' : 'An unexpected error occurred.'}
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
