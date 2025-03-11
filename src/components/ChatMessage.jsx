import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import remarkGfm from 'remark-gfm';
import moment from 'moment';
import person from '../assets/user.png';
import bot_avatar from '../assets/bot-avatar.png';
import loadingGif from '../assets/loading.gif';
import { LuCopy, LuCopyCheck, LuDownload } from 'react-icons/lu';
import { Box, Modal, Typography } from '@mui/material';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, isGif = false, ai = false, isResponseImg = false } = props.message;
  // const isMobileScreen = props.isMobileScreen;
  const [showCopied, setShowCopied] = useState(false);
  const [preferencesData, setPreferencesData] = useState({});
  const [imageBase64, setImageBase64] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80vw',
    maxHeight: '80vh',
    bgcolor: '#ffffff18',
    borderRadius: '12px',
    outline: 'none',
    boxShadow: 24,
    p: 3,
  };
  const modalStyle = {
    backdropFilter: 'blur(3px)',
  };

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
  const copyToClipboard = async (msg) => {
    await navigator.clipboard.writeText(msg);

    setShowCopied(true);

    setTimeout(() => {
      setShowCopied(false);
    }, 900);
  };

  const downloadImage = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div key={id} className={`px-4 py-2 chat ${ai ? 'chat-start' : 'chat-end'} `}>
        <div className="chat-image avatar">
          <div className="w-8 md:w-10 rounded-full">
            <img alt={ai ? 'bot-Avatar' : 'userAvatar'} src={ai ? bot_avatar : person} />
          </div>
        </div>
        <div
          style={{ fontSize: preferencesData ? `${preferencesData.fontSize}px` : '16px' }}
          className={`chat-bubble bg-accent bg-opacity-${ai ? 30 : 20} message__markdown`}
        >
          {isGif ? (
            <img src={loadingGif} className="h-7" alt="loading" loading="lazy" />
          ) : isResponseImg ? (
            <img
              src={`data:image/png;base64, ${text}`}
              alt="generated image"
              className="rounded-lg my-2 w-[300px] cursor-pointer"
              onClick={() => {
                setImageBase64(text);
                handleOpen();
              }}
            />
          ) : (
            text
          )}
          <div className="mt-1 flex justify-end">
            {!isGif && ai && (
              <div
                data-tip={isResponseImg ? 'Download' : 'Copy'}
                onClick={() =>
                  isResponseImg
                    ? downloadImage(text, 'GenAX_Generated_Image.png')
                    : copyToClipboard(text)
                }
                className="chatui-fontColor cursor-pointer relative rounded-md p-[0.185rem] tooltip tooltip-bottom tooltip-primary bg-neutral active:scale-90 hover:bg-neutral/70"
              >
                {isResponseImg ? (
                  showCopied ? (
                    <LuDownload size={14} />
                  ) : (
                    <LuDownload size={14} />
                  )
                ) : showCopied ? (
                  <LuCopyCheck size={16} />
                ) : (
                  <LuCopy size={16} />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="chat-footer opacity-50 text-[0.625rem] italic select-none">
          {moment(createdAt).calendar()}
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalStyle}
      >
        <Box sx={style}>
          <img
            src={`data:image/png;base64, ${imageBase64}`}
            alt="generated image preview"
            draggable="false"
            className="rounded-lg  max-h-[70vh]"
          />
        </Box>
      </Modal>
    </>
  );
};

export default ChatMessage;
