import { ModifMail } from '@/components/account/profile/modifMail';
import { ModifNames } from '@/components/account/profile/modifNames';

export const Profile = () => {
  return (
    <div>
      <ModifNames />
      <ModifMail />
    </div>
  );
};
