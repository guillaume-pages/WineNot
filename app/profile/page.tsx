'use client';
import MenuDisplay from '@/components/account/MenuDisplay';
import UserInfoDisplay from '@/components/account/UserInfo';

import { UserProvider } from '@/app/context/UserContext';

export default function ProfilePage() {
  return (
    <UserProvider>
      <section className="mx-auto mt-6 flex max-w-5xl flex-col md:max-w-4xl lg:rounded-md lg:border">
        {/* AVATAR */}
        <UserInfoDisplay />
        {/* MENU SETTINGS */}
        <hr className="md: md:w-/5 mx-auto my-4 w-5/6 border-neutral-300 lg:w-3/5" />
        <MenuDisplay />
      </section>
    </UserProvider>
  );
}
