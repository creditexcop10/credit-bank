import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background gap-6">
      <div className="loader-wrapper">
        <div className="loader-ring" />
        
        {/* Logo perfectly centered inside the ring */}
        <Image
          src="/icon.png"
          alt="CreditExpo"
          width={100}
          height={40}
          className="relative z-10 h-8 w-auto dark:hidden"
          priority
        />
        <Image
          src="/icon.png"
          alt="CreditExpo"
          width={100}
          height={40}
          className="relative z-10 hidden h-8 w-auto dark:block"
          priority
        />
      </div>
    </div>
  );
}