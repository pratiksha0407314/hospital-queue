import React from "react";

function PatientCard({ patient }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "10px",
        background: "#fff"
      }}
    >
      <h3>{patient.name}</h3>
      <p>Token: {patient.token}</p>
      <p>Status: {patient.status}</p>
    </div>
  );
}

export default PatientCard;