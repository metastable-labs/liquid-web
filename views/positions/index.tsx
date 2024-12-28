"use client";
import { positions } from "./dummy";
import PositionCard from "./position-card";

const Positions = () => {
  return (
    <div className="pt-3 pb-9 px-3.5 self-stretch flex flex-col gap-6 xl:max-w-[500px]">
      {positions.map((position, index) => (
        <PositionCard key={index} {...position} />
      ))}
    </div>
  );
};

export default Positions;
