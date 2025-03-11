import React, { useContext, useEffect, useState } from 'react';
import bot_avatar from '../assets/bot-avatar.png';
import { ChatContext } from '../context/chatContext';
import axios from 'axios';
import { apiURl } from '../config';
import { toast } from 'react-hot-toast';

function InitialSuggestionBox({ loading, setLoading }) {
  const [preferencesData, setPreferencesData] = useState({});

  useEffect(() => {
    const UserPreferences = JSON.parse(localStorage.getItem('UserPreferences'));
    if (UserPreferences) {
      setPreferencesData(UserPreferences);
    } else {
      setPreferencesData({
        fontSize: '',
        font: '',
        theme: '',
      });
    }
  }, []);

  const updateMessage = (msg, ai = false) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: msg,
      ai: ai,
    };
    addMessage(newMsg);
  };

  const [messages, addMessage, clearMessages, removeLoading] = useContext(ChatContext);

  const sendPrompt = (e) => {
    let msg = e.target.innerText;
    sendMessage(e, msg);
  };

  const sendMessage = async (e, msg) => {
    e?.preventDefault();
    if (!msg) return;

    try {
      setLoading(true);
      const cleanPrompt = msg?.trim();
      updateMessage(cleanPrompt, false);
      const source = axios.CancelToken.source();
      // setCancelTokenSource(source);

      const formData = new FormData();
      formData.append('question', cleanPrompt);
      formData.append('index_id', 'ff480599-5683-4e6c-9d00-f20b8c10dc0e');

      const apiEndpoint = apiURl + '/ask';
      const params = formData;

      const response = await axios.post(apiEndpoint, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        cancelToken: source.token,
      });

      let apiResponseMessage;

      if (response.data.error) {
        apiResponseMessage = response.data.error || 'No response from API';
      } else {
        apiResponseMessage = response.data || 'No response from API';
      }

      updateMessage(apiResponseMessage, true);
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle cancellation
        console.log('Request canceled:', error.message);
      } else {
        toast.error(error.message);
        setLoading(false);
        removeLoading();
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <div
        className="border border-gray-400 flex-row-reverse shadow-lg message m-3 mt-8 bg-neutral/90 
        flex rounded-xl px-4 md:px-10 "
      >
        <div className={`message__wrapper`}>
          <div
            className={`message__markdown`}
            style={{ fontSize: preferencesData ? `${preferencesData.fontSize}px` : '16px' }}
          >
            Hello I&apos;m AeonXIQ, Enter a prompt to start a conversation. I&apos;ll respond using
            data from within your organization.
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div
              onClick={sendPrompt}
              className="chatui-fontColor p-2 cursor-pointer bg-secondary/30 hover:brightness-90 rounded-xl flex justify-center items-center"
            >
              Draft a professional email
            </div>
            <div
              onClick={sendPrompt}
              className="chatui-fontColor p-3 cursor-pointer bg-secondary/30 hover:brightness-90 rounded-xl flex justify-center items-center"
            >
              Brainstorm ideas
            </div>
          </div>
        </div>

        <div className="message__pic">
          <div className="avatar">
            <div className="w-8 border rounded-full">
              <img
                width="30"
                src={bot_avatar}
                alt="Logo"
                className=" contrast-[0.95] brightness-[1.4]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialSuggestionBox;
