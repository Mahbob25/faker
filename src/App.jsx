import React, { useState, useRef, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import InputBar from './components/InputBar';

/**
 * CONFIGURATION: Change these values to customize the simulator
 */
const DEFAULT_CONFIG = {
  username: 'a43_c',
  subtitle: '🇾🇪Pride Yemeni👑...',
  avatarUrl: 'https://i.pravatar.cc/150?u=a43_c', // Placeholder, user will replace
  senderAvatarUrl: 'https://i.pravatar.cc/150?u=me',
};

const App = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'incoming',
      contentType: 'image',
      imageUrl: '/src/assets/cats.jpg',
      showAvatar: false,
      isLastInGroup: true
    },
    { id: 2, type: 'system', text: 'اليوم ١٢:٣٨ ص', isDate: true },
    { id: 3, type: 'incoming', text: 'كيفك يا حياتوووو', isRTL: true, showAvatar: true },
    { id: 4, type: 'incoming', text: 'اووووووو', isRTL: true, showAvatar: false },
    { id: 5, type: 'incoming', text: 'اخيراً قالها🎵', isRTL: true, showAvatar: false },
    { id: 6, type: 'incoming', text: 'قال احبك قالها🎶🎶🎶🎶', isRTL: true, showAvatar: true, isLastInGroup: true },
  ]);

  const [senderSide, setSenderSide] = useState('outgoing');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
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

      <div className="controls-panel">
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Chat Config</h2>

        <div style={{ marginBottom: '16px' }}>
          <label>Username</label>
          <input
            type="text"
            value={config.username}
            onChange={(e) => setConfig({ ...config, username: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Subtitle</label>
          <input
            type="text"
            value={config.subtitle}
            onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Profile Image URL</label>
          <input
            type="text"
            value={config.avatarUrl}
            onChange={(e) => setConfig({ ...config, avatarUrl: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Sender Side</label>
          <select
            value={senderSide}
            onChange={(e) => setSenderSide(e.target.value)}
          >
            <option value="outgoing">Right (Purple)</option>
            <option value="incoming">Left (Gray)</option>
          </select>
        </div>

        <button
          onClick={() => setMessages([])}
          style={{
            width: '100%',
            padding: '12px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default App;
