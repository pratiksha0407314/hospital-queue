import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./topbar.css";

export default function TopBar({ showBack }) {

  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="topbar">

      {/* TITLE */}
      <h1 className="title">🏥 Hospital Queue System</h1>

      {/* SECOND ROW */}
      <div className="secondRow">

        {/* BACK BUTTON */}
        <div className="left">
          {showBack && (
            <button onClick={() => navigate(-1)} className="backBtn">
              ⬅ Back
            </button>
          )}
        </div>

        {/* DATE TIME CENTER */}
        <div className="datetime">
          <div>{time.toLocaleDateString()}</div>
          <div>{time.toLocaleTimeString()}</div>
        </div>

        {/* RIGHT ICONS */}
        <div className="right">

          <span onClick={() => navigate("/notification")}>🔔</span>

          <span onClick={() => navigate("/settings")}>⚙</span>

          <span onClick={() => navigate("/help")}>❓</span>

        </div>

      </div>

    </div>

  );
}