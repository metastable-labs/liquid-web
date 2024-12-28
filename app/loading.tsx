import Image from "next/image";

const LWSplashScreen = () => (
  <div className="w-screen h-screen bg-white flex items-center justify-center">
    <Image
      src="/images/logo.png"
      alt="logo"
      width={180}
      height={36.5}
      className="object-cover"
      quality={100}
    />
  </div>
);

export default LWSplashScreen;
