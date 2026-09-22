import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        background: "#ccc",
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "none",
          background: "red",
          padding: "10px",
        }}
      >
        Hotels
      </Link>

      <Link
        to="/admin"
        style={{
          fontSize: "24px",
          padding: "10px",
          fontWeight: "bold",
          textDecoration: "none",
          background: "yellow",
        }}
      >
        Admin
      </Link>
    </div>
  );
}

export default Header;
