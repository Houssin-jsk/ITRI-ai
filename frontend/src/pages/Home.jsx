import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                background: 'linear-gradient(135deg, var(--color-deep-blue) 0%, var(--color-primary) 100%)',
                color: 'white',
                padding: '120px 0',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                {/* Abstract Background Element */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                    borderRadius: '50%'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
                        AI ITRI NTIC EVENT 2026
                    </h1>
                    <p style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '8px', fontWeight: 300 }}>
                        Tanger, Maroc • 3 Jours d'Inspiration
                    </p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '48px', color: '#89CFF0' }}>
                        Don’t follow the future… reinvent it
                    </p>

                    <button
                        className="btn"
                        onClick={() => navigate('/reservation')}
                        style={{
                            background: 'white',
                            color: 'var(--color-primary)',
                            padding: '16px 48px',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                        }}
                    >
                        👉 Réserver ma place
                    </button>
                </div>
            </section>

            {/* Description Section */}
            <section className="section container" style={{ textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="h2" style={{ marginBottom: '24px' }}>L'Événement Tech de l'Année</h2>
                    <p className="text-body" style={{ fontSize: '1.125rem', marginBottom: '32px' }}>
                        Rejoignez l'élite technologique pour explorer les frontières de l'Intelligence Artificielle.
                        Des conférences exclusives, des ateliers pratiques et des opportunités de networking uniques
                        avec les leaders de l'industrie.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginTop: '48px' }}>
                        <div>
                            <div style={{ color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 800 }}>3</div>
                            <p>Jours intensifs</p>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 800 }}>20+</div>
                            <p>Speakers internationaux</p>
                        </div>
                        <div>
                            <div style={{ color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 800 }}>80</div>
                            <p>Places exclusives</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sponsors Section */}
            <section style={{ background: 'white', padding: '64px 0', borderTop: '1px solid #eee' }}>
                <div className="container">
                    <p style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px', color: '#999', marginBottom: '32px' }}>
                        Soutenu par les leaders de l'industrie
                    </p>
                    <div className="flex-center" style={{ gap: '48px', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
                        {/* Sponsor Placeholders */}
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>MICROSOFT</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>GOOGLE</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>IBM</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>NVIDIA</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
