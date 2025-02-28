const StepTexts = ({ description, title }: IStepTexts) => (
  <div className="flex flex-col gap-4 self-stretch">
    <h1 className="text-[24px] leading-[26.88px] tracking-[-0.6px] text-primary-950 font-medium">
      {title}
    </h1>

    <p className="text-[16px] leading-[19.84px] text-primary-1700">
      {description}
    </p>
  </div>
);

export default StepTexts;
