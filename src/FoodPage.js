import React, { useState } from 'react';
import { Form, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './FoodPage.css'; // We'll create this CSS file

const FoodPage = () => {
    const foodItems = [
        { id: 1, name: 'Burger', price: 10, image: '../images/burger.png', description: 'Juicy beef patty with fresh veggies' },
        { id: 2, name: 'Pizza', price: 15, image: '../images/pizza.jfif', description: 'Classic margherita with mozzarella' },
        { id: 3, name: 'Fries', price: 5, image: '../images/fries.jfif', description: 'Crispy golden fries with seasoning' },
    ];

    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const handleQuantityChange = (foodId, quantity) => {
        const updatedOrder = order.map(item =>
            item.id === foodId ? { ...item, quantity } : item
        );
        setOrder(updatedOrder);
    };

    const calculateTotal = () => {
        return order.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const goToPaymentPage = () => {
        const total = calculateTotal();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userFood = JSON.parse(localStorage.getItem('userFood')) || [];
        userFood.push({ currentUser, order, total });
        localStorage.setItem('userFood', JSON.stringify(userFood));
        navigate('/payment', { state: { order } });
    };

    return (
        <Container className="food-page-container py-5">
            <h2 className="page-title text-center mb-5">Theater Snacks & Meals</h2>
            
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="menu-card">
                        <Card.Body>
                            <h3 className="menu-title mb-4">Food Menu</h3>
                            
                            <div className="food-items-list">
                                {foodItems.map(food => (
                                    <Card key={food.id} className="food-item mb-3">
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
                                                    <div className="food-image-container">
                                                        <img
                                                            src={food.image}
                                                            alt={food.name}
                                                            className="food-image"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <div className="food-info">
                                                        <h4 className="food-name">{food.name}</h4>
                                                        <p className="food-description text-muted">{food.description}</p>
                                                        <span className="food-price">${food.price}</span>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={3}>
                                                    <div className="food-controls">
                                                        <Form.Check
                                                            type="checkbox"
                                                            id={`food-${food.id}`}
                                                            label="Add to order"
                                                            className="mb-2"
                                                            checked={order.some(item => item.id === food.id)}
                                                            onChange={() => {
                                                                if (order.some(item => item.id === food.id)) {
                                                                    setOrder(order.filter(item => item.id !== food.id));
                                                                } else {
                                                                    setOrder([...order, { ...food, quantity: 1 }]);
                                                                }
                                                            }}
                                                        />
                                                        {order.some(item => item.id === food.id) && (
                                                            <Form.Control
                                                                type="number"
                                                                min="1"
                                                                max="10"
                                                                value={order.find(item => item.id === food.id)?.quantity || 1}
                                                                onChange={e => handleQuantityChange(food.id, parseInt(e.target.value))}
                                                                className="quantity-input"
                                                            />
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>

                            <div className="order-summary mt-4 p-4">
                                <h4 className="summary-title">Order Summary</h4>
                                {order.length > 0 ? (
                                    <>
                                        <ul className="order-items">
                                            {order.map(item => (
                                                <li key={item.id} className="order-item">
                                                    <span>{item.name} x {item.quantity}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="total-price">
                                            <span>Total:</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-muted">No items selected</p>
                                )}
                                <Button 
                                    variant="primary" 
                                    className="checkout-btn"
                                    onClick={goToPaymentPage}
                                    disabled={order.length === 0}
                                >
                                    Proceed to Payment
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FoodPage;