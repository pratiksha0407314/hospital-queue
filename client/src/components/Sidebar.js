import React from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const tabs = [
    { name: "Dashboard", icon: "📊", path: "/dashboard" },
    { name: "Patients", icon: "🧑", path: "/patients" },
    { name: "Doctors", icon: "👨‍⚕", path: "/doctors" },
    { name: "About", icon: "ℹ️", path: "/about" }
  ];

  return (
    <div className="centerTabs">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          className="tabCard"
          onClick={() => navigate(tab.path)}
        >
          <div className="tabIcon">{tab.icon}</div>
          <div className="tabText">{tab.name}</div>
        </div>
      ))}
    </div>
  );
}