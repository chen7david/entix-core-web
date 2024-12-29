import { Button } from 'antd';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="flex items-center gap-x-4 mb-8">
              <img src="./logo.svg" alt="Entix Logo" className="h-12 w-12" />
              <span className="text-2xl font-bold text-indigo-600">Entix</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              The Smart Way to Learn and Grow
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-light">
              Experience the future of education with Entix. Our AI-powered platform combines
              intelligent course management with advanced analytics to create learning experiences
              that adapt to you.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/register">
                <Button type="primary" size="large" className="h-12 px-8">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="large" className="h-12 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">
            Smart Learning
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">
            Everything you need to accelerate your education
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <div className="text-xl font-semibold leading-7 text-gray-900">{feature.name}</div>
                <div className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'AI-Powered Learning',
    description: 'Personalized learning paths adapted to your pace and style.',
  },
  {
    name: 'Advanced Analytics',
    description: 'Deep insights into learning patterns and progress tracking.',
  },
  {
    name: 'Interactive Content',
    description: 'Engage with dynamic course materials and real-time feedback.',
  },
];

export default HomePage;
