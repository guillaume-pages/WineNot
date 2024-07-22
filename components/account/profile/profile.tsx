import { ModifMail } from '@/components/account/profile/ModifMail';
import { ModifNames } from '@/components/account/profile/ModifNames';

export const Profile = () => {
  return (
    <div>
      <ModifNames />
      <ModifMail />
    </div>
  );
};
