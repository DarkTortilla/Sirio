import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>EasyQuote</li>
        <li>
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-glyphs/100/FFFFFF/cottage.png"
            alt="cottage"
          />
        </li>
      </ul>
      <ul>
        <li>Perfil</li>
      </ul>
    </nav>
  );
}
