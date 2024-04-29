import Image from 'next/image';

export default function Avatar() {
  return (
    <div className="avatar">
      <div className="w-9 rounded-full">
        <Image
          alt='Avatar'
          width={512}
          height={512}
          src="/images/Ellipse-6.png"
          />
      </div>
    </div>
  );
}
