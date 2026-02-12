import React from 'react';
import { VideoOff, Heart, MessageCircle, Repeat2, Send } from 'lucide-react';

const MessageBubble = ({ message, senderAvatar }) => {
    const isOutgoing = message.type === 'outgoing' || (message.type === 'shared-post' && message.isOutgoing);
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

    if (message.type === 'shared-post') {
        return (
            <div className={`message-bubble shared-post ${isOutgoing ? 'outgoing' : 'incoming'}`} style={{
                marginBottom: '12px',
                maxWidth: '85%'
            }}>
                <div className="post-header">
                    <img src={message.postUserAvatar || senderAvatar} alt="user" className="post-user-avatar" />
                    <div className="post-user-info">
                        <span className="post-username">{message.postUsername || 'user'}</span>
                        <span className="post-subtitle">{message.postSubtitle || 'Original Audio'}</span>
                    </div>
                    <div className="post-action-icon">
                        <div className="dots-icon"></div>
                    </div>
                </div>

                <div className="post-content">
                    <img src={message.postImage || senderAvatar} alt="post" className="post-image" />
                    <div className="post-overlay-play"></div>
                </div>

                <div className="post-footer">
                    <div className="post-footer-actions">
                        <Heart size={18} strokeWidth={2} fill="#ff3040" color="#ff3040" />
                        <span className="post-likes-count">٢</span>
                        <MessageCircle size={18} strokeWidth={2} />
                        <Repeat2 size={18} strokeWidth={2} />
                        <Send size={18} strokeWidth={2} />
                    </div>
                </div>

                {/* Emoji Reaction */}
                <div style={{
                    position: 'absolute',
                    bottom: '-12px',
                    right: isOutgoing ? '0' : 'auto',
                    left: !isOutgoing ? '0' : 'auto',
                    background: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    border: '1px solid #eee',
                    zIndex: 5
                }}>
                    😂
                </div>
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
