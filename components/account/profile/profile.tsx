import { ModifMail } from '@/components/account/profile/modif-mail';
import { ModifNames } from '@/components/account/profile/modif-names';
import { ModifAvatar } from './modif-avatar';

export const Profile = () => {
  return (
    <div className='space-y-4'>
      <ModifAvatar />
      <ModifNames />
      <ModifMail />
    </div>
  );
};
