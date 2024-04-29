import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DisplayPhone from '../ui/profile/display-phone';

export default async function ProfilePage() {
  const session = await auth();

  if(!session?.user){
    return redirect("/api/auth/signin")
  }

  return (
    <>
      <DisplayPhone />
    </>
  );
}