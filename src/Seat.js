import React from 'react';
import './MoviePage.css';

const Seat = ({ id, selected, reserved, onSelect }) => {
    const handleClick = () => {
        if (!reserved) {
            onSelect(id);
        }
    };

    const seatClass = reserved 
        ? 'seat reserved' 
        : selected 
            ? 'seat selected' 
            : 'seat available';

    return (
        <div 
            className={seatClass}
            onClick={handleClick}
        >
            {id}
        </div>
    );
};

export default Seat;