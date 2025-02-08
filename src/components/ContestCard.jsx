import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import codeforcesLogo from "../assets/codeforces.png";
import codechefLogo from "../assets/codechef.png";

const platformData = {
  codechef: {
    color: "bg-red-100",
    textColor: "text-red-600",
    logo: codechefLogo,
  },
  codeforces: {
    color: "bg-blue-100",
    textColor: "text-blue-600",
    logo: codeforcesLogo,
  },
};

const ContestCard = ({ contest }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const start = new Date(contest.start_time);
      setTimeLeft(
        start > new Date() ? formatDistanceToNow(start, { addSuffix: true }) : "Ongoing"
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [contest.start_time]);

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 p-4 flex flex-col justify-between h-[200px]">
      <div className="flex items-center space-x-4">
        <img src={platformData[contest.platform].logo} alt={contest.platform} className="h-8 w-8" />
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-500">{contest.platform.toUpperCase()}</p>
          <h3 className="text-sm font-semibold text-gray-900 truncate w-[200px]">
            {contest.name}
          </h3>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs text-gray-600">{timeLeft}</p>
        <p className="text-xs text-gray-600">Duration: {contest.duration} minutes</p>
        <a href={contest.url} className="text-xs font-medium text-blue-600 hover:text-blue-500 mt-2 inline-block">
          View Details →
        </a>
      </div>
    </div>
  );
};

export default ContestCard;
