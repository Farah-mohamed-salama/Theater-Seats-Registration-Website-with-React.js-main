import React, { useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './MoviePage.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MoviePage() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);

    const availableDates = ['2023-04-08', '2023-04-04', '2023-04-02'];
    const availableTimes = ['6:00 PM', '7:30 PM', '9:00 PM', '10:30 PM'];

    const disableUnavailableDates = current => {
        return !availableDates.includes(current.format('YYYY-MM-DD'));
    };

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        navigate(`/movie/film-title/${time.replace(':','').replace(' ','')}`);
    };

    return (
        <Container className="movie-page-container py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <div className="booking-card shadow-sm rounded p-4">
                        <h2 className="booking-title text-center mb-4">🎬 Select Showtime</h2>
                        
                        <div className="calendar-section mb-4">
                            <h4 className="section-title mb-2">📅 Choose Date</h4>
                            <DateTime 
                                value={selectedDate}
                                onChange={handleDateChange}
                                timeFormat={false}
                                isValidDate={disableUnavailableDates}
                                inputProps={{
                                    placeholder: "Select date",
                                    readOnly: true
                                }}
                                closeOnSelect={true}
                            />
                            <div className="available-dates mt-3">
                                <p className="fw-bold">Available dates:</p>
                                <ul className="date-list">
                                    {availableDates.map(date => (
                                        <li key={date}>
                                            {new Date(date).toLocaleDateString('en-US', { 
                                                weekday: 'short', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="time-section mb-4">
                            <h4 className="section-title mb-3">🕒 Available Times</h4>
                            <div className="time-slots">
                                {availableTimes.map(time => (
                                    <button
                                        key={time}
                                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                        onClick={() => handleTimeSelect(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedTime && (
                            <div className="confirmation-section text-center mt-4">
                                <p>🎟 Selected showtime: <strong>{selectedDate.toLocaleDateString()} at {selectedTime}</strong></p>
                                <button 
                                    className="continue-btn btn btn-success mt-3"
                                    onClick={() => navigate('/seats')}
                                >
                                    Continue to Seat Selection →
                                </button>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default MoviePage;
