import React from "react";

import "./fruits.css";
import Nav from "./Nav";
import Options from "./Options";
import Slider from "./Slider";
import DisplayFruits from "./DisplayFruits";
import Review from "../Review/Review";

import Summary from "../summary/Summary";

export default function Fruits() {
  return (
    <>
      <Nav />
      <Options />
      <Slider />
      <DisplayFruits />
      {/* <LocationData /> */}
      <Summary />
      <Review />
    </>
  );
}
