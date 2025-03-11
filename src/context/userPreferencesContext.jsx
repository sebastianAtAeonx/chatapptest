import React, { createContext, useEffect, useState } from 'react';
import daisyuiTheme from '../daisyui.theme.js';

// Create a new context for user preferences
export const UserPreferencesContext = createContext();

// UserPreferencesProvider component manages the state of user preferences
const UserPreferencesProvider = ({ children }) => {
  // Destructuring the required themes colors
  const { neutral: lightNeutral, accent: lightAccent } = daisyuiTheme.themes[0].light;
  const { neutral: darkNeutral, accent: darkAccent } = daisyuiTheme.themes[0].dark;

  // Initialize preferences state with values from localStorage, or empty values if not found
  const [preferences, setPreferences] = useState(() => {
    const storedPreferences = JSON.parse(localStorage.getItem('UserPreferences'));
    return (
      storedPreferences || {
        fontSize: '16',
        font: 'Ember Display, sans-serif',
        theme: 'light',
        index_id: 'ff480599-5683-4e6c-9d00-f20b8c10dc0e',
        source_id: '076d84ee-bd2d-471b-8bc4-25ba113fce22',
        api_key: '',
        model: '',
        imageGenerationModel: 'Bedrock',
        neutral: lightNeutral,
        accent: lightAccent,
      }
    );
  });

  useEffect(() => {
    applyPreferencesToPage(preferences);
  }, [preferences]);

  // Apply other preferences to the page as needed
  const applyPreferencesToPage = (preferences) => {
    // Apply font color when theme changes
    if (preferences.theme === 'dark') {
      document.documentElement.style.setProperty('--font-color', 'white');
    } else if (preferences.theme === 'light') {
      document.documentElement.style.setProperty('--font-color', '#0f172a');
    }
    // Apply theme to the HTML
    document.documentElement.setAttribute('data-theme', preferences.theme);

    // Apply fontFamily to the CSS
    document.documentElement.style.setProperty('--font-family', preferences.font);

    // Set theme accent colors
    document.documentElement.style.setProperty('--neutral-color', preferences.neutral);
    document.documentElement.style.setProperty('--accent-color', preferences.accent);
  };

  // Function to update user preferences and save them to localStorage
  const updatePreferences = (newPreferences) => {
    const updatedPreferences = { ...preferences, ...newPreferences };
    setPreferences(updatedPreferences);
    localStorage.setItem('UserPreferences', JSON.stringify(updatedPreferences));

    // Update the font family in the document root element to reflect the new font preference
    document.documentElement.style.setProperty('--font-family', updatedPreferences.font);

    // Set theme accent colors
    document.documentElement.style.setProperty('--neutral-color', updatedPreferences.neutral);
    document.documentElement.style.setProperty('--accent-color', preferences.accent);
  };

  const setDefaultColors = () => {
    let defaultColors;
    if (preferences.theme === 'light') {
      defaultColors = {
        accent: lightAccent,
        neutral: lightNeutral,
      };
    } else if (preferences.theme === 'dark') {
      defaultColors = {
        accent: darkAccent,
        neutral: darkNeutral,
      };
    }
    updatePreferences({
      neutral: defaultColors.neutral,
      accent: defaultColors.accent,
    });
  };

  useEffect(() => {
    setDefaultColors();
  }, [preferences.theme]);

  // Provide the preferences state and update function to child components
  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreferences, setDefaultColors }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesProvider;
