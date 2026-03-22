import React from "react";
import Topbar from "./topbar";

export default function Layout({ children }) {

  return (
    <div>
      <Topbar />

      <div style={{ padding: "20px" }}>
        {children}
      </div>

    </div>
  );

}