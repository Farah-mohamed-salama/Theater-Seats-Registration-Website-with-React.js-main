import React, { useState } from 'react';
import { Container, Button, Card, Row, Col, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';
import PaymentPopUp from './PaymentPopUp';
import { FaTicketAlt, FaUtensils, FaMapMarkerAlt, FaMoneyBillWave, FaTimes } from 'react-icons/fa';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // User data
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Booking data
  const userSeats = JSON.parse(localStorage.getItem('userSeats')) || [];
  const userSeatss = userSeats.filter(entry => entry.currentUser === currentUser);
  const reservedSeats = userSeatss.length > 0 ? userSeatss[userSeatss.length - 1].selectedSeats : [];
  const hour = userSeatss.length > 0 ? userSeatss[userSeatss.length - 1].hour : '';
  const film = userSeatss.length > 0 ? userSeatss[userSeatss.length - 1].film : '';

  // Food data
  const userFood = JSON.parse(localStorage.getItem('userFood')) || [];
  const userOrders = userFood.filter(entry => entry.currentUser === currentUser);
  const food = userOrders.length > 0 ? userOrders[userOrders.length - 1].order : [];
  const foodTotal = userOrders.length > 0 ? userOrders[userOrders.length - 1].total : 0;

  // Calculate total
  const calculateTotal = () => {
    return foodTotal + (reservedSeats.length * 100);
  };

  // Theater location (replace with actual coordinates)
  const theaterLocation = {
    lat: 30.033333,
    lng: 31.233334,
    address: "123 Cinema Street, Downtown"
  };

  return (
    <Container className="payment-container">
      <Card className="payment-card">
        <Card.Header className="payment-header">
          <h2><FaTicketAlt className="me-2" />Order Summary</h2>
        </Card.Header>
        
        <Card.Body>
          {/* Booking Information Section */}
          <section className="booking-section mb-4">
            <h3 className="section-title"><FaTicketAlt className="me-2" />Ticket Details</h3>
            <Table striped bordered hover className="booking-table">
              <tbody>
                <tr>
                  <td className="fw-bold">Theater:</td>
                  <td>Cairo Theater</td>
                </tr>
                <tr>
                  <td className="fw-bold">Location:</td>
                  <td>
                    {theaterLocation.address}
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="map-link p-0 ms-2"
                      onClick={() => window.open(`https://www.google.com/maps?q=${theaterLocation.lat},${theaterLocation.lng}`, '_blank')}
                    >
                      <FaMapMarkerAlt className="me-1" />View Map
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">Movie:</td>
                  <td>{film}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Showtime:</td>
                  <td>{hour}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Seats:</td>
                  <td>
                    {reservedSeats.join(', ')}
                    <span className="seats-count ms-2">({reservedSeats.length} seats)</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </section>

          {/* Food Items Section */}
          {food.length > 0 && (
            <section className="food-section mb-4">
              <h3 className="section-title"><FaUtensils className="me-2" />Food & Drinks</h3>
              <div className="food-items">
                {food.map((item) => (
                  <Card key={item.id} className="food-item mb-2">
                    <Card.Body className="p-2">
                      <Row className="align-items-center">
                        <Col xs={5} className="food-name">{item.name}</Col>
                        <Col xs={3} className="text-center">Qty: {item.quantity}</Col>
                        <Col xs={4} className="text-end food-price">L.E {item.price * item.quantity}</Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Price Summary Section */}
          <section className="summary-section">
            <Card className="summary-card">
              <Card.Body>
                <Row className="mb-2">
                  <Col>Tickets Price:</Col>
                  <Col className="text-end">L.E {reservedSeats.length * 100}</Col>
                </Row>
                {food.length > 0 && (
                  <Row className="mb-2">
                    <Col>Food & Drinks:</Col>
                    <Col className="text-end">L.E {foodTotal}</Col>
                  </Row>
                )}
                <Row className="total-row">
                  <Col className="fw-bold">Total:</Col>
                  <Col className="text-end fw-bold">L.E {calculateTotal()}</Col>
                </Row>
              </Card.Body>
            </Card>
          </section>
        </Card.Body>

        <Card.Footer className="payment-footer">
          <Row>
            <Col md={6} className="mb-2 mb-md-0">
              <Button 
                variant="danger" 
                className="w-100 cancel-btn"
                onClick={() => navigate('/')}
              >
                <FaTimes className="me-2" /> Cancel Order
              </Button>
            </Col>
            <Col md={6}>
              <Button 
                variant="success" 
                className="w-100 pay-btn"
                onClick={() => setShowPopup(true)}
              >
                <FaMoneyBillWave className="me-2" /> Proceed to Payment
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      {/* Payment Popup */}
      {showPopup && <PaymentPopUp onClose={() => setShowPopup(false)} />}
    </Container>
  );
};

export default PaymentPage;