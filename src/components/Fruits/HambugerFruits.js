import React, { useEffect, useState, useRef } from "react";
import "./fruits.css";
import Profile from "../Profile/Profile";

export default function HambugerFruits() {
  const [pop, setPop] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setPop(false);
      }
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="hambuger-wrap">
        <div className="hello-content">
          <p>Hello {localStorage.getItem("name")} !</p>
        </div>

        <div className="profile" ref={profileRef}>
          <i
            className="fa-regular fa-user"
            onClick={() => {
              if (pop) {
                setPop(false);
              } else {
                setPop(true);
              }
            }}
          ></i>
          {pop && <Profile value={pop} />}
        </div>
      </div>
    </>
  );
}
