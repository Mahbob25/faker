import React, { useState } from 'react';
import { Camera, Mic, Image, Smile, Plus } from 'lucide-react';

const InputBar = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div className="input-bar">
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#0095f6', // Instagram blue
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0
            }}>
                <Camera size={20} fill="currentColor" strokeWidth={2.5} />
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <div className="input-icons" style={{ gap: text.trim() ? '8px' : '14px' }}>
                    {!text.trim() && (
                        <>
                            <Mic size={22} strokeWidth={2.2} />
                            <Image size={22} strokeWidth={2.2} />
                            <Smile size={22} strokeWidth={2.2} />
                        </>
                    )}
                    {text.trim() ? (
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#0095f6',
                                fontWeight: '700',
                                fontSize: '16px',
                                padding: '0 8px',
                                cursor: 'pointer'
                            }}
                        >
                            Send
                        </button>
                    ) : (
                        <Plus size={22} strokeWidth={2.5} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputBar;
