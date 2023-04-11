import React from "react";
import { Outlet } from "react-router-dom";
import PostLoginHeader from "../Header/PostLoginHeader";

const LandingPageMain = () => {
  return (
    <div>
      <PostLoginHeader />
      <Outlet />
    </div>
  );
};

export default LandingPageMain;
