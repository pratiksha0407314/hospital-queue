import React, { useEffect, useState } from "react";
import { getPatients } from "../api/api";
import socket from "../socket/socket";
import PatientCard from ".//PatientCard";

export default function Emergency() {
  const [emergencies, setEmergencies] = useState([]);

  // Fetch emergency patients from API
  const fetchEmergencies = async () => {
    try {
      const res = await getPatients();
      const emergencyPatients = res.data.filter(p => p.status === "emergency");
      setEmergencies(emergencyPatients);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmergencies();

    // Listen to live updates from socket.io
    socket.on("updateQueue", fetchEmergencies);

    return () => {
      socket.off("updateQueue", fetchEmergencies);
    };
  }, []);

  return (
    <div className="page-content">
      <h2>Emergency Queue</h2>
      {emergencies.length === 0 ? (
        <p>No emergency patients at the moment.</p>
      ) : (
        <div className="patients-list">
          {emergencies.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      )}
    </div>
  );
}