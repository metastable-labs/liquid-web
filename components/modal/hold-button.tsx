"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "../../utils/class-name";
import { HoldButtonProps } from "./types";

export function HoldButton({
  children,
  onHoldComplete,
  holdDuration = 1000,
  className,
  ...props
}: HoldButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimeoutRef = useRef<NodeJS.Timeout>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>(null);

  const startHolding = () => {
    setIsHolding(true);
    setHoldProgress(0);

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const progress = ((Date.now() - startTime) / holdDuration) * 100;
      setHoldProgress(Math.min(progress, 100));
    }, 10);

    holdTimeoutRef.current = setTimeout(() => {
      if (onHoldComplete) {
        onHoldComplete();
      }
      stopHolding();
    }, holdDuration);
  };

  const stopHolding = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <Button
        variant="hold"
        onPointerDown={startHolding}
        onPointerUp={stopHolding}
        onPointerLeave={stopHolding}
        className={cn(
          "font-QuantaGroteskPro relative overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
        {isHolding && (
          <div
            className="absolute bottom-0 left-0 h-full bg-blue-300/45"
            style={{ width: `${holdProgress}%` }}
          />
        )}
      </Button>
    </div>
  );
}
