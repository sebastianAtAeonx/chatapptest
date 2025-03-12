/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, useContext } from "react";
import ChatMessage from "./ChatMessage";
import { ChatContext } from "../context/chatContext";
import { MdSend, MdClear, MdDelete } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import {
  IoCloudUploadOutline,
  IoMicOutline,
  IoMicOffOutline,
  IoStopCircle,
} from "react-icons/io5";
import { GoDependabot } from "react-icons/go";
import "react-tooltip/dist/react-tooltip.css";
import { apiURl } from "../config";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Modal from "./Modal";
import Setting from "./Setting";
import axios from "axios";
import PromptPerfect from "./PromptPerfect";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { CreateFileContext } from "../context/fileContext";
import voiceGif from "../assets/voice.gif";
import InitialSuggestionBox from "./InitialSuggestionBox";

import useSpeechToText from "react-hook-speech-to-text";
import FileUpload from "./FileUpload";
import { useMediaQuery } from "@mui/material";
import ListFiles from "./ListFiles";
import { BsStars } from "react-icons/bs";
import { UserPreferencesContext } from "../context/userPreferencesContext";
import { FaUncharted } from "react-icons/fa";
import logo from "../assets/bot-avatar.png";
import aeonxIqlogo from "../assets/Light.svg";
import CommandsDropdown from "./CommandsDropdown";
import { Heading } from "../custom/customStyles";

/**
 * A chat view component that displays a list of messages and a form for sending new messages.
 */
let errorOccurred = false;
const ChatView = () => {
  const messagesEndRef = useRef();
  const { dataName, isFileCSV } = useContext(CreateFileContext);
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, addMessage] = useContext(ChatContext);
  const [, , clearMessages, removeLoading] = useContext(ChatContext);
  const { preferences } = useContext(UserPreferencesContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatbotMode, setChatbotMode] = useState("chat");
  const [dataArray, setDataArray] = useState([]);
  const [isCommand, setIsCommand] = useState(false);
  const isMobileScreen = useMediaQuery("(max-width:768px)");

  // const [isVoiceGifVisible, setIsVoiceGifVisible] = useState(false);

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue, ai = false, isResponseImg = false) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      isResponseImg: isResponseImg,
      ai: ai,
    };

    addMessage(newMsg);
  };

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */

  // const sendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!formValue) return;

  //   const cleanPrompt = formValue.trim();

  //   const newMsg = cleanPrompt;

  //   setFormValue('');
  //   updateMessage(newMsg, false);

  //   const response = 'I am a bot. This feature will be coming soon.';
  //   updateMessage(response, true);
  // };
  const fileName = localStorage.getItem("fileName");
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!formValue) return;

    try {
      setLoading(true);
      const cleanPrompt = formValue?.trim();
      setFormValue("");
      updateMessage(cleanPrompt, false);

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      const formData = new FormData();
      formData.append("search", cleanPrompt);
      formData.append("file", fileName);

      const formData2 = new FormData();
      formData2.append("question", cleanPrompt);
      formData2.append("index_id", "ff480599-5683-4e6c-9d00-f20b8c10dc0e");

      const apiEndpoint = fileName ? apiURl + `/use-bedrock` : apiURl + "/ask";
      const params = fileName ? formData : formData2;

      const response = await axios.post(apiEndpoint, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        cancelToken: source.token,
      });

      let apiResponseMessage;

      if (response.data.error) {
        apiResponseMessage = response.data.error || "No response from API";
      } else {
        apiResponseMessage = response.data || "No response from API";
      }

      updateMessage(apiResponseMessage, true);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle cancellation
        console.log("Request canceled:", error.message);
      } else {
        toast.error(error.message);
        removeLoading();
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };
  const getAnalytics = async (e) => {
    e?.preventDefault();
    console.log(isFileCSV);
    if (!formValue || !isFileCSV) {
      return toast.success(
        "Please Select a CSV file and enter your prompt to visualize data.",
        {
          icon: (
            <img
              src={logo}
              alt="bot-avatar"
              style={{ width: "26px", height: "26px" }}
            />
          ),
        }
      );
    }
    try {
      setLoading(true);
      // setError(null);
      const cleanPrompt = formValue?.trim();
      setFormValue("");
      updateMessage(cleanPrompt, false);

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      const payload = {
        file: fileName,
        query: cleanPrompt,
      };

      const apiEndpoint = apiURl + "/visualize";

      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // Added to handle binary data
        cancelToken: source.token,
      });
      let imageSrc;
      let apiResponseMessage;
      if (response.data.error) {
        apiResponseMessage = response.data.error || "No response from API";
      } else {
        // Convert binary data to base64
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        imageSrc = `${base64Image}`;
        // setImageSrc(imageSrc);
        apiResponseMessage = "Image received";
        updateMessage(imageSrc, true, true);
      }

      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        toast.error(error.message);
        // setError(error.message);
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  // Function to handle the cancel button click
  const handleStopClick = () => {
    if (cancelTokenSource) {
      setLoading(false);
      removeLoading();
      cancelTokenSource.cancel("User stopped the request");
      setCancelTokenSource(null); // Reset the cancel token source after cancellation
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Component unmounted");
      }
    };
  }, [cancelTokenSource]);

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     // 👇 Get input value
  //     if (chatbotMode == 'chat') {
  //       sendMessage(e);
  //       inputRef.current.style.height = 'auto';
  //     } else if (chatbotMode == 'visualize') {
  //       getAnalytics(e);
  //     }
  //   } else if (e.key === 'Enter' && e.shiftKey && e.ctrlKey) {
  //     generateImage(e);
  //   }
  //   if (e.key === '/') {
  //     const filteredMessages = messages.filter((msg) => !msg.ai).map((msg) => msg.text);
  //     setDataArray(filteredMessages);
  //     setShowDropdown(true);
  //   } else {
  //     setShowDropdown(false);
  //   }
  //   if (e.key === ':' || e.target.value.includes(':')) {
  //     const commands = ['visualize', 'summarize', 'explore_goals'];

  //     const inputValue = e.target.value.includes(':') ? e.target.value.split(':')[1] : '';
  //     const filteredCommands = commands.filter((command) => command.startsWith(inputValue));
  //     setDataArray(filteredCommands);
  //     setIsCommand(true);
  //     setShowDropdown(true);
  //   } else {
  //     setIsCommand(false);
  //   }
  // };

  const handleKeyDown = (e) => {
    const { key, shiftKey, ctrlKey, target } = e;
    const inputValue = target.value;

    const handleEnterKey = () => {
      if (shiftKey && ctrlKey) {
        generateImage(e);
      } else if (!shiftKey) {
        if (chatbotMode === "chat") {
          sendMessage(e);
          inputRef.current.style.height = "auto";
        } else if (chatbotMode === "visualize") {
          getAnalytics(e);
        }
      }
    };

    const handleSlashKey = () => {
      const filteredMessages = messages
        .filter((msg) => !msg.ai)
        .map((msg) => msg.text);
      setDataArray(filteredMessages);
      setShowDropdown(true);
    };

    const handleColonKey = () => {
      const commands = ["visualize", "summarize", "explore_goals"];
      setDataArray(commands);
      setIsCommand(true);
      setShowDropdown(true);
    };

    const handleOtherKeys = () => {
      setShowDropdown(false);
      setIsCommand(false);
    };

    if (key === "Enter") {
      handleEnterKey();
    } else if (key === "/") {
      handleSlashKey();
    } else if (key === ":") {
      // || inputValue.includes(':')
      handleColonKey();
    } else {
      handleOtherKeys();
    }
  };

  const handleSelectMessage = (message) => {
    setFormValue(message);
    setShowDropdown(false);
  };

  const handleModeChange = (data) => {
    console.log(data.replace("_", " "));
    setChatbotMode(data.replace("_", " "));
    setShowDropdown(false);
    setFormValue("");
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  const generateImage = async (e) => {
    e?.preventDefault();
    if (!formValue) return;

    try {
      setLoading(true);
      const cleanPrompt = formValue?.trim();
      setFormValue("");
      updateMessage(cleanPrompt, false);

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      let apiEndpoint, data;
      if (preferences.imageGenerationModel === "Bedrock") {
        apiEndpoint = apiURl + `/generate_image`;
        data = {
          text: cleanPrompt,
        };
      } else if (preferences.imageGenerationModel === "Open AI") {
        apiEndpoint = apiURl + `/generate_image_with_openai`;
        data = {
          prompts: cleanPrompt,
          size: "1024x1024",
          quality: "standard",
        };
      }

      const response = await axios.post(apiEndpoint, data, {
        cancelToken: source.token,
      });

      let generatedImageBase64;
      if (response.status == 200) {
        if (preferences.imageGenerationModel === "Bedrock") {
          generatedImageBase64 = response.data.artifacts[0].base64;
        } else if (preferences.imageGenerationModel === "Open AI") {
          generatedImageBase64 = response.data;
        }
        setLoading(false);
        updateMessage(generatedImageBase64, true, true);
        return;
      } else {
        generatedImageBase64 = "No response from API";
      }
      updateMessage(generatedImageBase64, true);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle cancellation
        console.log("Request canceled:", error.message);
      } else {
        toast.error(error.message);
        removeLoading();
        console.error("Error:", error);
        setLoading(false);
      }
    }
  };

  const updatePrompt = async () => {
    const api = "https://us-central1-prompt-ops.cloudfunctions.net/optimize";
    const secretKey = process.env.REACT_APP_API_KEY;

    try {
      setLoading(true);
      const response = await fetch(api, {
        headers: {
          "x-api-key": `token ${secretKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          data: {
            prompt: formValue.trim(),
            targetModel: "chatgpt",
          },
        }),
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      setPrompt(responseData.result.promptOptimized);
      setLoading(false);
      setModalPromptOpen(true);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const clearChat = () => {
    clearMessages();
  };
  const handleUseClicked = () => {
    setFormValue(prompt);
    setModalPromptOpen(false);
  };

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.style.height = "auto";
    inputRef.current.style.height = inputRef.current.scrollHeight + "px";
  }, [formValue, dataName]);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputKey, setInputKey] = useState(0);

  const handleFileChange = (event) => {
    setModalOpen((prev) => !prev);

    const file = event.target.files[0];
    const fileNameWithoutSpaces = file.name.replace(/\s+/g, ""); // Remove all spaces from the file name

    // Create a new File object with the modified name
    const modifiedFile = new File([file], fileNameWithoutSpaces, {
      type: file.type,
    });

    // Use the modifiedFile as needed

    setSelectedFile(modifiedFile);

    // Now we can perform further actions, such as uploading the file to a server.
    // For simplicity, let's just log the file name for now.
    // if (selectedFile) {
    //   console.log(`Selected file: ${selectedFile.name}`);
    // }
  };

  const deselectFile = () => {
    setModalOpen(false);
    setSelectedFile(null);

    // Increment the key to force React to treat the input as a new element
    setInputKey((prevKey) => prevKey + 1);
  };

  // Microphone Functionality
  let {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    // crossBrowser: true,
  });

  useEffect(() => {
    setFormValue(String(results.map((result) => result.transcript)));
    // results.pop();
  }, [results]);

  if (error && !errorOccurred) {
    errorOccurred = true;
    toast.error("Web Speech API is not available in this browser 🤷");
  }

  return (
    <>
      <div className="chatview bg-[#161618] rounded-t-none rounded-r-none ">
        <div
          className="flex justify-between chatui-fontColor items-center p-4 pt-6 border-b-0 rounded-xl 
          rounded-tl-none rounded-b-none font-semibold text-xl"
        >
          <p className="w-full ml-5 select-none">
            AeonXIQ{" "}
            {chatbotMode !== "chat" && (
              <span
                className="text-sm px-2 py-[0.15rem] rounded-lg mb-1 cursor-pointer bg-amber-400 capitalize 
                hover:bg-gray-400 transition-all duration-300 group text-center"
                onClick={() => setChatbotMode("chat")}
              >
                <span className="opacity-100 group-hover:hidden group-hover:opacity-0 transition-all duration-1000">
                  {chatbotMode} Mode
                </span>
                <span
                  className="hidden opacity-100 group-hover:inline-block group-hover:opacity-100 
                transition-all duration-1000 min-w-[105px]"
                >
                  Exit
                </span>
              </span>
            )}
          </p>
        </div>
        {isRecording ? (
          <div className="w-full h-[100%] max-h-[520px] rounded-xl relative flex justify-center items-center">
            <img
              src={voiceGif}
              className="w-[98%] h-[98%] rounded-xl shadow-xl select-none"
            />
            {interimResult && (
              <p className="absolute bottom-[10%] left-[50%] translate-x-[-50%] text-gray-600 italic tracking-wide">
                {interimResult}
              </p>
            )}
          </div>
        ) : (
          <main className="chatview__chatarea rounded-xl backdrop-blur-xl">
            {messages.length === 0 ? (
              <div className="select-none h-full m-3 mt-12 rounded-lg  backdrop-blur-lg flex flex-col gap-2 justify-start items-center">
                {/* <img src={aeonxIqlogo} className="w-50 h-50" /> */}
                <Heading>How can I help you ?</Heading>
                {/* <p className=" text-lg md:text-md tracking-wider chatui-fontColor text-center">
                  How can I help you ?
                </p> */}

                {/* Some Initial Suggestions to send Messages */}

                {/* <InitialSuggestionBox
                  loading={loading}
                  setLoading={setLoading}
                  sendMessage={sendMessage}
                /> */}
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <ChatMessage
                    isMobileScreen={isMobileScreen}
                    key={index}
                    message={{ ...message }}
                  />
                ))}
              </>
            )}
            <span ref={messagesEndRef}></span>
          </main>
        )}
        {showDropdown && (
          <CommandsDropdown
            dataArray={dataArray}
            isCommand={isCommand}
            handleModeChange={handleModeChange}
            handleSelectMessage={handleSelectMessage}
          />
        )}
        {/* <form className="form" onSubmit={sendMessage}> */}
        {isMobileScreen === true ? (
          <div className="form border-t-2">
            <div className="flex mb-4 gap-x-3 w-full mt-3">
              <label>
                <input
                  key={inputKey}
                  className="hidden"
                  ref={fileInputRef}
                  type="file"
                  onChange={(event) => {
                    // setModalOpen((prev) => !prev)
                    handleFileChange(event);
                  }}
                />
                <HiOutlineUpload className=" chatview__btn-mobilescreen text-[#412BAC] p-1" />
              </label>
              <button
                id="mic_btn"
                onClick={() => {
                  if (isRecording) {
                    results.length = 0;
                    stopSpeechToText();
                    toast.error("Mic OFF");
                  } else {
                    startSpeechToText();
                    toast.success("Mic ON");
                  }
                }}
                className="chatview__btn-mobilescreen  flex text-[#412BAC]"
              >
                <IoMicOutline
                  className={`${
                    !isRecording ? "grayscale" : "grayscale-0"
                  } text-2xl`}
                />
              </button>
              <ReactTooltip
                anchorId="mic_btn"
                place="top"
                variant="dark"
                content={isRecording ? "Turn OFF Mic" : "Turn ON Mic"}
                className={` ${loading ? "hidden" : ""}`}
              />
              <ReactTooltip
                anchorId="tooltip"
                place="top"
                variant="dark"
                content="Clear Chat"
                className={` ${loading ? "hidden" : ""}`}
              />
              <ReactTooltip
                anchorId="generateImageTooltip"
                place="top"
                variant="dark"
                content="Generate Image"
                className={` ${loading ? "hidden" : ""}`}
              />
              <ReactTooltip
                anchorId="visualize"
                place="top"
                variant="dark"
                content="Visualize Data"
                className={` ${loading ? "hidden" : ""}`}
              />

              <button
                id="tooltip"
                type="button"
                className="chatview__btn-mobilescreen text-red-600"
                disabled={loading}
                onClick={clearChat}
              >
                {loading ? (
                  <div className="loading-spinner w-6 h-6" />
                ) : (
                  <MdClear size={26} />
                )}
              </button>
              <button
                id="generateImageTooltip"
                type="button"
                className="chatview__btn-mobilescreen text-violet-500"
                disabled={loading}
                onClick={generateImage}
              >
                <BsStars size={23} />
              </button>
              <button
                id="visualize"
                disabled={!isFileCSV}
                onClick={getAnalytics}
                className="chatview__btn-mobilescreen text-[#412BAC]"
              >
                <FaUncharted size={23} />
              </button>
            </div>

            <div className="flex justify-between w-full px-3 py-3 rounded-xl bg-secondary bg-opacity-10 shadow-xl drop-shadow-md focus:drop-shadow-2xl ">
              <textarea
                ref={inputRef}
                className="p-1 bg-transparent w-full max-h-[100px] flex items-center outline-none chatui-fontColor"
                rows={1}
                value={formValue}
                placeholder="Enter Your Prompt"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
              />
              <div className="flex items-center gap-2">
                {loading ? (
                  <button
                    onClick={handleStopClick}
                    className="chatview__btn-send w-14 flex text-[#412BAC]"
                  >
                    <IoStopCircle className="text-2xl" />
                  </button>
                ) : (
                  <button
                    // type="submit"
                    onClick={(e) => {
                      results.length = 0;
                      // setIsVoiceGifVisible(false);
                      stopSpeechToText();
                      sendMessage(e);
                    }}
                    className="chatview__btn-send bg-[#fa7f24] text-white"
                    disabled={!formValue}
                  >
                    <MdSend size={25} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="form">
            <div className="flex items-center justify-between gap-x-3 w-full">
              {/* <label>
                <input
                  key={inputKey}
                  className="hidden"
                  ref={fileInputRef}
                  type="file"
                  onChange={(event) => {
                    handleFileChange(event);
                  }}
                />
                <HiOutlineUpload className="chatview__btn-send cursor-pointer text-lg md:text-sm p-3 text-[#412BAC]" />
              </label> */}

              {/* <button
                id="mic_btn"
                onClick={() => {
                  if (isRecording) {
                    // console.log(isRecording);
                    results.length = 0;
                    stopSpeechToText();
                    toast.error("Mic OFF");
                  } else {
                    // console.log(isRecording);
                    startSpeechToText();
                    // toast.success('Mic ON')
                    navigator.mediaDevices
                      .getUserMedia({ audio: true })
                      .then(() => toast.success("Mic ON"))
                      .catch((error) => alert(error));
                  }
                }}
                className="chatview__btn-send w-16 flex text-[#412BAC]"
              >
                <IoMicOutline
                  className={`${
                    !isRecording ? "grayscale" : "grayscale-0"
                  } text-2xl`}
                />
              </button> */}
              <ReactTooltip
                anchorId="mic_btn"
                place="top"
                variant="dark"
                content={isRecording ? "Turn OFF Mic" : "Turn ON Mic"}
                className={` ${loading ? "hidden" : ""}`}
              />
              <textarea
                ref={inputRef}
                style={{ resize: "none" }}
                className="chatview__textarea-message text-[#C2C5CC] select-none h-fit"
                rows={1}
                value={formValue}
                // placeholder={`Enter Your Prompt, Use / to select prompt from history, Use :command for data operations.`}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
              />

              <div className="flex items-center gap-2">
                {loading ? (
                  <button
                    onClick={handleStopClick}
                    className="chatview__btn-send w-16 flex text-[#412BAC]"
                  >
                    <IoStopCircle className="text-2xl" />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    {chatbotMode === "chat" && (
                      <button
                        onClick={(e) => {
                          results.length = 0;
                          stopSpeechToText();
                          sendMessage(e);
                        }}
                        className="chatview__btn-send text-[#412BAC]"
                        disabled={!formValue}
                      >
                        <MdSend size={25} />
                      </button>
                    )}
                    {chatbotMode === "visualize" && (
                      <button
                        id="visualize"
                        // disabled={!isFileCSV}
                        onClick={getAnalytics}
                        className="chatview__btn-send text-[#412BAC]"
                      >
                        <FaUncharted size={23} />
                      </button>
                    )}
                    {/* {chatbotMode === "chat" && (
                      <button
                        onClick={(e) => {
                          results.length = 0;
                          stopSpeechToText();
                          generateImage(e);
                        }}
                        id="generateImageTooltip"
                        className="chatview__btn-send text-violet-500"
                        disabled={!formValue}
                      >
                        <BsStars size={23} />
                      </button>
                    )} */}
                  </div>
                )}
                {/* <button
                  id="tooltip"
                  type="button"
                  className="chatview__btn-send text-red-600"
                  disabled={loading}
                  onClick={clearChat}
                >
                  {loading ? (
                    <div className="loading-spinner" />
                  ) : (
                    <MdClear size={30} />
                  )}
                </button> */}
              </div>
            </div>
            <ReactTooltip
              anchorId="tooltip"
              place="top"
              variant="dark"
              content="Clear Chat"
              className={` ${loading ? "hidden" : ""}`}
            />
            {/* <ReactTooltip
              anchorId="generateImageTooltip"
              place="top"
              variant="dark"
              content="Generate Image"
              className={` ${loading ? "hidden" : ""}`}
            /> */}
            {/* <ReactTooltip
              anchorId="visualize"
              place="top"
              variant="dark"
              content="Visualize Data"
              className={` ${loading ? "hidden" : ""}`}
            /> */}
          </div>
        )}
        <Modal
          title="File Upload"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <FileUpload
            inputKey={inputKey}
            setInputKey={setInputKey}
            deselectFile={deselectFile}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        </Modal>
        {/* <Modal
          title="Setting"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        >
          <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </Modal>
        <Modal
          title="Prompt Perfect"
          modalOpen={modalPromptOpen}
          setModalOpen={setModalPromptOpen}
        >
          <PromptPerfect
            prompt={prompt}
            onChange={setPrompt}
            onCancelClicked={() => setModalPromptOpen(false)}
            onUseClicked={handleUseClicked}
          />
        </Modal> */}
      </div>
      {/* {!isMobileScreen && <ListFiles />} */}
    </>
  );
};

export default ChatView;
