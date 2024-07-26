import { ModifMail } from '@/components/account/profile/modif-mail';
import { ModifNames } from '@/components/account/profile/modif-names';
import { ModifAvatar } from './modif-avatar';

export const Profile = () => {
  return (
    <div>
      <ModifAvatar />
      <ModifNames />
      <ModifMail />
    </div>
  );
};
