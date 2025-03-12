import React from "react";
import Card from "./core/ui/Card";
import user from "../assets/user.png";
// import logo from '../assets/genax_logo.png';
import logo from "../assets/Light.svg";

function Home() {
  const homeElements = [
    {
      name: "Chatbot",
      description: "Analyse you files data using AeonXIQ Chatbot.",
      route: "/chat",
    },
    {
      name: "Search Engine",
      description: "Search your queries over AeonXIQ Search Engine.",
      route: "/search",
    },
  ];
  return (
    <div className="w-screen h-screen p-3 bg-base-300 overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-4">
        <img src={logo} className="w-[140px] mb-3" />
        <button className="w-8 p-[2px] rounded-full border-2 border-gray-300">
          <img src={user} alt="user-avatar" />
        </button>
      </div>
      {/* bg-gradient-to-tr from-neutral to-base-200 */}
      <div className="bg-gray-400/30 h-[93%] backdrop-blur-md rounded-xl p-4 overflow-y-scroll">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 place-items-center h-full">
          {homeElements?.map((item, index) => (
            <Card key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
