import React from "react";
import Homepage from "../components/home/Homepage";

import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  return <div><Homepage></Homepage></div>;
};

export default Home;
