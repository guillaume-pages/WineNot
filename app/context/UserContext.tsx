import React, { createContext, useState, useEffect, ReactNode, FC, useCallback } from 'react';
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
  email_verified_at: false,
};

export const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: defaultValues,
  setUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const { data } = useSession();
  const [user, setUser] = useState<User>(defaultValues);

  const updateUserContext = useCallback(async (userId: string) => {
    try {
      const fetchedUser = await getUser(userId);
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, []);

  useEffect(() => {
    if (data?.user?.id) {
      updateUserContext(data.user.id);
    }
  }, [data?.user?.id, updateUserContext]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
