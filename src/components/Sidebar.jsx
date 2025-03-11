import React, { useState, useContext } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdAdd,
  MdOutlineSettings,
  MdList,
  MdReceipt,
} from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import logo from '../assets/Light.svg';
import { DataArray, Sync } from '@mui/icons-material';
// import Modal from './Modal';
// import Setting from './Setting';
// import { GoDatabase } from 'react-icons/go';
// import { RxDashboard } from 'react-icons/rx';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import { apiURl } from '../config';
import { FiLogOut, FiTool, FiUser } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom/dist';
import { IoClose, IoSearch } from 'react-icons/io5';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { UserPreferencesContext } from '../context/userPreferencesContext';
import MenuItems from './core/ui/MenuItems';

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = ({ toggleSidebarDrawer = () => {} }) => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  const { preferences } = useContext(UserPreferencesContext);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [settingsOpen, setSettingsOpen] = useState(false);
  const isMobileScreen = useMediaQuery('(max-width:768px)');
  const navigate = useNavigate();

  // function handleResize() {
  //   // window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  // }

  // useEffect(() => {
  //   handleResize();
  // }, []);

  const clearChat = () => {
    clearMessages();
  };

  const newChatHandler = () => {
    navigate('/chat');
    clearChat();
  };

  const home = () => {
    navigate('/home');
  };

  const SyncFunction = () => {
    let syncParams = {
      index_id: preferences?.index_id,
      data_source_id: preferences?.source_id,
    };
    hotToast.promise(
      axios
        .post(new URL(apiURl + `/sync_datasource`), syncParams)
        .then((res) => {
          return res.data.status;
        })
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Syncing...',
        success: (message) => <b>{message}</b>,
        error: (error) => <b>Error: {error.message}</b>,
      },
    );
  };

  const preferencesHandler = () => {
    navigate('/preferences');
  };

  const searchEngineHandler = () => {
    navigate('/search');
  };

  const logout = () => {
    window.localStorage.removeItem('UserData');
    // window.localStorage.removeItem('UserPreferences');
    navigate('/login');
  };

  return (
    // lg:w-96
    <section className={` ${open ? 'w-auto lg:w-64' : 'w-16'} sidebar`}>
      <div className="sidebar__app-bar">
        <div className="flex w-full justify-center items-center gap-1">
          <div
            onClick={toggleSidebarDrawer(false)}
            className={`sidebar__app-logo z-30 flex justify-center items-center left-[50%] relative translate-x-[-50%] md:left-0 md:translate-x-0 ${
              !open && 'scale-0 hidden'
            }`}
          >
            <div onClick={() => navigate('/chat')}>
              <img src={logo} alt="Logo" className=" md:m-0 md:w-[140px] " />
            </div>
          </div>

          {/* <h6 className={`sidebar__app-title ${!open && 'scale-0 hidden'}`}></h6> */}
          {!isMobileScreen ? (
            <div
              className={`sidebar__btn-close w-full flex justify-items-end items-center  ${
                !open ? 'static' : 'absolute right-0 p-2'
              } `}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <MdChevronLeft className="chatui-fontColor sidebar__btn-icon" />
              ) : (
                <MdChevronRight className="chatui-fontColor sidebar__btn-icon" />
              )}
            </div>
          ) : (
            <button
              className="sidebar__btn-close w-full flex justify-items-end items-end"
              onClick={toggleSidebarDrawer(false)}
            >
              {' '}
              <IoClose className="chatui-fontColor sidebar__btn-icon" size={25} />
            </button>
          )}
        </div>
      </div>

      <MenuItems toggleSidebarDrawer={toggleSidebarDrawer} onClick={home} label="Home" open={open}>
        <VscHome />
      </MenuItems>
      <MenuItems
        toggleSidebarDrawer={toggleSidebarDrawer}
        label="New Chat"
        onClick={newChatHandler}
        open={open}
      >
        <MdAdd />
      </MenuItems>
      {/* <MenuItems toggleSidebarDrawer={toggleSidebarDrawer} label="Create Data Source 
        open={open}
      
      ">
        <GoDatabase />
      </MenuItems> */}
      <MenuItems
        toggleSidebarDrawer={toggleSidebarDrawer}
        onClick={SyncFunction}
        label="Sync"
        open={open}
      >
        <Sync />
      </MenuItems>

      <MenuItems
        toggleSidebarDrawer={toggleSidebarDrawer}
        label="AeonXIQ Engine"
        onClick={searchEngineHandler}
        open={open}
      >
        <IoSearch />
      </MenuItems>

      <MenuItems
        toggleSidebarDrawer={toggleSidebarDrawer}
        label="Preferences"
        onClick={preferencesHandler}
        open={open}
      >
        <FiTool />
      </MenuItems>

      {/* Settings Modal */}
      {/* <div className="nav__bottom">
        <div onClick={() => setModalOpen(true)} className="nav">
          <span htmlFor="setting-modal" className="nav__item">
            <div className="nav__icons">
              <MdOutlineSettings />
            </div>
            <h6 className={`${!open && 'hidden'}`}>Settings</h6>
          </span>
        </div>
      </div> */}
      {/* <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal> */}
      <div className="nav__bottom">
        <details className="dropdown dropdown-top p-0 h-[50px] border-none bg-transparent hover:bg-transparent shadow-none">
          <summary
            className={`bg-neutral hover:bg-primary/60 btn w-full h-full flex items-center gap-2 capitalize ${
              open ? ' justify-start' : 'justify-center'
            }`}
          >
            <div className="nav__icons chatui-fontColor">
              <MdOutlineSettings />
            </div>
            <h6 className={`${!open && 'hidden'} font-normal chatui-fontColor`}>Settings</h6>
          </summary>

          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-1 mb-3 shadow bg-neutral rounded-lg w-full"
          >
            {/* <li>
              <a className="setting-menu-item" onClick={logout}>
                <RxDashboard /> <h6 className={`${!open && 'hidden'}`}>Dashboard</h6>
              </a>
            </li>
            <li>
              <a className="setting-menu-item" onClick={logout}>
                <FiUser /> <h6 className={`${!open && 'hidden'}`}>Profile</h6>
              </a>
            </li> */}
            <li>
              <a className="setting-menu-item chatui-fontColor" onClick={logout}>
                <FiLogOut /> <h6 className={`${!open && 'hidden'}`}>Logout</h6>
              </a>
            </li>
          </ul>
        </details>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default SideBar;
