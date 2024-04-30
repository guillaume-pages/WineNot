import MenuDisplayPhone from '../ui/profile/menu-display';
import UserInfoDisplayPhone from '../ui/profile/user-info';

export default async function ProfilePage() {
  
      return (
    <div className="mx-2 w-auto flex-col items-center md:mx-auto md:w-4/5 lg:w-3/5">
      {/* AVATAR */}
      <UserInfoDisplayPhone />
      {/* MENU SETTINGS */}
      <hr className="md: mx-auto my-4 w-5/6 border-neutral-300 md:w-/5 lg:w-3/5" />
      <MenuDisplayPhone />
    </div>
  );
}
