import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

// ✅ Toastify for Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (email === 'admin@example.com' && password === 'admin') {
      toast.success('Welcome, Admin!');
      setTimeout(() => navigate('/admin'), 1000);
    } else {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user.email));
        toast.success('Login successful! Redirecting...');
        setTimeout(() => navigate('/user'), 1000);
      } else {
        toast.error('Invalid email or password');
      }
    }
  };

  const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <Container className="login-container">
      <div className="login-background"></div>
      <Card className="login-card">
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="login-title">Welcome Back</h2>
            <p className="text-muted">Please login to your account</p>
          </div>

          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                isInvalid={!isEmailValid() && email.trim() !== ''}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 4 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 login-button"
            >
              Login
            </Button>

            <div className="text-center mt-3">
              <p className="register-text">
                Don't have an account?{' '}
                <Button 
                  variant="link" 
                  onClick={() => navigate('/register')}
                  className="register-link"
                >
                  Register here
                </Button>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* ✅ Notification Container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
};

export default LoginPage;
