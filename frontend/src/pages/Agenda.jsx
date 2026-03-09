import React, { useState } from 'react';

const schedule = {
    1: [
        { time: "09:00", title: "Cérémonie d'ouverture", speaker: "Direction ISTA", type: "Keynote" },
        { time: "10:30", title: "L'IA Générative en 2026", speaker: "Dr. Sarah Conner", type: "Conference" },
        { time: "12:00", title: "Pause Déjeuner", speaker: "-", type: "Break" },
        { time: "14:00", title: "Workshop: PyTorch Basics", speaker: "Michael Chen", type: "Workshop" }
    ],
    2: [
        { time: "09:30", title: "Éthique et IA", speaker: "Jane Smith", type: "Panel" },
        { time: "11:00", title: "Robotics & Automation", speaker: "Alex Turing", type: "Conference" },
        { time: "14:00", title: "Workshop: Computer Vision", speaker: "John Doe", type: "Workshop" }
    ],
    3: [
        { time: "10:00", title: "Hackathon: Final Presentations", speaker: "All Teams", type: "Hackathon" },
        { time: "15:00", title: "Cérémonie de remise des prix", speaker: "Jury", type: "Closing" }
    ]
}

const Agenda = () => {
    const [activeDay, setActiveDay] = useState(1);

    return (
        <div className="container section fade-in">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 className="h2" style={{ marginBottom: '16px' }}>Programme Officiel</h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
                {[1, 2, 3].map(day => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        style={{
                            padding: '12px 32px',
                            border: 'none',
                            background: activeDay === day ? 'var(--color-primary)' : 'white',
                            color: activeDay === day ? 'white' : 'var(--color-text-main)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            boxShadow: activeDay === day ? 'var(--shadow-md)' : 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        Jour {day}
                    </button>
                ))}
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {schedule[activeDay].map((item, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        background: 'white',
                        padding: '24px',
                        marginBottom: '16px',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)',
                        borderLeft: `4px solid ${item.type === 'Break' ? '#ccc' : 'var(--color-primary)'}`
                    }}>
                        <div style={{ minWidth: '80px', fontWeight: 800, color: 'var(--color-deep-blue)' }}>{item.time}</div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.title}</h4>
                            <p className="text-small" style={{ color: '#666' }}>
                                <span style={{ fontWeight: 600 }}>{item.speaker}</span> • {item.type}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agenda;
