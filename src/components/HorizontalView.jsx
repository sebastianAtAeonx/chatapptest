import React from "react";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function HorizontalView({ isMobileScreen }) {
  return (
    <>
      <div className="min-w-16 max-w-[30%] max-h-full">
        <SideBar isMobileScreen={isMobileScreen} />
      </div>
      <div className="flex grow w-[60%] flex-col max-h-full">
        <div className="flex grow flex-col-reverse md:flex-row overflow-hidden rounded-xl bg-neutral">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default HorizontalView;
