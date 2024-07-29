import { ModifAvatar } from '@/components/account/profile/modif-avatar';
import { ModifMail } from '@/components/account/profile/modif-mail';
import { ModifNames } from '@/components/account/profile/modif-names';
import { ModifPhone } from '@/components/account/profile/modif-phone';

export const Profile = () => {
  return (
    <div className='space-y-4'>
      <ModifAvatar />
      <ModifNames />
      <ModifPhone />
      <ModifMail />
    </div>
  );
};
