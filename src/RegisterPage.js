import React, { useState, useRef } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showCameraModal, setShowCameraModal] = useState(false);
    const [stream, setStream] = useState(null);

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileNumberRegex = /^[0-9]{11}$/;

        return (
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            emailRegex.test(email) &&
            password.trim() !== '' &&
            mobileNumberRegex.test(mobileNumber.replace(/\D/g, ''))
        );
    };

    const isFirstNameValid = () => firstName.trim() !== '';
    const isLastNameValid = () => lastName.trim() !== '';
    const isEmailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = () => password.trim() !== '';
    const isMobileNumberValid = () => /^[0-9]{11}$/.test(mobileNumber.replace(/\D/g, ''));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            processImageFile(file);
        }
    };

    const processImageFile = (file) => {
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB');
            return;
        }
        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const startCamera = async () => {
        setShowCameraModal(true);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            toast.error("Could not access the camera. Please check permissions.");
            setShowCameraModal(false);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setShowCameraModal(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                const file = new File([blob], 'profile-photo.png', { type: 'image/png' });
                processImageFile(file);
                stopCamera();
            }, 'image/png');
        }
    };

    const handleRegister = () => {
        if (isFormValid()) {
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Check if email already exists
            const emailExists = existingUsers.some(user => user.email === email);
            if (emailExists) {
                toast.error('Email already registered.');
                return;
            }

            if (profileImage) {
                const reader = new FileReader();
                reader.readAsDataURL(profileImage);
                reader.onload = () => {
                    existingUsers.push({
                        firstName,
                        lastName,
                        email,
                        password,
                        mobileNumber,
                        profileImage: reader.result
                    });
                    localStorage.setItem('users', JSON.stringify(existingUsers));
                    toast.success('Registered successfully!');
                    setTimeout(() => navigate('/'), 2000);
                };
            } else {
                existingUsers.push({
                    firstName,
                    lastName,
                    email,
                    password,
                    mobileNumber
                });
                localStorage.setItem('users', JSON.stringify(existingUsers));
                toast.success('Registered successfully!');
                setTimeout(() => navigate('/'), 2000);
            }
        } else {
            toast.error('Please fill out all required fields correctly.');
        }
    };

    return (
        <Container className="mt-5 bg">
            <ToastContainer position="top-right" autoClose={2000} />
            <h2>Register</h2>
            <Form>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First Name<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        isInvalid={!isFirstNameValid()}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        isInvalid={!isLastNameValid()}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={!isEmailValid() && email.trim() !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!isPasswordValid()}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicMobileNumber">
                    <Form.Label>Mobile Number<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        isInvalid={!isMobileNumberValid() && mobileNumber.trim() !== ''}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid 11-digit mobile number.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicProfileImage" className="mt-3">
                    <Form.Label>Profile Image</Form.Label>
                    <div className="d-flex align-items-center">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile preview"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginRight: '15px'
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: '#f0f0f0',
                                    marginRight: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="bi bi-camera" style={{ fontSize: '24px' }}></i>
                            </div>
                        )}
                        <div className="d-flex flex-column">
                            <input
                                type="file"
                                id="profileImageInput"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <Button variant="outline-secondary" onClick={() => fileInputRef.current.click()} className="mb-2">
                                <i className="bi bi-upload me-2"></i>Upload Photo
                            </Button>
                            <Button variant="outline-primary" onClick={startCamera}>
                                <i className="bi bi-camera me-2"></i>Take Photo
                            </Button>
                        </div>
                    </div>
                </Form.Group>

                <Button variant="primary" onClick={handleRegister} disabled={!isFormValid()} className="mt-3">
                    Register
                </Button>
            </Form>

            <Modal show={showCameraModal} onHide={stopCamera} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Take Profile Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '8px' }} />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="primary" onClick={capturePhoto}>
                        <i className="bi bi-camera-fill me-2"></i>Capture
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RegisterPage;
