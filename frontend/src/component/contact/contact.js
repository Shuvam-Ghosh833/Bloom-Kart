import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-info">
                <h2>Contact Us</h2>
                <div className="contact-details">
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                        <span>123 Main Street, Cityville, State, Country</span>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faPhone} className="icon" />
                        <span>+123-456-7890</span>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <span>info@example.com</span>
                    </div>
                </div>
            </div>
            <div className="contact-form">
                <h2>Send us a message</h2>
                <form>
                    <div className="form-group">
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Your Message"></textarea>
                    </div>
                    <button className="sendB" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
