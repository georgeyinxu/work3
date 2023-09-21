import React, { useEffect, useState } from "react";
import { ImArrowUpRight2 } from "react-icons/im";
import { DateTime } from "luxon";
type Props = {
  title: string;
  reward: string;
  deadline: Date;
  lastUpdated: Date;
  description: string;
};

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  days: number;
}

const ListingCard: React.FC<Props> = ({
  title,
  reward,
  deadline,
  lastUpdated,
  description,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const sgt = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Singapore" })
    );
    const targetTime = deadline;

    // If it's already past the target time, set the target to 6 PM SGT on 7th September
    if (sgt.getTime() > targetTime.getTime()) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDifference = targetTime.getTime() - sgt.getTime();
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl p-8 mb-4 my-6 grid grid-cols-1 md:grid-cols-3">
      <div className="md:col-span-2">
        <h3 className="text-[#222222] text-xl sm:text-2xl md:text-3xl font-semibold">
          {title}
        </h3>
        <p
          className="overflow-hidden overflow-ellipsis text-[#222222] mt-2 line-clamp-6 text-sm sm:text-base md:text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex flex-col items-start justify-between md:px-10 pt-4">
        <div>
          <p className="text-sm text-[#7D7D7D]">Total Payout</p>
          <div className="flex items-center justify-center">
            <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
              {reward}
            </h3>
            <img
              src="/images/sald-token.svg"
              className="w-10 h-10 md:w-14 md:h-14"
              alt="sald token"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-[#7D7D7D]">Ends In</p>
          <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
            {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M{" "}
            {timeLeft.seconds}S
          </h3>
        </div>
        <div>
          <p className="text-sm text-[#7D7D7D]">Last Updated</p>
          <h3 className="text-[#222222] text-2xl md:text-3xl font-semibold">
            {DateTime.fromISO(lastUpdated.toISOString()).toFormat(
              "yyyy LLL dd"
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
