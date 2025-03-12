import React from "react";
import { useMediaQuery } from "@mui/material";
import VerticalView from "./VerticalView";
import HorizontalView from "./HorizontalView";

const Layout = () => {
  const isMobileScreen = useMediaQuery("(max-width:768px)");
  return (
    <div
      className=" overflow-hidden bg-[#2C2E33]"
      // bg-[#05030F]
      // bg-[#FFFAFA]
    >
      {isMobileScreen ? (
        // For Mobile Screen
        <div className="h-[100svh]">
          <VerticalView isMobileScreen={isMobileScreen} />
        </div>
      ) : (
        // For Laptop Screen
        <div className="flex gap-2 md:gap-3 transition duration-500 ease-in-out w-full h-screen p-3 md:p-3 max-h-screen">
          <HorizontalView isMobileScreen={isMobileScreen} />
        </div>
      )}
    </div>
  );
};

export default Layout;
