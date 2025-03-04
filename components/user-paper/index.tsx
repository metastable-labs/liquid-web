import Image from "next/image";

const LWUserPaper = ({ user }: { user: Creator }) => (
  <div className="flex items-center gap-2">
    <Image
      src={user.pfp}
      alt={`${user.username} avatar`}
      width={100}
      height={100}
      quality={100}
      className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
    />

    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h1 className="text-[clamp(22px,5vw,28px)] leading-[clamp(27px,5vw,31.36px)] text-primary-2350 font-bold font-QuantaGroteskPro">
          {user.username}
        </h1>

        <span className="text-[clamp(14px,5vw,16px)] leading-[clamp(17px,5vw,19.84px)] text-primary-100">
          @{user.username}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[13px] leading-[16.12px] whitespace-nowrap text-primary-1700">
            {user.followers} followers
          </span>

          <div className="w-[1px] h-4 bg-primary-2450" />

          <span className="text-[13px] leading-[16.12px] whitespace-nowrap text-primary-1700">
            {user.following} following
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://warpcast.com/${user.username}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-[16px] leading-[19.84px] text-primary-450 underline underline-offset-2">
              Warpcast
            </span>
          </a>

          <div className="w-[1px] h-4 bg-primary-2450" />

          <a
            href={`https://twitter.com/${user.username}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-[16px] leading-[19.84px] text-primary-450 underline underline-offset-2">
              X
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default LWUserPaper;
