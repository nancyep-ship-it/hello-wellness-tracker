import React, { useState } from "react";
import { Users, Activity, Brain, Apple, Star, Moon } from "lucide-react";

const PALETTE = {
  navy: "#071031",
  clay: "#d46d50",
  blush: "#f3ece9",
  teal: "#0097A7",
  sand: "#f4d6c6",
  sky: "#8cbACF",
  peach: "#f7ddb6",
  deepblue: "#01395e",
  gray: "#DADFE6",
};

function ProgressRing({ progress }) {
  return (
    <div className="ring-wrap">
      <svg className="ring-svg" viewBox="0 0 36 36">
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
    </div>
  );
}

function WeeklyBar({ week }) {
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="weekly">
      <div className="weekly-title">Past 7 days</div>
      <div className="weekly-row">
        {week.map((done, idx) => (
          <div key={idx} className="weekly-dot-wrap">
            <span
              className={done ? "weekly-dot weekly-dot--on" : "weekly-dot"}
            ></span>
            <span className="weekly-day">{dayLabels[idx]}</span>
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
  const lightColors = [PALETTE.sand, PALETTE.sky, PALETTE.peach];
  const buttonTextColor = lightColors.includes(color) ? PALETTE.navy : "#fff";

  return (
    <div className="card">
      <div
        className="card-icon"
        style={{ backgroundColor: `${color}20`.replace("20", "33") }}
      >
        <Icon style={{ color, width: 20, height: 20 }} />
      </div>
      <h2 className="card-title">{title}</h2>
      <p className="card-text">{question}</p>
      <div className="card-ring">
        <ProgressRing progress={progress} />
        <div className="card-ring-center">
          <span className="card-ring-count">{count}</span>
          <span className="card-ring-label">days</span>
        </div>
      </div>
      <button
        onClick={onCheckIn}
        disabled={checkedToday}
        className={checkedToday ? "card-btn card-btn--disabled" : "card-btn"}
        style={{ backgroundColor: color, color: buttonTextColor }}
      >
        <b>{checkedToday ? "Logged for today" : buttonText}</b>
      </button>
      <div className="card-footer">
        <p>Current streak: {streak} 🔥</p>
        <p className="card-footnote">{motivation}</p>
      </div>
      <WeeklyBar week={week} />
    </div>
  );
}

function WellnessTracker({ totals, completedCount, todayStr, lastCheckIns }) {
  const totalActions = totals.reduce((sum, n) => sum + n, 0);
  const progress = Math.min((completedCount / 6) * 100, 100);
  const labels = [
    "Social",
    "Movement",
    "Brain",
    "Nutrition",
    "Purpose",
    "Self-care",
  ];

  return (
    <div className="top-card">
      <div className="top-left">
        <h1 className="top-title">Your Daily Wellness Tracker</h1>
        <span className="top-accent" />
        <p className="top-text">
          Track your progress across all six dimensions of well-being. Each time
          you click a button below, you record one meaningful action — a daily
          step toward living well in body, mind, and community.
        </p>
        <p className="top-text">
          Total actions this month: <b>{totalActions}</b>
        </p>
        <p className="top-small">
          Goal: Take at least one action in every dimension each day.
        </p>
      </div>
      <div className="top-ring">
        <svg className="ring-svg" viewBox="0 0 36 36">
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
        <div className="top-ring-center">
          <span className="top-ring-count">{completedCount}/6</span>
          <span className="top-ring-label">completed today</span>
        </div>
      </div>

      {/* daily 6-pill row */}
      <div className="pill-row">
        {labels.map((label, idx) => {
          const done = lastCheckIns[idx] === todayStr;
          return (
            <div
              key={label}
              className={done ? "pill pill--on" : "pill"}
            >
              <span className={done ? "pill-dot pill-dot--on" : "pill-dot"} />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
  const [streaks, setStreaks] = useState([0, 0, 0, 0, 0, 0]);
  const [lastCheckIns, setLastCheckIns] = useState(["", "", "", "", "", ""]);
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
      return prev.map((week, i) => {
        if (i !== index) return week;
        const nextWeek = [...week];
        nextWeek.shift();
        nextWeek.push(true);
        return nextWeek;
      });
    });
  };

  const completedToday = lastCheckIns.filter((d) => d === todayStr).length;

  return (
    <div className="page">
      <WellnessTracker
        totals={counts}
        completedCount={completedToday}
        todayStr={todayStr}
        lastCheckIns={lastCheckIns}
      />
      <div className="card-grid">
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
