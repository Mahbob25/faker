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
                <Camera size={18} fill="currentColor" />
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <div className="input-icons">
                    <Mic size={22} />
                    <Image size={22} />
                    <Smile size={22} />
                    <Plus size={22} />
                </div>
            </div>
        </div>
    );
};

export default InputBar;
