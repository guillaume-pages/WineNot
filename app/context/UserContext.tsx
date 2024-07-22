import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { useSession } from 'next-auth/react';

import type { User } from '@/types/user.type';

import { getUser } from '@/app/lib/user/user.get';

const defaultValues: User = {
  user_id: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  status: '',
  created_at: '',
  updated_at: '',
  image: '',
  email_verified_at: '',
};

export const UserContext = createContext<User>(defaultValues);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { data } = useSession();
  const [user, setUser] = useState<User>(defaultValues);

  useEffect(() => {
    if (data?.user?.id) {
      getUser(data.user.id)
        .then((fetchedUser) => {
          setUser(fetchedUser);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [data?.user?.id]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};