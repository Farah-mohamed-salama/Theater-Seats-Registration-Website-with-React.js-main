import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Seat from './Seat';
import './MoviePage.css';

const SeatsMap = () => {
    const totalSeats = 40;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [disabledSeats, setDisabledSeats] = useState([]);
    const { film, date, hour } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // تحميل المقاعد المحجوزة عند تحميل المكون
        const userSeats = JSON.parse(localStorage.getItem('userSeats')) || [];
        const reservedSeats = userSeats
            .filter(entry => entry.film === film && entry.hour === hour)
            .flatMap(entry => entry.selectedSeats);
        
        setDisabledSeats(reservedSeats);
    }, [film, hour]);

    const handleSeatSelect = (seatId) => {
        // منع اختيار مقعد محجوز
        if (disabledSeats.includes(seatId)) return;
        
        setSelectedSeats(prev => 
            prev.includes(seatId) 
                ? prev.filter(seat => seat !== seatId) 
                : [...prev, seatId]
        );
    };

    const goToFoodPage = () => {
        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userSeats = JSON.parse(localStorage.getItem('userSeats')) || [];
        
        // إضافة الحجز الجديد
        userSeats.push({
            film,
            hour,
            date,
            currentUser,
            selectedSeats
        });

        localStorage.setItem('userSeats', JSON.stringify(userSeats));
        navigate('/food');
    };

    const renderSeats = () => {
        return Array.from({ length: totalSeats }, (_, i) => i + 1).map(seatId => (
            <Seat
                key={seatId}
                id={seatId}
                selected={selectedSeats.includes(seatId)}
                reserved={disabledSeats.includes(seatId)}
                onSelect={handleSeatSelect}
            />
        ));
    };

    return (
        <div className="movie-page-container">
            <div className="booking-card">
                <h2 className="booking-title">Seat Reservation for {film}</h2>
                
                <div className="section-title">Select Your Seats</div>
                <div className="screen-display">SCREEN</div>
                <div className="seats-container">{renderSeats()}</div>
                
                <div className="confirmation-section">
                    {selectedSeats.length > 0 && (
                        <p>Selected Seats: {selectedSeats.join(', ')}</p>
                    )}
                    <button 
                        className="continue-btn"
                        onClick={goToFoodPage}
                        disabled={selectedSeats.length === 0}
                    >
                        Continue to Food Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatsMap;