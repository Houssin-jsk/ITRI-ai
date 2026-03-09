import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid #eee'
        }}>
            <div className="container" style={{
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <img src="/logo.png" alt="ITRI AI EVENT" style={{ height: '45px' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-deep-blue)' }}>ITRI AI EVENT</span>
                </Link>

                <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    <Link to="/" style={{
                        color: isActive('/') ? 'var(--color-primary)' : 'var(--color-text-main)',
                        fontWeight: 500
                    }}>Accueil</Link>
                    <Link to="/speakers" style={{
                        color: isActive('/speakers') ? 'var(--color-primary)' : 'var(--color-text-main)',
                        fontWeight: 500
                    }}>Intervenants</Link>
                    <Link to="/agenda" style={{
                        color: isActive('/agenda') ? 'var(--color-primary)' : 'var(--color-text-main)',
                        fontWeight: 500
                    }}>Programme</Link>

                    <Link to="/reservation" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                        Réserver
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
