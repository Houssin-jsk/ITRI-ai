import React from 'react';

const SeatGrid = ({ seats, selectedSeat, onSelectSeat }) => {
    // Group seats by block and row
    const leftBlock = seats.filter(s => s.block === "Left");
    const rightBlock = seats.filter(s => s.block === "Right");

    const renderSeat = (seat) => {
        const isSelected = selectedSeat && selectedSeat.id === seat.id;
        const isReserved = seat.status === 'reserved';
        const isVip = seat.status === 'vip';

        let bgColor = '#e0e0e0'; // Available default
        let cursor = 'pointer';
        let border = '1px solid #ccc';

        if (isReserved) {
            bgColor = '#a0a0a0'; // Reserved
            cursor = 'not-allowed';
        } else if (isSelected) {
            bgColor = 'var(--color-primary)'; // Selected
            border = '1px solid var(--color-deep-blue)';
        } else if (isVip) {
            bgColor = 'var(--color-deep-blue)'; // VIP
            cursor = 'not-allowed'; // User cannot select VIP? "Public users cannot select VIP seats"
        }

        return (
            <div
                key={seat.id}
                onClick={() => {
                    if (!isReserved && !isVip) {
                        onSelectSeat(seat);
                    }
                }}
                title={`Seat ${seat.id} (${seat.status})`}
                style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: bgColor,
                    borderRadius: '4px',
                    margin: '4px',
                    cursor: cursor,
                    border: border,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.6rem',
                    transition: 'all 0.2s'
                }}
            >
                {seat.col}
            </div>
        );
    };

    const renderBlock = (blockSeats, blockName) => {
        // 8 rows
        const rows = [];
        for (let r = 1; r <= 8; r++) {
            rows.push(blockSeats.filter(s => s.row === r).sort((a, b) => a.col - b.col));
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 style={{ marginBottom: '8px' }}>{blockName}</h4>
                {rows.map((rowSeats, idx) => (
                    <div key={idx} style={{ display: 'flex' }}>
                        {rowSeats.map(renderSeat)}
                    </div>
                ))}
                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#666' }}>Stage This Way ↑</div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', margin: '32px 0' }}>
            {renderBlock(leftBlock, "Left Block")}
            {renderBlock(rightBlock, "Right Block")}
        </div>
    );
};

export default SeatGrid;
