import ChoosingTheme from '../components/choosing-theme';
import MenuDisplayPhone from './menu-display-phone';
import UserInfoDisplayPhone from './user-info-display-phone';

export default function DisplayPhone() {
  return (
    <div className="mx-2 w-auto flex-col items-center md:hidden">
      {/* AVATAR */}
      <UserInfoDisplayPhone />
      {/* MENU SETTINGS */}
      <hr className="mx-auto my-4 w-5/6 border-neutral-300" />
        <MenuDisplayPhone />
      
      <div className="flex pt-6">
        <ChoosingTheme />
      </div>
    </div>
  );
}
