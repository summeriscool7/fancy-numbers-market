
import React, { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function - In a real app, this would verify credentials with a backend
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock authentication - Replace with real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API delay
      
      // In a real app, this would come from a backend response
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name: email.split('@')[0],
      };
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name || email}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      // Mock signup - Replace with real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API delay
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        name: name || email.split('@')[0],
      };
      
      // Save user to state and localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Your account was created successfully!",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Update profile
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
