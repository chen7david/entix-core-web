import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signIn, signOut, signUp, getCurrentUser, type AuthUser } from 'aws-amplify/auth';
import { Hub } from '@aws-amplify/core';

interface AuthContextType {
  user: any;
  signIn: (username: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  signUp: (username: string, password: string, email: string) => Promise<any>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    const listener = Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          checkUser();
          break;
        case 'signedOut':
          setUser(null);
          break;
      }
    });

    return () => listener();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }
    setLoading(false);
  }

  const handleSignIn = (username: string, password: string) => {
    return signIn({ username, password });
  };

  const handleSignOut = () => {
    return signOut();
  };

  const handleSignUp = (username: string, password: string, email: string) => {
    return signUp({
      username,
      password,
      options: {
        userAttributes: { email },
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
