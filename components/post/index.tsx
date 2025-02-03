"use client";
import Image from "next/image";
import moment from "moment";
import classNames from "classnames";

import { HeartIcon, RepostIcon, ReplyIcon } from "@/public/icons";
import { formatNumberWithSuffix } from "@/utils/helpers";

const dummyAvatar =
  "https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg";

const LWPost = ({ post }: ILWPost) => {
  const others = [
    {
      icon: <ReplyIcon height={16} width={16} />,
      count: formatNumberWithSuffix(post?.comments),
    },
    {
      icon: <RepostIcon height={16} width={16} />,
      count: formatNumberWithSuffix(post?.reposts),
    },
    {
      icon: <HeartIcon height={16} width={16} />,
      count: formatNumberWithSuffix(post?.likes),
    },
  ];

  const formattedDate = moment(post.createdAt).format("MMM D, hh:mm A");

  return (
    <div className="self-stretch flex items-stretch gap-2">
      <Image
        src={post.user.avatar || dummyAvatar}
        alt={`${post?.user?.name} avatar`}
        width={40}
        height={40}
        quality={100}
        className="rounded-full w-10 h-10 object-cover"
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <h3 className="text-sm text-primary-2350 font-bold">
              {post.user.name}
            </h3>
            <span className="text-xs text-primary-100">
              @{post.user.username}
            </span>
          </div>

          <div className="w-0.5 h-0.5 bg-primary-2450 rounded-full" />

          <span className="text-xs text-primary-100">{formattedDate}</span>
        </div>

        <p className="text-primary-1700 text-sm">{post?.content}</p>

        <div className="self-stretch flex items-center gap-4 mt-1">
          {others.map(({ count, icon }, index) => (
            <div
              key={index}
              className="flex items-center gap-1 transition-all duration-300 ease-in-out"
            >
              {icon}
              <span className="font-medium text-sm">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LWPost;
