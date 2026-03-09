import React from 'react';

const speakersData = [
    { id: 1, name: "Dr. Sarah Conner", role: "AI Research Lead", company: "SkyNet Corp" },
    { id: 2, name: "John Doe", role: "Chief Data Scientist", company: "DataFlow" },
    { id: 3, name: "Jane Smith", role: "Ethical AI Advocate", company: "OpenFuture" },
    { id: 4, name: "Alex Turing", role: "Robotics Engineer", company: "MechSystems" },
    { id: 5, name: "Emily White", role: "Cloud Architect", company: "Nebula" },
    { id: 6, name: "Michael Chen", role: "Deep Learning Specialist", company: "NeuralNet" }
];

const Speakers = () => {
    return (
        <div className="container section fade-in">
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h2 className="h2" style={{ marginBottom: '16px' }}>Nos Intervenants</h2>
                <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Découvrez les visionnaires qui façonnent le futur de la technologie.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
                {speakersData.map((speaker) => (
                    <div key={speaker.id} style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{
                            height: '200px',
                            background: 'linear-gradient(to bottom right, #e0e7ff, #f9fafb)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-light-blue)'
                        }}>
                            {/* Photo Placeholder */}
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <h3 className="h3" style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{speaker.name}</h3>
                            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>{speaker.company}</p>
                            <p className="text-small" style={{ color: '#666' }}>{speaker.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
