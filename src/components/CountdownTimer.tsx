import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

interface CountdownTimerProps {
  className?: string;
  variant?: "light" | "dark" | "card";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  className = "",
}) => {
  // Target: 19 de Outubro às 19:00
  const getTargetDate = (): Date => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 9, 19, 19, 0, 0);
    if (now.getTime() > target.getTime() + 2 * 24 * 60 * 60 * 1000) {
      target = new Date(currentYear + 1, 9, 19, 19, 0, 0);
    }
    return target;
  };

  const calculateTimeLeft = (): TimeLeft => {
    const target = getTargetDate();
    const difference = target.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Live Badge indicator - Compact on mobile */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#6c7427]/10 border border-[#6c7427]/25 text-[#6c7427] text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B86F5D] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#6c7427]"></span>
        </span>
        <span className="flex items-center gap-1 font-bold">
          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6c7427]" />
          19 e 20 de Outubro • 19h
        </span>
      </div>

      {/* Countdown Grid - Compact on mobile */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full max-w-67.5 sm:max-w-md">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E8C5B0]/50 shadow-xs transition-transform duration-200"
          >
            <span className="font-serif-luxury font-bold text-xl sm:text-3xl lg:text-4xl tabular-nums text-[#8C4435] leading-none">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-xs font-medium uppercase tracking-wider text-[#6B5A52] mt-0.5 sm:mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-[#5C4F48] mt-2">
        <Clock className="w-3 h-3 text-[#6c7427]" />
        <span>Ao vivo e gratuito</span>
      </div>
    </div>
  );
};
