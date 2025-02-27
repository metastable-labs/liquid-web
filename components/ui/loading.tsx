import Image from "next/image";

const UiLoading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center absolute bottom-0 top-0 left-0 z-50">
      <Image
        src="/liquid_loader_desktop.gif"
        alt="loader"
        width={100}
        height={100}
        quality={100}
        className="w-full h-full object-fill hidden lg:block"
      />

      <Image
        src="/liquid_loader_mobile.gif"
        alt="loader"
        width={100}
        height={100}
        quality={100}
        className="w-full h-full object-fill lg:hidden"
      />
    </div>
  );
};

export default UiLoading;
