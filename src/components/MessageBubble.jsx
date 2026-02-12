import React from 'react';
import { VideoOff } from 'lucide-react';

const MessageBubble = ({ message, senderAvatar }) => {
    const isOutgoing = message.type === 'outgoing';
    const isSystem = message.type === 'system';

    if (isSystem) {
        return (
            <div className="system-msg">
                <div className="system-icon">
                    <VideoOff size={14} color="#000" />
                </div>
                {message.text}
            </div>
        );
    }

    return (
        <div className={`message-bubble ${isOutgoing ? 'outgoing' : 'incoming'}`} style={{
            marginBottom: message.isLastInGroup ? '12px' : '2px',
            direction: message.isRTL ? 'rtl' : 'ltr',
            position: 'relative'
        }}>
            {!isOutgoing && message.showAvatar && (
                <div className="avatar-container">
                    <img
                        src={senderAvatar}
                        alt="sender"
                        className="avatar"
                        onError={(e) => {
                            e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=other';
                        }}
                    />
                </div>
            )}

            {message.replyTo && (
                <div style={{
                    borderLeft: isOutgoing ? '2px solid rgba(255,255,255,0.7)' : '2px solid #DBDBDB',
                    paddingLeft: '10px',
                    marginBottom: '8px',
                    fontSize: '13px',
                    opacity: 0.9,
                    textAlign: message.isRTL ? 'right' : 'left'
                }}>
                    <div style={{
                        color: isOutgoing ? 'rgba(255,255,255,0.8)' : '#8E8E8E',
                        fontSize: '11px',
                        marginBottom: '2px',
                        fontWeight: '600'
                    }}>
                        {message.replyTo.sender === 'me' ? 'You replied' : `You replied to ${message.replyTo.sender}`}
                    </div>
                    <div style={{
                        opacity: 0.8,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '200px'
                    }}>{message.replyTo.text}</div>
                </div>
            )}

            <div style={{ fontSize: '15px' }}>
                {message.text}
            </div>
        </div>
    );
};

export default MessageBubble;
