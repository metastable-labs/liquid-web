"use client";

import { ChevronLeft } from "lucide-react";

import { Button } from "./button";
import { KeypadProps } from "../modal/types";
import classNames from "classnames";

export function Keypad({ onKeyPress, onBackspace, className }: KeypadProps) {
  const keys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "0",
    "backspace",
  ];

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      onBackspace();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className={classNames("grid grid-cols-3 gap-2", className)}>
      {keys.map((key) => (
        <Button
          key={key}
          variant="ghost"
          size="lg"
          onClick={() => handleKeyPress(key)}
          className={classNames(
            "h-14 text-xl font-medium rounded-xl hover:bg-gray-100",
            key === "backspace" && "text-base"
          )}
        >
          {key === "backspace" ? (
            <ChevronLeft size={20} strokeWidth={3} />
          ) : (
            key
          )}
        </Button>
      ))}
    </div>
  );
}
