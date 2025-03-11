// Import necessary libraries
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Import your components
import Router from './router/Router';

// Import Contexts
import { ChatContextProvider } from './context/chatContext';
import { FileContext } from './context/fileContext';
import UserPreferencesProvider from './context/userPreferencesContext';

function App() {
  const [preLoader, setPreLoader] = useState(true);
  const [preferences, setPreferences] = useState(
    JSON.parse(localStorage.getItem('UserPreferences')),
  );

  useEffect(() => {
    if (preferences) {
      setTimeout(() => {
        setPreLoader(false);
      }, 400);
    } else {
      setPreLoader(false);
    }
  }, [preferences]);

  return (
    <FileContext>
      <ChatContextProvider>
        <UserPreferencesProvider>
          <BrowserRouter>
            {preLoader ? (
              <div className="w-screen h-screen flex justify-center items-center">
                <div className="loading-spinner w-12 h-12" />
              </div>
            ) : (
              <Router />
            )}
          </BrowserRouter>
        </UserPreferencesProvider>
      </ChatContextProvider>
    </FileContext>
  );
}

export default App;
