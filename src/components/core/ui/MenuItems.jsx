import React from 'react';

function MenuItems({ toggleSidebarDrawer, label, onClick = {}, children, open }) {
  return (
    <div className="nav" onClick={toggleSidebarDrawer(false)}>
      <span
        className={`sidebar__nav__item border border-neutral-600/30 text-[#412BAC] ${
          !open && 'justify-center'
        }`}
        onClick={onClick}
      >
        <div className="nav__icons text-[#412BAC]">{children}</div>
        <h6 className={`${!open && 'hidden'} font-semibold`}>{label}</h6>
      </span>
    </div>
  );
}

export default MenuItems;
