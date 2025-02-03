const InfoCard = ({ title, children }: InfoCardProps) => (
  <div className="flex-1 flex flex-col gap-4">
    <h2 className="text-primary-2350 text-[clamp(16px,5vw,19.7px)] leading-[clamp(23px,5vw,26px)] font-medium">
      {title}
    </h2>

    <div className="self-stretch border border-primary-150 rounded-2xl p-4 flex-1">
      {children}
    </div>
  </div>
);

export default InfoCard;
