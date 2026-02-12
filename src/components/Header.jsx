import React from 'react';
import { ChevronLeft, Phone, Video, Flag } from 'lucide-react';

const Header = ({ username, subtitle, avatar }) => {
    return (
        <div className="header" style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            borderBottom: '1px solid #DBDBDB',
            gap: '12px',
            background: 'white'
        }}>
            <ChevronLeft size={28} style={{ cursor: 'pointer' }} />
            <div style={{ position: 'relative', width: '36px', height: '36px' }}>
                <img
                    src={avatar}
                    alt="profile"
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        background: '#eee'
                    }}
                    onError={(e) => {
                        e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback';
                    }}
                />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <h1 style={{
                    fontSize: '15px',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>{username}</h1>
                <p style={{
                    fontSize: '12px',
                    color: '#8E8E8E',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>{subtitle}</p>
            </div>
            <div style={{ display: 'flex', gap: '22px', alignItems: 'center', color: '#000' }}>
                <Phone size={22} strokeWidth={2.4} />
                <Video size={25} strokeWidth={2.3} />
                <Flag size={22} strokeWidth={2.3} />
            </div>
        </div>
    );
};

export default Header;
