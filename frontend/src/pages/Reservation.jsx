import React, { useState, useEffect } from 'react';
import SeatGrid from '../components/SeatGrid';

const Reservation = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [formData, setFormData] = useState({ fullName: '', email: '', days: [] });
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async () => {
        try {
            const res = await fetch('http://localhost:8001/api/seats');
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setSeats(data);
        } catch (err) {
            console.error(err);
            setError("Unable to load seats. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleDayChange = (day) => {
        setFormData(prev => {
            if (day === 'All') return { ...prev, days: ['All'] };
            const newDays = prev.days.includes('All') ? [] : [...prev.days];

            if (prev.days.includes(day)) {
                return { ...prev, days: newDays.filter(d => d !== day) };
            } else {
                return { ...prev, days: [...newDays, day] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSeat || !formData.fullName || !formData.email || formData.days.length === 0) {
            alert("Please fill all fields and select a seat.");
            return;
        }

        try {
            const res = await fetch('http://localhost:8001/api/reserve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    seat_id: selectedSeat.id,
                    user: {
                        full_name: formData.fullName,
                        email: formData.email,
                        selected_days: formData.days
                    }
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.detail || "Reservation failed");
            }

            // Generate Ticket
            const ticketRes = await fetch('http://localhost:8001/api/generate-ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    seat_id: selectedSeat.id,
                    user: {
                        full_name: formData.fullName,
                        email: formData.email,
                        selected_days: formData.days
                    }
                })
            });
            const ticketData = await ticketRes.json();
            setTicket(ticketData.pdf_base64);
            fetchSeats(); // Refresh grid

        } catch (err) {
            alert(err.message);
        }
    };

    if (ticket) {
        return (
            <div className="container section fade-in flex-center" style={{ flexDirection: 'column' }}>
                <h2 className="h2" style={{ color: 'green', marginBottom: '16px' }}>Réservation Confirmée !</h2>
                <p>Merci {formData.fullName}. Votre place {selectedSeat.id} est réservée.</p>
                <div style={{ marginTop: '32px' }}>
                    <a
                        href={`data:application/pdf;base64,${ticket}`}
                        download={`Ticket-${formData.fullName}.pdf`}
                        className="btn btn-primary"
                    >
                        👉 Télécharger le ticket (PDF)
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="container section fade-in">
            <h2 className="h2" style={{ marginBottom: '32px', textAlign: 'center' }}>Réserver votre place</h2>

            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            {loading ? <p style={{ textAlign: 'center' }}>Chargement...</p> : (
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>

                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <h3 className="h3" style={{ textAlign: 'center' }}>1. Choisissez votre siège</h3>
                        <SeatGrid seats={seats} selectedSeat={selectedSeat} onSelectSeat={setSelectedSeat} />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.8rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 16, height: 16, background: '#e0e0e0' }} /> Libre</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 16, height: 16, background: 'var(--color-primary)' }} /> Sélectionné</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 16, height: 16, background: '#a0a0a0' }} /> Réservé</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 16, height: 16, background: 'var(--color-deep-blue)' }} /> VIP</span>
                        </div>
                    </div>

                    <div style={{ flex: '0 0 400px', background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', height: 'fit-content' }}>
                        <h3 className="h3" style={{ marginBottom: '24px' }}>2. Vos informations</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nom Complet</label>
                                <input
                                    type="text"
                                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
                                <input
                                    type="email"
                                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Jours</label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {['Day 1', 'Day 2', 'Day 3'].map(d => (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => handleDayChange(d)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                border: formData.days.includes(d) || formData.days.includes('All') ? '1px solid var(--color-primary)' : '1px solid #ccc',
                                                background: formData.days.includes(d) || formData.days.includes('All') ? 'rgba(0,106,215,0.1)' : 'white',
                                                color: formData.days.includes(d) || formData.days.includes('All') ? 'var(--color-primary)' : 'black',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => handleDayChange('All')}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '4px',
                                            border: formData.days.includes('All') ? '1px solid var(--color-primary)' : '1px solid #ccc',
                                            background: formData.days.includes('All') ? 'rgba(0,106,215,0.1)' : 'white',
                                            color: formData.days.includes('All') ? 'var(--color-primary)' : 'black',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        3 Jours
                                    </button>
                                </div>
                            </div>

                            <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '4px', marginBottom: '24px' }}>
                                <strong>Siège sélectionné:</strong> {selectedSeat ? selectedSeat.id : 'Aucun'}
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={!selectedSeat}>
                                Confirmer la réservation
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Reservation;
