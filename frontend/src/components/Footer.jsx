import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--color-deep-blue)',
            color: 'white',
            padding: '48px 0',
            textAlign: 'center'
        }}>
            <div className="container">
                <h4 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>AI ITRI NTIC EVENT 2026</h4>
                <p style={{ opacity: 0.7, marginBottom: '24px' }}>Tanger, Maroc</p>
                <p style={{ fontSize: '0.875rem', opacity: 0.5 }}>© 2026 ISTA NTIC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
