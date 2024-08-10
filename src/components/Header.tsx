import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { User } from '@supabase/supabase-js'; // Import User type

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Update state type

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    fetchUser();
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Market App</div>
        <div>
          {user ? (
            <div>{user.email}</div>
          ) : (
            <div>
              <a href="/login" className="mr-4">Login</a>
              <a href="/register">Register</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;