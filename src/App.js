import React, { useState } from "react";
import { Users, Activity, Brain, Apple, Star, Moon } from "lucide-react";

// Hello by Grouper palette
const PALETTE = {
  navy: "#071031",
  mint: "#e8f8f7",
  clay: "#d46d50",
  blush: "#f3ece9",
  sky: "#8cbACF",
  aqua: "#57ced3",
  teal: "#0097A7",
  sand: "#f4d6c6",
  deepblue: "#01395e",
  peach: "#f7ddb6",
  gray: "#DADFE6",
};

function ProgressRing({ progress }) {
  return (
    <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
      <svg className="block" viewBox="0 0 36 36">
        {/* base ring */}
        <path
          strokeWidth="3.8"
          stroke={PALETTE.gray}
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* progress */}
        <path
          strokeWidth="3.8"
          strokeLinecap="round"
          stroke={PALETTE.clay}
          fill="none"
          strokeDasharray={`${progress}, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
    </div>
  );
}

function WeeklyBar({ week }) {
  // week is array of 7 booleans, oldest -> newest
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="w-full mt-3">
      <span className="text-[10px] uppercase tracking-wide text-slate-400 block mb-1 text-center">
        Past 7 days
      </span>
      <div className="flex gap-1 justify-center">
        {week.map((done, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <span
              className={`w-4 h-4 rounded-full border ${
                done
                  ? "bg-[#d46d50] border-[#d46d50]"
                  : "bg-[#f3ece9] border-transparent"
              }`}
            ></span>
            <span className="text-[9px] text-slate-400 leading-none">
              {dayLabels[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DimensionTracker({
  icon: Icon,
  title,
  question,
  buttonText,
  color,
  motivation,
  count,
  streak,
  onCheckIn,
  checkedToday,
  week,
}) {
  const progress = Math.min((count / 30) * 100, 100);
  const lightBgColors = [PALETTE.sand, PALETTE.peach, PALETTE.mint, PALETTE.sky];
  const buttonTextColor = lightBgColors.includes(color)
    ? PALETTE.navy
    : "#ffffff";

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 gap-1 hover:shadow-lg transition-transform">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <h2 className="text-xl font-extrabold text-[#01395e] mb-2 tracking-tight">
        {title}
      </h2>
      <p className="text-slate-700 text-sm mb-3 leading-relaxed max-w-xs">
        {question}
      </p>
      <div className="relative mb-2">
        <ProgressRing progress={progress} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{count}</span>
          <span className="text-[10px] uppercase tracking-wide text-slate-400">
            days
          </span>
        </div>
      </div>
      <button
        onClick={onCheckIn}
        disabled={checkedToday}
        className={`px-5 py-2 rounded-full text-sm font-bold transition border border-transparent ${
          checkedToday ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
        }`}
        style={{ backgroundColor: color, color: buttonTextColor }}
      >
        {checkedToday ? "Logged for today" : buttonText}
      </button>
      <div className="mt-2 text-slate-600 text-xs leading-relaxed">
        <p>Current streak: {streak} 🔥</p>
        <p className="italic mt-1">{motivation}</p>
      </div>
      <WeeklyBar week={week} />
    </div>
  );
}

function WellnessTracker({ totals, completedCount, todayStr, lastCheckIns }) {
  const totalActions = totals.reduce((sum, n) => sum + n, 0);
  const progress = Math.min((completedCount / totals.length) * 100, 100);
  const labels = [
    "Social",
    "Movement",
    "Brain",
    "Nutrition",
    "Purpose",
    "Self-care",
  ];
  return (
    <div className="bg-white rounded-3xl p-14 mb-10 shadow-md border border-gray-200 flex flex-col gap-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-[#01395e] mb-2 tracking-tight relative inline-block">
            Your Daily Wellness Tracker
            <span
              className="block h-1 mt-3 rounded-full"
              style={{ backgroundColor: PALETTE.clay, width: "17ch" }}
            ></span>
          </h1>
          <p className="text-slate-700 text-sm mb-5 leading-relaxed">
            Track your progress across all six dimensions of well-being. Each
            time you click a button below, you record one meaningful action — a
            daily step toward living well in body, mind, and community.
          </p>
          <p className="text-slate-700 text-sm">
            Total actions this month:{" "}
            <span className="font-semibold">{totalActions}</span>
          </p>
          <p className="text-slate-600 text-xs mt-3">
            Goal: Take at least one action in every dimension each day.
          </p>
        </div>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="block" viewBox="0 0 36 36">
            <path
              strokeWidth="3.8"
              stroke={PALETTE.gray}
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              strokeWidth="3.8"
              strokeLinecap="round"
              stroke={PALETTE.clay}
              fill="none"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-900">
              {completedCount}/6
            </span>
            <span className="text-[10px] uppercase tracking-wide text-slate-400">
              completed today
            </span>
          </div>
        </div>
      </div>
      {/* daily 6-pill row */}
      <div className="flex flex-wrap gap-3">
        {labels.map((label, idx) => {
          const done = lastCheckIns[idx] === todayStr;
          return (
            <div
              key={label}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium border transition ${
                done
                  ? "bg-[#d46d50] text-white border-[#d46d50]"
                  : "bg-[#f3ece9] text-[#01395e] border-transparent"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  done ? "bg-white" : "bg-[#d46d50] opacity-40"
                }`}
              ></span>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  // 6 dimensions
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
  const [streaks, setStreaks] = useState([0, 0, 0, 0, 0, 0]);
  const [lastCheckIns, setLastCheckIns] = useState(["", "", "", "", "", ""]);
  // 6 x 7 days (oldest -> newest)
  const [weeklyLogs, setWeeklyLogs] = useState([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);

  const todayStr = new Date().toDateString();

  const handleCheckIn = (index) => {
    // only 1 per day per dimension
    setCounts((prev) => {
      if (lastCheckIns[index] === todayStr) return prev;
      return prev.map((c, i) => (i === index ? c + 1 : c));
    });
    setStreaks((prev) => {
      if (lastCheckIns[index] === todayStr) return prev;
      return prev.map((s, i) => (i === index ? s + 1 : s));
    });
    setLastCheckIns((prev) => {
      if (prev[index] === todayStr) return prev;
      const next = [...prev];
      next[index] = todayStr;
      return next;
    });
    setWeeklyLogs((prev) => {
      if (lastCheckIns[index] === todayStr) return prev;
      const next = prev.map((week, i) => {
        if (i !== index) return week;
        const newWeek = [...week];
        newWeek.shift(); // drop oldest
        newWeek.push(true); // today done
        return newWeek;
      });
      return next;
    });
  };

  const completedToday = lastCheckIns.filter((d) => d === todayStr).length;

  return (
    <div className="min-h-screen bg-[#f3ece9] p-6 flex flex-col gap-6">
      <WellnessTracker
        totals={counts}
        completedCount={completedToday}
        todayStr={todayStr}
        lastCheckIns={lastCheckIns}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DimensionTracker
          icon={Users}
          title="Social Connection"
          question="Did you connect with someone today?"
          buttonText="I reached out today"
          color={PALETTE.clay}
          motivation="Every hello strengthens your circle."
          count={counts[0]}
          streak={streaks[0]}
          checkedToday={lastCheckIns[0] === todayStr}
          week={weeklyLogs[0]}
          onCheckIn={() => handleCheckIn(0)}
        />
        <DimensionTracker
          icon={Activity}
          title="Healthy Movement"
          question="Did you move your body today?"
          buttonText="I moved today"
          color={PALETTE.teal}
          motivation="Small steps lead to big change."
          count={counts[1]}
          streak={streaks[1]}
          checkedToday={lastCheckIns[1] === todayStr}
          week={weeklyLogs[1]}
          onCheckIn={() => handleCheckIn(1)}
        />
        <DimensionTracker
          icon={Brain}
          title="Learning & Brain Health"
          question="What did you learn today?"
          buttonText="I learned something new"
          color={PALETTE.sky}
          motivation="Curiosity keeps your mind sharp."
          count={counts[2]}
          streak={streaks[2]}
          checkedToday={lastCheckIns[2] === todayStr}
          week={weeklyLogs[2]}
          onCheckIn={() => handleCheckIn(2)}
        />
        <DimensionTracker
          icon={Apple}
          title="Nutrition & Healthy Living"
          question="Did you eat something nourishing?"
          buttonText="I ate healthy today"
          color={PALETTE.sand}
          motivation="Fuel your body, feed your energy."
          count={counts[3]}
          streak={streaks[3]}
          checkedToday={lastCheckIns[3] === todayStr}
          week={weeklyLogs[3]}
          onCheckIn={() => handleCheckIn(3)}
        />
        <DimensionTracker
          icon={Star}
          title="Purpose & Meaning"
          question="Did you reflect or give back today?"
          buttonText="I found purpose today"
          color={PALETTE.peach}
          motivation="Meaning makes every day richer."
          count={counts[4]}
          streak={streaks[4]}
          checkedToday={lastCheckIns[4] === todayStr}
          week={weeklyLogs[4]}
          onCheckIn={() => handleCheckIn(4)}
        />
        <DimensionTracker
          icon={Moon}
          title="Self-Care & Emotional Well-Being"
          question="Did you pause and rest today?"
          buttonText="I took time for me"
          color={PALETTE.deepblue}
          motivation="Rest is strength in disguise."
          count={counts[5]}
          streak={streaks[5]}
          checkedToday={lastCheckIns[5] === todayStr}
          week={weeklyLogs[5]}
          onCheckIn={() => handleCheckIn(5)}
        />
      </div>
    </div>
  );
}
