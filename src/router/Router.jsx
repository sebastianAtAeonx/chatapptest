import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import ChatView from "../components/ChatView";

// ** Components
import Login from "../pages/Login";
import Register from "../pages/Register";
import FormTemplate from "../components/FormTemplate";
import Layout from "../components/Layout";
import Preferences from "../components/Preferences";
import NotFound from "../components/NotFound";
import SearchEngine from "../pages/SearchEngine/SearchEngine";
import Home from "../components/Home";
import LoginPage from "../pages/LoginPage";

const Router = () => {
  // const navigate = useNavigate();
  let protectedRoutes = null;
  const userData = localStorage.getItem("UserData");

  // useEffect(() => {
  // //Add your authentication logic here
  // }, []);

  if (userData) {
    protectedRoutes = [
      {
        path: "/home",
        element: <Layout />,
        children: [{ path: "/home", element: <ChatView /> }],
      },
      // {
      //   path: "/home",
      //   element: <Home />,
      //   children: [{ path: "/home", element: <Home /> }],
      // },
      {
        path: "/chat",
        element: <Layout />,
        children: [{ path: "/chat", element: <ChatView /> }],
      },
      {
        path: "/preferences",
        element: <Layout />,
        children: [{ path: "/preferences", element: <Preferences /> }],
      },
    ];
  }

  const getHomeRoute = () => {
    if (userData) {
      return "/chat";
    } else {
      return "/login";
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    // {
    //   path: "/login",
    //   element: <FormTemplate />,
    //   children: [{ path: "/login", element: <Login/> }],
    // },
    {
      path: "/login",
      // element: <FormTemplate />,
      children: [{ path: "/login", element: <LoginPage /> }],
    },
    {
      path: "/register",
      element: <FormTemplate />,
      children: [{ path: "/register", element: <Register /> }],
    },
    {
      path: "/search",
      children: [{ path: "/search", element: <SearchEngine /> }],
    },
    {
      path: "*",
      element: <NotFound />,
    },

    ...(protectedRoutes ? protectedRoutes : []),
  ]);

  return routes;
};

export default Router;
