import React, { useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import Drawer from '@mui/material/Drawer';
import SideBar from './SideBar';
import { IoFileTrayFullOutline } from 'react-icons/io5';
import FilesListMenu from './FilesListMenu';
import { Outlet } from 'react-router-dom';

function VerticalView() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openFilesDrawer, setOpenFilesDrawer] = useState(false);

  const toggleFilesDrawer = (newOpen) => () => {
    setOpenFilesDrawer(newOpen);
  };

  const toggleSidebarDrawer = (newOpen) => () => {
    setOpenSideBar(newOpen);
  };

  return (
    <div className="h-[100svh] bg-base-300">
      <div className="fixed z-20 w-full flex justify-center bg-base-300 items-center chatui-fontColor p-4 pt-6 border-b-2 rounded-xl rounded-tl-none rounded-b-none font-semibold text-2xl">
        <div>
          <LuMenu size={26} onClick={toggleSidebarDrawer(true)} />
          <Drawer
            anchor="left"
            open={openSideBar}
            onClose={toggleSidebarDrawer(false)}
            variant="temporary"
            ModalProps={{
              keepMounted: true,
            }}
            sx={{ width: '100vw' }}
          >
            <div
              className="bg-base-300"
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'clip',
              }}
            >
              <SideBar toggleSidebarDrawer={toggleSidebarDrawer} />
            </div>
          </Drawer>
        </div>
        <p className="w-full select-none text-center">AeonX ChatBot</p>
        <div>
          <IoFileTrayFullOutline size={26} onClick={toggleFilesDrawer(true)} />
          <Drawer
            anchor="right"
            open={openFilesDrawer}
            onClose={toggleFilesDrawer(false)}
            variant="temporary"
            ModalProps={{
              keepMounted: true,
            }}
            sx={{ width: '100vw' }}
          >
            <div
              className="bg-base-300"
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'clip',
              }}
            >
              <FilesListMenu toggleFilesDrawer={toggleFilesDrawer} />
            </div>
          </Drawer>
        </div>
      </div>
      {/* <ChatView isMobileScreen={isMobileScreen} /> */}
      <Outlet />
    </div>
  );
}

export default VerticalView;
