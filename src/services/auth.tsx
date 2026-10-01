import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, pass: string) => Promise<boolean>;
  signOut: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const REGISTERED_ACCOUNTS_KEY = 'creditscore_registered_credentials';

// Seeded default credentials for testing and instant access
const DEFAULT_ACCOUNTS: StoredAccount[] = [
  {
    id: 'usr_default_01',
    name: 'Alex Morgan',
    email: 'user@creditscore.com',
    password: 'Password123',
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: 'usr_default_02',
    name: 'David Miller',
    email: 'david@creditscore.ai',
    password: 'Score2026Password',
    createdAt: '2026-02-10T10:30:00.000Z'
  }
];

function getStoredAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_ACCOUNTS;
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Make sure stored accounts are seeded on mount
    getStoredAccounts();
    // Strictly do not auto-login on startup. User must submit valid credentials to sign in.
    setUser(null);
  }, []);

  const signInWithEmail = async (emailInput: string, passInput: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await new Promise((res) => setTimeout(res, 500));

    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please provide a valid email address.');
      setLoading(false);
      return false;
    }

    if (!cleanPass) {
      setError('Please enter your password.');
      setLoading(false);
      return false;
    }

    const accounts = getStoredAccounts();
    const matchedAccount = accounts.find((acc) => acc.email.toLowerCase() === cleanEmail);

    if (!matchedAccount) {
      setError('Invalid credentials. No account found with this email. Please check your spelling or sign up.');
      setLoading(false);
      return false;
    }

    if (matchedAccount.password !== cleanPass) {
      setError('Invalid credentials. Incorrect password. Please try again.');
      setLoading(false);
      return false;
    }

    // Credentials verified successfully
    const authenticatedUser: User = {
      id: matchedAccount.id,
      name: matchedAccount.name,
      email: matchedAccount.email,
      provider: 'password',
      createdAt: matchedAccount.createdAt
    };

    setUser(authenticatedUser);
    setError(null);
    setLoading(false);
    return true;
  };

  const signUpWithEmail = async (nameInput: string, emailInput: string, passInput: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    await new Promise((res) => setTimeout(res, 500));

    const cleanName = nameInput.trim();
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanPass = passInput.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      setLoading(false);
      return false;
    }

    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return false;
    }

    if (!cleanPass || cleanPass.length < 6) {
      setError('Password must contain at least 6 characters.');
      setLoading(false);
      return false;
    }

    const accounts = getStoredAccounts();
    const alreadyExists = accounts.some((acc) => acc.email.toLowerCase() === cleanEmail);

    if (alreadyExists) {
      setError('An account with this email already exists. Please log in with your credentials.');
      setLoading(false);
      return false;
    }

    const newAccount: StoredAccount = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: cleanName,
      email: cleanEmail,
      password: cleanPass,
      createdAt: new Date().toISOString()
    };

    try {
      const updatedAccounts = [...accounts, newAccount];
      localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    } catch {
      // ignore quota error
    }

    // Do NOT automatically log in after sign up. User must log in with their credentials.
    setUser(null);
    setLoading(false);
    return true;
  };

  const signOut = () => {
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
