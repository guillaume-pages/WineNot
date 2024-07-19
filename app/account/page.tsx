import MenuDisplayPhone from '@/components/account/menu-display';
import UserInfoDisplayPhone from '@/components/account/user-info';

export default async function ProfilePage() {
  return (
    <section className="mx-auto mt-6 flex flex-col sm:max-w-5xl sm:rounded-md sm:border">
      {/* AVATAR */}
      <UserInfoDisplayPhone />
      {/* MENU SETTINGS */}
      <hr className="md: md:w-/5 mx-auto my-4 w-5/6 border-neutral-300 lg:w-3/5" />
      <MenuDisplayPhone />
    </section>
  );
}
