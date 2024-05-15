import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NextImage from 'next/image';
import imageSrc from '@/public/images/Ellipse-1.png';

const user1 = {
  name: 'John Doe',
  image: '/public/images/Ellipse-1.png',
};

export default function AvatarDisplay() {
  return (
    <>
      <Avatar>
        {user1.image && (
          <NextImage src={imageSrc} alt="Some alt text" width={512} height={512}/>
        )}
        {!imageSrc && <AvatarFallback>John Doe</AvatarFallback>}
      </Avatar>
    </>
  );
}
