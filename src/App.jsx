import React, { useState, useRef, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import InputBar from './components/InputBar';


/**
 * ==========================================
 * SIMULATOR CONFIGURATION
 * ==========================================
 * Change these values to customize the chat.
 * You can use local image paths or external URLs.
 */
const DEFAULT_CONFIG = {
  username: 'a43_c',
  subtitle: '🇾🇪˹͢⁽𝓟𝓻𝓲𝓭𝓮𝓨𝓮𝓶𝓮𝓷𝓲👑₎🇾🇪 ♝',
  avatarUrl: '/assets/a43_c.jpg',
  senderAvatarUrl: '/assets/a43_c.jpg',
};
/** ========================================== **/

const App = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const [messages, setMessages] = useState([
    { id: 12, type: 'system', text: 'Video call ended' },
    { id: 6, type: 'incoming', text: 'حتى انا', isRTL: true, showAvatar: true, isLastInGroup: true },
    { id: 7, type: 'outgoing', text: 'زعلانه', isRTL: true, isLastInGroup: true },
    { id: 8, type: 'incoming', text: 'والله', isRTL: true, showAvatar: true, isLastInGroup: true },
    { id: 9, type: 'outgoing', text: 'براضيها', isRTL: true, isLastInGroup: true },
    { id: 11, type: 'outgoing', text: 'اووووووو', isRTL: true, replyTo: { sender: 'him', text: 'كيفك يا حياتوووو' } },

  ]);

  const [senderSide, setSenderSide] = useState('outgoing');
  const chatRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    };
    scrollToBottom();

    // Also scroll on focus to handle mobile keyboard
    const input = document.querySelector('input');
    if (input) {
      input.addEventListener('focus', () => {
        setTimeout(scrollToBottom, 300);
      });
    }
    return () => {
      if (input) {
        input.removeEventListener('focus', scrollToBottom);
      }
    };
  }, [messages]);

  const handleSend = (text) => {
    const isRTL = /[\u0600-\u06FF]/.test(text);
    const newMessage = {
      id: Date.now(),
      type: senderSide,
      text,
      isRTL,
      showAvatar: senderSide === 'incoming',
      isLastInGroup: true
    };

    const updatedMessages = [...messages];
    if (updatedMessages.length > 0) {
      const last = updatedMessages[updatedMessages.length - 1];
      if (last.type === senderSide && last.type !== 'system') {
        last.isLastInGroup = false;
      }
    }

    setMessages([...updatedMessages, newMessage]);
  };

  return (
    <div id="root">
      <div className="iphone-frame">
        <StatusBar />
        <Header
          username={config.username}
          subtitle={config.subtitle}
          avatar={config.avatarUrl}
        />

        <div className="chat-container" ref={chatRef}>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              senderAvatar={config.avatarUrl}
            />
          ))}
        </div>

        <InputBar onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;
