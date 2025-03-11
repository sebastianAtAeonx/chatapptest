import { useContext, useEffect, useState } from 'react';
import { CreateFileContext } from '../context/fileContext';

/**
 * A custom hook for managing the conversation between the user and the AI.
 *
 * @returns {Object} An object containing the `messages` array and the `addMessage` function.
 */

const useMessageCollection = () => {
  const { dataName } = useContext(CreateFileContext);
  // const initialMsg = {
  //   id: 1,
  //   createdAt: Date.now(),
  //   text: `
  //     Hey
  //     I am AeonX Chat Bot
  //     Get your answer from your PDF
  //   `,
  //   ai: true,
  // };

  // const selectedFileName = localStorage.getItem('fileName');

  // const selectedFileMsg = {
  //   id: 1,
  //   createdAt: Date.now(),
  //   text: `Selected File: ${selectedFileName === null ? 'No File Selected' : selectedFileName}`,
  //   isInitialMsg: true,
  //   ai: true,
  // };

  const loadingMsg = {
    id: 2,
    createdAt: Date.now(),
    text: `Getting response...`,
    isGif: true,
    isResponseImg: false,
    ai: true,
  };

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {}, [dataName]);
  /**
   * A function for adding a new message to the collection.
   *
   * @param {Object} message - The message to add to the collection.
   */
  const addMessage = (message) => {
    // setMessages((prev) => [...prev, message]);

    if (!message.ai) {
      // If Loading is there remove it
      if (loading) {
        removeLoading();
      }

      // ?Idea Aborted (display file name in chat)
      // // If this is first message then show Selected File to the user
      // if (messages.length === 0) {
      //   setMessages((prev) => [...prev, selectedFileMsg]);
      // }

      // Set the message in the array
      setMessages((prev) => [...prev, message]);
      setTimeout(() => {
        addLoading();
      }, 250);
    }
    if (message.ai) {
      removeLoading();
      setMessages((prev) => [...prev, message]);
    }
  };

  const addLoading = () => {
    setLoading(true);
    setMessages((prev) => [...prev, loadingMsg]);
  };

  const removeLoading = () => {
    setLoading(false);
    setMessages((prev) => {
      return prev.slice(0, -1);
    });
  };

  const clearMessages = () => setMessages([]);

  return [messages, addMessage, clearMessages, removeLoading];
};

export default useMessageCollection;
