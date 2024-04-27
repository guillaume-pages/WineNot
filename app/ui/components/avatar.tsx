import Image from 'next/image';

export default function Avatar() {
  return (
    // <div className="flex items-center">
    //   <div className="relative w-10 h-10 rounded-full overflow-hidden">
    //     <Image
    //       alt="Avatar"
    //       className="w-full h-full object-cover"
    //       src="/images/default.png"
    //       width={20}
    //       height={20}
    //     />
    //   </div>
    // </div>
    <div className="avatar">
      <div className="mask mask-squircle">
        <Image
          alt='Avatar'
          width={36}
          height={36}
          src="/images/default.png"
          />
      </div>
    </div>
  );
}
