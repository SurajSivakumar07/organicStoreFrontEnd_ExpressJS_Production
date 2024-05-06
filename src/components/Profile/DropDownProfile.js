import React from "react";

import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
export default function DropDownProfile() {
  const navigation = useNavigate();
  return (
    <>
      <div className="profile-drop-down">
        <ul>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li
            onClick={() => {
              localStorage.clear();
              navigation("/");
              window.location.reload();
            }}
          >
            Logout
          </li>
        </ul>
      </div>
    </>
  );
}
