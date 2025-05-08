
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from './Logo';
import Avatar from './Avatar';
import { useAuth } from '@/hooks/useAuth';

const NavBar = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="bg-background border-b shadow-sm py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search languages, groups..." 
              className="w-full pl-8" 
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
              
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Avatar user={user} />
                </Link>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-gradient">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
