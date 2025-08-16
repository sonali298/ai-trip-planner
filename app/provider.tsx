"use client"; // Add this directive at the very top

import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'; 
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetails, setUserDetails] = useState<any>();

  useEffect(() => {
    const saveNewUser = async () => {
      if (user) {
        const result = await createUser({
          email: user.primaryEmailAddress?.emailAddress ?? '',
          imageUrl: user.imageUrl ?? '',
          name: user.fullName ?? ''
        });
        setUserDetails(result);
      }
    };
    
    if (user) {
      saveNewUser();
    }
  }, [user, createUser]);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
}