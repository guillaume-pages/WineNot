import MenuDisplay from '../../components/account/menu-display';
import UserInfoDisplay from '../../components/account/user-info';

export default async function ProfilePage() {
  return (
    <section className="mx-auto mt-6 flex flex-col max-w-5xl md:max-w-4xl lg:border lg:rounded-md">
      {/* AVATAR */}
      <UserInfoDisplay />
      {/* MENU SETTINGS */}
      <hr className="md: md:w-/5 mx-auto my-4 w-5/6 border-neutral-300 lg:w-3/5" />
      <MenuDisplay />
    </section>
  );
}
