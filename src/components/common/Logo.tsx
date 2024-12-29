import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <Link to="/" className={`flex items-center gap-x-2 w-fit ${className}`}>
      <img src="./logo.svg" alt="Entix Logo" className={sizes[size]} />
      <span className={`font-semibold text-indigo-600 ${size === 'lg' ? 'text-2xl' : 'text-xl'}`}>
        Entix
      </span>
    </Link>
  );
}
