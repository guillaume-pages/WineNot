import { ModifMail } from '@/components/account/profile/modif-mail';
import { ModifNames } from '@/components/account/profile/modif-names';

export const Profile = () => {
  return (
    <div>
      <ModifNames />
      <ModifMail />
    </div>
  );
};
