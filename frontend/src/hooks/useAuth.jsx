
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Create Auth Context
const AuthContext = createContext();

// Mock user data for demonstration
const DEMO_USERS = [
  {
    id: 1,
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    languages: [
      { name: 'English', level: 'Native' },
      { name: 'Spanish', level: 'Intermediate' }
    ]
  },
  {
    id: 2,
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Doe',
    languages: [
      { name: 'French', level: 'Advanced' },
      { name: 'German', level: 'Beginner' }
    ]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const foundUser = DEMO_USERS.find(
        u => (u.email === email || u.username === email) && u.password === password
      );
      
      if (foundUser) {
        // Remove password from user object
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        toast({
          title: "Success!",
          description: "You've successfully logged in",
        });
        return true;
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
      setIsLoading(false);
    }, 1000);
  };

  const signup = (userData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check if user already exists
      const userExists = DEMO_USERS.some(
        u => u.email === userData.email || u.username === userData.username
      );
      
      if (userExists) {
        toast({
          title: "Signup Failed",
          description: "Email or username already in use",
          variant: "destructive",
        });
        setIsLoading(false);
        return false;
      }
      
      // Create new user
      const newUser = {
        id: DEMO_USERS.length + 1,
        ...userData,
        languages: []
      };
      
      // In a real app, this would add the user to the database
      
      // Remove password from user object for state
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Success!",
        description: "Your account has been created",
      });
      
      setIsLoading(false);
      return true;
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You've been logged out successfully",
    });
  };

  const updateProfile = (updatedData) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem('currentUser', JSON.stringify(updated));
      return updated;
    });
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };

  const authValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
