import React from "react";

function MenuItems({
  toggleSidebarDrawer,
  label,
  onClick = {},
  children,
  open,
}) {
  return (
    <div className="nav" onClick={toggleSidebarDrawer(false)}>
      <span
        className={`sidebar__nav__item bg-[#2C2E33] hover:bg-[#593BC2] text-[#D8DADE] ${
          !open && "justify-center"
        }`}
        onClick={onClick}
      >
        <div className="nav__icons text-[#D8DADE]">{children}</div>
        <h6 className={`${!open && "hidden"} `}>{label}</h6>
      </span>
    </div>
  );
}

export default MenuItems;
