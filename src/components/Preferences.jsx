import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { UserPreferencesContext } from '../context/userPreferencesContext';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function Preferences() {
  const navigate = useNavigate();
  const { preferences, updatePreferences, setDefaultColors } = useContext(UserPreferencesContext);
  const selectedTheme = preferences.theme;

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const debouncedUpdatePreferences = useCallback(
    debounce((newPreferences) => updatePreferences(newPreferences), 30),
    [updatePreferences],
  );

  const theme = {
    light: {
      primary: '#F7F7F7',
      secondary: '#EAE6D7',
      accent: '#F5F5D1',
      neutral: '#FFFFFF',
      'base-100': '#FDFDFD',
      'base-200': '#FA7224',
      'base-300': '#FAFAFA',
      'base-400': '#FFFAFA',
    },
    dark: {
      primary: '#242124',
      secondary: '#1E293B',
      accent: '#34340B',
      neutral: '#1B1B1B',
      'base-100': '#010B13',
      'base-200': '#FA7F2A',
      'base-300': '#1c1917',
      'base-400': '#05030F',
    },
  };
  const currentTheme = theme[selectedTheme];

  const fontOptions = [
    { value: 'Ember Display, sans-serif', label: 'Ember Display' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' },
    { value: 'Comfortaa, sans-serif', label: 'Comfortaa' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  const imageModelOptions = [
    { value: 'Bedrock', label: 'Bedrock' },
    { value: 'Open AI', label: 'Open AI' },
  ];
  // const modelOptions = [
  //   { value: 'GPT-3', label: 'GPT-3' },
  //   { value: 'GPT-4', label: 'GPT-4' },
  //   { value: 'Claude 1', label: 'Claude 1' },
  //   { value: 'Bard', label: 'Bard' },
  //   { value: 'Bedrock', label: 'Bedrock' },
  //   { value: 'LLaMA 2', label: 'LLaMA 2' },
  // ];

  const customStyles = (theme) => ({
    control: (provided, state) => ({
      ...provided,
      className: 'chatui-fontColor',
      // backgroundColor: 'hsl(var(--b1) / var(--tw-bg-opacity))',
      backgroundColor: 'hsl(0, 0%, 97%, 0.2)',
      borderWidth: '1px',
      borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
      borderRadius: 'var(--rounded-btn, 0.5rem)',
      '--tw-border-opacity': 0.2,
      '--tw-bg-opacity': 1,
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'none',
      },
      cursor: 'pointer',
    }),
    menu: (provided) => ({
      ...provided,
      color: 'var(--font-color)',
      backgroundColor: theme.neutral,
      borderWidth: '1px',
      borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
      borderRadius: 'var(--rounded-btn, 0.5rem/* 8px */)',
      '--tw-border-opacity': 0.2,
      '--tw-bg-opacity': 1,
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? theme['base-200'] : theme.neutral,
      color: 'var(--font-color)',
      '&:hover': {
        backgroundColor: theme.primary,
        color: 'var(--font-color)',
      },
      cursor: 'pointer',
    }),
  });

  return (
    <div className="chatview mb-2 chatui-fontColor">
      <div className="flex justify-between text-slate-700 items-center p-4 pt-6 border-b-0 rounded-xl rounded-tl-none rounded-b-none font-semibold ">
        <p className="chatui-fontColor w-full ml-5 select-none text-xl">Preferences</p>
        <button
          className="text-white btn bg-base-200 p-2 min-h-fit h-auto hover:bg-base-200/90 outline-none border-none"
          onClick={() => navigate('/chat')}
        >
          Back
        </button>
      </div>
      <div className="flex flex-col h-full justify-between overflow-y-scroll">
        <div className="p-3">
          <div className="p-3 flex justify-between items-center border-b">
            <div>
              <p className="text-lg">Font Size</p>
              <p className="text-xs">Adjust font size of chat context</p>
            </div>
            <label className="input input-bordered w-full max-w-[50%] md:max-w-xs flex items-center gap-2 !bg-primary bg-opacity-5">
              <input
                type="number"
                className="w-full md:max-w-xs outline-none bg-transparent"
                min={2}
                max={100}
                placeholder="16"
                value={preferences?.fontSize}
                onChange={(event) => {
                  updatePreferences({ fontSize: event.target.value });
                }}
              />
              px
            </label>
          </div>
          <div className="p-3 flex justify-between items-center border-b">
            <p className="text-lg">Font</p>
            <Select
              className="w-full max-w-[50%] md:max-w-[20rem]"
              isSearchable={false}
              isClearable={false}
              name="font"
              defaultValue={
                preferences.font
                  ? {
                      label: preferences.font.split(',')[0].replace(/"/g, ''),
                      value: preferences.font,
                    }
                  : null
              }
              options={fontOptions}
              closeMenuOnSelect={true}
              styles={customStyles(currentTheme)}
              onChange={(selectedOption) => updatePreferences({ font: selectedOption.value })}
            />
          </div>
          <div className="p-3 flex justify-between items-center border-b">
            <p className="text-lg">Theme</p>
            <Select
              className="w-full max-w-[50%] md:max-w-[20rem]"
              isSearchable={false}
              isClearable={false}
              name="theme"
              defaultValue={
                preferences.font
                  ? {
                      label: preferences.theme.charAt(0).toUpperCase() + preferences.theme.slice(1),
                      value: preferences.theme,
                    }
                  : null
              }
              options={themeOptions}
              closeMenuOnSelect={true}
              styles={customStyles(currentTheme)}
              onChange={(selectedOption) => {
                updatePreferences({ theme: selectedOption.value });
              }}
            />
          </div>
          <div className="p-3 flex justify-between items-center border-b">
            <div>
              <p className="text-lg">Theme Color</p>
              <p className="text-xs">Adjust overall interface color.</p>
            </div>
            <div className="flex gap-3  ">
              <div className="cp_wrapper">
                <input
                  type="color"
                  id="neutral_color_picker"
                  value={preferences.neutral}
                  className="cursor-pointer"
                  onChange={(e) => {
                    debouncedUpdatePreferences({ neutral: e.target.value });
                  }}
                />
                <ReactTooltip
                  anchorId="neutral_color_picker"
                  place="top"
                  variant="dark"
                  content="Change interface color"
                />
              </div>
              <div className="cp_wrapper">
                <input
                  type="color"
                  id="accent_color_picker"
                  value={preferences.accent}
                  className="cursor-pointer"
                  onChange={(e) => {
                    debouncedUpdatePreferences({ accent: e.target.value });
                  }}
                />
                <ReactTooltip
                  anchorId="accent_color_picker"
                  place="top"
                  variant="dark"
                  content="Change chat color"
                />
              </div>
              <div
                id="reset"
                className="cp_wrapper flex justify-center items-center bg-[#ffffff]/90 text-[#1b1b1b] active:bg-[#f6f7f7]/80 cursor-pointer"
                onClick={setDefaultColors}
              >
                <GrPowerReset />
                <ReactTooltip anchorId="reset" place="top" variant="dark" content="Reset colors" />
              </div>
            </div>
          </div>
          <div className="p-3 flex justify-between items-center border-b">
            <div>
              <p className="text-lg">Index ID</p>
              <p className="text-xs">Add/Update Index ID to configure sync data source</p>
            </div>
            <input
              type="text"
              disabled
              value={preferences?.index_id}
              placeholder="cq980103-5612-4e6c-9d00-f20b8c10dc0e"
              className={`input input-bordered w-full max-w-[50%] md:max-w-xs ${
                preferences.theme === 'dark'
                  ? 'disabled:bg-gray-600 disabled:text-gray-300 disabled:border-gray-400'
                  : 'disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-400'
              } `}
              onChange={(event) => updatePreferences({ index_id: event.target.value })}
            />
          </div>
          <div className="p-3 flex justify-between items-center border-b">
            <div>
              <p className="text-lg">Source ID</p>
              <p className="text-xs">Add/Update Source ID to configure sync data source</p>
            </div>
            <input
              type="text"
              disabled
              value={preferences?.source_id}
              placeholder="770l19ff-db2g-141a-8bc4-25ba113fce22"
              className={`input input-bordered w-full max-w-[50%] md:max-w-xs ${
                preferences.theme === 'dark'
                  ? 'disabled:bg-gray-600 disabled:text-gray-300 disabled:border-gray-400'
                  : 'disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-400'
              } `}
              onChange={(event) => updatePreferences({ source_id: event.target.value })}
            />
          </div>
          {/* <div className="p-3 flex justify-between items-center border-b">
            <p className="text-lg">API Key</p>
            <input
              type="text"
              value={preferences?.api_key}
              placeholder="25ba113fce22-770l19ff-db2g-141a-8bc4"
              className="input input-bordered w-full max-w-[50%] md:max-w-xs"
              onChange={(event) => updatePreferences({ api_key: event.target.value })}
            />
          </div> */}
          {/* <div className="p-3 flex justify-between items-center border-b">
            <p className="text-lg">Model</p>
            <Select
              className="w-full max-w-[50%] md:max-w-[20rem]"
              isSearchable={false}
              isClearable={false}
              name="imgGenModel"
              defaultValue={
                preferences.imageGenerationModel
                  ? {
                      label: preferences.model,
                      value: preferences.model,
                    }
                  : null
              }
              options={modelOptions}
              closeMenuOnSelect={true}
              styles={customStyles(currentTheme)}
              onChange={(selectedOption) => updatePreferences({ model: selectedOption.value })}
            />
          </div> */}
          <div className="p-3 flex justify-between items-center border-b">
            <p className="text-lg">Image Generation Model</p>
            <Select
              className="w-full max-w-[50%] md:max-w-[20rem]"
              isSearchable={false}
              isClearable={false}
              name="imgGenModel"
              defaultValue={
                preferences.imageGenerationModel
                  ? {
                      label:
                        preferences.imageGenerationModel.charAt(0).toUpperCase() +
                        preferences.imageGenerationModel.slice(1),
                      value: preferences.imageGenerationModel,
                    }
                  : null
              }
              options={imageModelOptions}
              closeMenuOnSelect={true}
              styles={customStyles(currentTheme)}
              onChange={(selectedOption) =>
                updatePreferences({ imageGenerationModel: selectedOption.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
