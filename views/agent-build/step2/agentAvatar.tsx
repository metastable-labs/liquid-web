import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { LWClickAnimation } from "@/components";
import { EditIcon } from "@/public/icons";
import { AgentAvatarProps } from "../types";

const avatars: { [key: string]: string } = {
  "trade-memecoins": "/images/avatar1.png",
  "provide-liquidity": "/images/avatar2.png",
  "invest-defi": "/images/avatar3.png",
  "liquid-protocol": "/images/avatar4.png",
};

const AgentAvatar = ({ agentFunction, file, setFile }: AgentAvatarProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(avatars[agentFunction] || "");
    }
  }, [file, agentFunction]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  console.log(imageUrl);

  return (
    <div className="rounded-full h-14 w-14 relative">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Agent Avatar"
          fill
          className="rounded-full object-cover"
        />
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <div
        onClick={handleEditClick}
        className="absolute -bottom-1 right-0 cursor-pointer"
      >
        <LWClickAnimation className="w-fit bg-white rounded-full">
          <EditIcon />
        </LWClickAnimation>
      </div>
    </div>
  );
};

export default AgentAvatar;
